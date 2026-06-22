import React, { useState, useEffect } from 'react';
import TempPlanDetails from './TempPlanDetails';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js'; // ייבוא הלקוח של סופאבייס להעלאת תמונות
import { useUser } from '@clerk/react'; // ייבוא קלרק לזיהוי היוצר
import { apiRequest } from '../services/api.js';

const Exercise = () => {
    const { user, isSignedIn, isLoaded } = useUser(); // נתוני המשתמש של קלרק

    // API & Dropdown State
    const [bodyPart, setBodyPart] = useState('');
    const [availableExercises, setAvailableExercises] = useState([]);
    const [loadingExercises, setLoadingExercises] = useState(false);

    // Form State
    const [programName, setProgramName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('1');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [image, setImage] = useState(''); // הוספת סטייט לתמונה

    // Autocomplete State
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Submission State
    const [createdProgram, setCreatedProgram] = useState(null);

    const API_KEY = 'b2d94157b7msh59ab86c240e09fdp10e87bjsn2ffcb8e49cdf';
    const navigate = useNavigate();

    const bodyPartsList = [
        "back", "cardio", "chest", "lower arms", "lower legs",
        "neck", "shoulders", "upper arms", "upper legs", "waist"
    ];

    // שליפת תרגילים לפי קבוצת שריר
    useEffect(() => {
        if (!bodyPart) {
            setAvailableExercises([]);
            return;
        }

        const fetchExercisesByBodyPart = async () => {
            try {
                setLoadingExercises(true);
                setSearchTerm('');

                const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': API_KEY,
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }
                });

                if (!response.ok) throw new Error(`Server error: ${response.status}`);
                const data = await response.json();
                setAvailableExercises(data);
            } catch (err) {
                console.error("Failed to load exercises for body part:", err);
                alert("Failed to fetch exercises for this category. Please try again.");
            } finally {
                setLoadingExercises(false);
            }
        };

        fetchExercisesByBodyPart();
    }, [bodyPart]);

    // סינון מקומי של תרגילים
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredSuggestions([]);
            return;
        }
        const filtered = availableExercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    }, [searchTerm, availableExercises]);

    const handleSelectSuggestion = (exercise) => {
        const isAlreadySelected = selectedExercises.some(item => item.id === exercise.id);

        if (isAlreadySelected) {
            alert("This exercise is already added!");
        } else {
            if (selectedExercises.length < 6) {
                setSelectedExercises([...selectedExercises, exercise]);
                setSearchTerm('');
                setIsDropdownOpen(false);
            } else {
                alert("You can select a maximum of 6 exercises!");
            }
        }
    };

    const handleRemoveExercise = (exerciseId) => {
        setSelectedExercises(selectedExercises.filter(item => item.id !== exerciseId));
    };

    // פונקציית העלאת קובץ ל-Supabase Storage
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `uploads/${fileName}`;
            const { data, error } = await supabase.storage
                .from('plan-img')
                .upload(filePath, file);

            if (error) throw error;

            const { data: urlData } = supabase.storage
                .from('plan-img')
                .getPublicUrl(filePath);

            setImage(urlData.publicUrl);
        } catch (error) {
            console.error("Error uploading image:", error.message);
            alert("Failed to upload image.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedExercises.length === 0) {
            alert("Please select at least one exercise.");
            return;
        }

        // שינוי כאן: חילוץ ה-id של כל תרגיל ישירות לתוך מערך של סטרינגים
        const exerciseIdsArray = selectedExercises.map(ex => String(ex.id));

        // יצירת מבנה הנתונים המדויק עם המערך החדש
        const planData = {
            title: programName,
            desc: description,
            image: image,
            exerciseIds: exerciseIdsArray, // נשלח כעת כמערך: ["123", "456", ...]
            author: user?.fullName || "Guest"
        };

        // שמירה זמנית לטובת קומפוננטת התצוגה המקדימה
        setCreatedProgram({
            name: programName,
            description: description,
            image: image,
            difficulty: difficulty,
            exercises: selectedExercises,
            author: user?.fullName || "Guest"
        });

        try {
            const response = await apiRequest('/api/plans/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            });

            if (!response.ok) {
                console.error("Server error. Status code:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    // הגנות הגישה והטעינה של Clerk
    if (!isLoaded) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-loading-pulse"></div>
                <p className="axl-status-text">Loading user data...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-auth-card">
                    <p className="axl-alert-text">Access Denied</p>
                    <p className="axl-status-text">You must be logged in to create a workout plan.</p>
                </div>
            </div>
        );
    }

    if (createdProgram) {
        return (
            <TempPlanDetails
                createdProgram={createdProgram}
                apiKey={API_KEY}
                onBack={() => setCreatedProgram(null)}
            />
        );
    }

    return (
        <div style={styles.container}>
            <h2>Create Workout Program</h2>
            <form onSubmit={handleSubmit} style={styles.form}>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Program Name:</label>
                    <input
                        type="text"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                    />
                </div>

                {/* שדה חדש: העלאת תמונת התוכנית לתוך סופאבייס */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Program Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={styles.input}
                    />
                    {image && <p style={{ fontSize: '12px', color: '#0ca678' }}>✓ Image uploaded successfully</p>}
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Difficulty Level (1-5):</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={styles.input}>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>1. Select Target Body Part:</label>
                    <select
                        value={bodyPart}
                        onChange={(e) => setBodyPart(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">-- Choose a Body Part --</option>
                        {bodyPartsList.map(part => (
                            <option key={part} value={part}>
                                {part.charAt(0).toUpperCase() + part.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ ...styles.inputGroup, position: 'relative' }}>
                    <label style={styles.label}>2. Search Exercise Name:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsDropdownOpen(true);
                        }}
                        onFocus={() => setIsDropdownOpen(true)}
                        disabled={!bodyPart || loadingExercises}
                        style={{
                            ...styles.input,
                            backgroundColor: (!bodyPart || loadingExercises) ? '#f0f0f0' : '#fff',
                            cursor: (!bodyPart || loadingExercises) ? 'not-allowed' : 'text'
                        }}
                        placeholder={
                            loadingExercises
                                ? "Loading exercises..."
                                : bodyPart
                                    ? `Type to search in ${bodyPart}...`
                                    : "Please select a body part first"
                        }
                    />

                    {isDropdownOpen && searchTerm.trim() !== '' && (
                        <div style={styles.autocompleteDropdown}>
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((exercise) => (
                                    <div
                                        key={exercise.id}
                                        onClick={() => handleSelectSuggestion(exercise)}
                                        style={styles.dropdownItem}
                                    >
                                        <span style={{ fontWeight: '500' }}>{exercise.name}</span>
                                        <span style={styles.dropdownTag}>{exercise.equipment}</span>
                                    </div>
                                ))
                            ) : (
                                <div style={styles.noResults}>No exercises found in this category</div>
                            )}
                        </div>
                    )}
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Selected Exercises ({selectedExercises.length} / 6):</label>
                    {selectedExercises.length > 0 ? (
                        <div style={styles.selectedContainer}>
                            {selectedExercises.map((exercise) => (
                                <div key={exercise.id} style={styles.selectedChips}>
                                    <span>{exercise.name} ({exercise.bodyPart})</span>
                                    <button type="button" onClick={() => handleRemoveExercise(exercise.id)} style={styles.removeChipButton}>✕</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ fontSize: '14px', color: '#888', fontStyle: 'italic' }}>No exercises added yet.</p>
                    )}
                </div>

                <button type="submit" style={styles.submitButton}>Create Program</button>
            </form>
        </div>
    );
};

const styles = {
    container: { direction: 'ltr', maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontWeight: 'bold', fontSize: '14px' },
    input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px', width: '100%', boxSizing: 'border-box' },
    autocompleteDropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    dropdownItem: { padding: '10px 15px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer', display: 'flex', justifycontent: 'space-between', alignItems: 'center' },
    dropdownTag: { fontSize: '11px', backgroundColor: '#eef2f3', padding: '2px 8px', borderRadius: '10px', color: '#495057' },
    noResults: { padding: '15px', color: '#777', textAlign: 'center' },
    selectedContainer: { display: 'flex', flexwrap: 'wrap', gap: '10px', marginTop: '5px' },
    selectedChips: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#e3faf2', border: '1px solid #0ca678', color: '#0ca678', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' },
    removeChipButton: { background: 'none', border: 'none', color: '#0ca678', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
    submitButton: { padding: '12px', backgroundColor: '#0ca678', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};

export default Exercise;
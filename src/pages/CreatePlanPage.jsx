import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { apiRequest } from '../services/api.js';

const CreatePlanPage = () => {
    const { user, isSignedIn, isLoaded } = useUser();

    const [title, setTitle] = useState("");
    const [desc, setdesc] = useState("");
    const [image, setImage] = useState("");
    const [exerciseIds, setExerciseIds] = useState("asdf");

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const planData = { title, desc, image, exerciseIds, author: user?.fullName || "Guest" };

        try {
            // שימוש בפונקציה החדשה שלך
            await apiRequest('/api/plans/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planData),
            });

            // אם הגענו לכאן, זה אומר שהתגובה הייתה תקינה (response.ok היה טרו)
            navigate('/');

        } catch (error) {
            // כל שגיאת רשת או שגיאה שהשרת החזיר (כמו 400, 500 וכו') תתפס כאן
            console.error("שגיאה בשליחת הנתונים:", error.message || error);
        }
    }

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
            console.error("שגיאה בהעלאה:", error.message);
        }
    }

    if (!isLoaded) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-loading-pulse"></div>
                <p className="axl-status-text">טוען נתוני משתמש...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-auth-card">
                    <p className="axl-alert-text">גישה מוגבלת</p>
                    <p className="axl-status-text">עליך להיות מחובר כדי ליצור פרויקט חדש.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cp-page-container">
            <div className="cp-card">
                <h1 className="cp-title">CREATE A NEW PLAN</h1>
                <form onSubmit={submitForm} className="cp-form">
                    <div className="cp-form-group">
                        <label className="cp-label">Plan Title</label>
                        <input type="text"
                            className="cp-input"
                            placeholder="Enter plan name..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="cp-form-group">
                        <label className="cp-label">Plan Description</label>
                        <textarea rows={4}
                            className="cp-textarea"
                            placeholder="Describe the workout goal..."
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                        />
                    </div>

                    <div className="cp-form-group">
                        <label className="cp-label">Plan Image</label>
                        <input type="file"
                            accept="image/*"
                            className="cp-file-input"
                            onChange={handleFileChange} />
                    </div>

                    <div className="cp-form-group">
                        <label className="cp-label">Add Exercise</label>
                        <div className="cp-input-with-button">
                            <input type="text" id="exercises-input" className="cp-input" placeholder="Exercise ID..." />
                            <button type="button"
                                className="cp-btn-secondary"
                                onClick={() => setExerciseIds(document.getElementById('exercises-input').value)}>
                                Add
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="cp-btn-primary">Create Plan</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePlanPage;
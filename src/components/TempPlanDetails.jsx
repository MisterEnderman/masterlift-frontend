import React from 'react';
import ExerciseImage from './ExerciseImage';

const TempPlanDetails = ({ createdProgram, apiKey, onBack }) => {
    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.backButton}>← Create Another Program</button>

            <div style={styles.programCard}>
                <h1 style={styles.programTitle}>{createdProgram.name}</h1>
                <p style={styles.programDesc}>{createdProgram.description}</p>
                <div style={styles.difficultyBadge}>Difficulty: {createdProgram.difficulty} / 5</div>

                <h3 style={{ marginTop: '30px' }}>Exercises Included ({createdProgram.exercises.length}):</h3>
                <div style={styles.grid}>
                    {createdProgram.exercises.map((exercise) => (
                        <div key={exercise.id} style={styles.exerciseCard}>
                            <h4>{exercise.name}</h4>
                            <p><small>Target: {exercise.bodyPart} | Equipment: {exercise.equipment}</small></p>

                            {/* שימוש בקומפוננטת התמונה */}
                            <ExerciseImage exerciseId={exercise.id} alt={exercise.name} apiKey={apiKey} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { direction: 'ltr', maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
    backButton: { padding: '8px 12px', backgroundColor: '#666', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' },
    programCard: { backgroundColor: '#fff', border: '2px solid #0ca678', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    programTitle: { margin: '0 0 10px 0', color: '#0ca678' },
    programDesc: { fontSize: '16px', color: '#444', lineHeight: '1.5' },
    difficultyBadge: { display: 'inline-block', backgroundColor: '#f1f3f5', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' },
    exerciseCard: { border: '1px solid #eee', borderRadius: '8px', padding: '12px', textAlign: 'center', backgroundColor: '#fcfcfc' }
};

export default TempPlanDetails;
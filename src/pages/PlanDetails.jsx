import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react';
import { apiRequest } from '../services/api';

const PlanDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { user, isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true); // שים לב: אם שינית ל-setIsLoading בסטייט, עדכן גם כאן

                // מעבירים את הנתיב היחסי כולל ה-id של הפרויקט
                const data = await apiRequest(`/api/plans/${id}`);

                setPlan(data);
            } catch (err) {
                // apiRequest תזרוק את השגיאה באופן אוטומטי במקרה של כישלון
                setError(err.message);
            } finally {
                setLoading(false); // או setIsLoading בהתאם לסטייט שלך
            }
        };

        if (id) {
            fetchProject();
        }
    }, [id]);

    const handleDelete = async () => {
        const isConfirmed = window.confirm('האם אתה בטוח שברצונך למחוק את הפרויקט? פעולה זו בלתי הפיכה.');

        if (!isConfirmed) {
            return;
        }

        try {
            await apiRequest(`/api/projects/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: currentUserEmail })
            });

            // אין צורך לבדוק !response.ok, אם הגענו לכאן - המחיקה הצליחה
            alert('הפרויקט נמחק בהצלחה');
            navigate('/');
        } catch (err) {
            // במקרה של שגיאה (למשל חוסר הרשאה), ה-catch יתפוס אותה מיד
            alert(`שגיאה: ${err.message}`);
        }
    };
    if (loading) return <div className="axl-status-text">Loading plan details...</div>;
    if (error) return <div className="axl-alert-text">Error: {error}</div>;
    if (!plan) return <div className="axl-status-text">Plan not found.</div>;

    return (
        <div className="axl-project-details">
            <h1>{plan.title}</h1>
            <p>{plan.desc}</p>
            {plan.image && <img src={plan.image} alt={plan.title} />}

            <p><strong>Author:</strong> {plan.author}</p>
            <div className="axl-date-badge">
                {new Date(plan.created_at).toLocaleDateString('en-US')}
            </div>

            {/* קונטיינר חדש לכפתורי הפעולות בתחתית הדף */}
            <div className="plan-actions-wrapper">
                {/* כפתור עריכה - מעביר לעמוד היצירה יחד עם נתוני התוכנית ב-state */}
                <button
                    onClick={() => navigate(`/edit/${id}`, { state: { editPlan: plan } })}
                    className="cp-btn-secondary"
                >
                    EDIT PLAN
                </button>

                <button onClick={() => setShowModal(true)} className="cp-btn-delete">
                    DELETE PLAN
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Delete Training Plan</h3>
                        <p>Are you sure you want to delete "{plan.title}"? This action cannot be undone.</p>

                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)} className="cp-btn-secondary">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="cp-btn-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlanDetails;
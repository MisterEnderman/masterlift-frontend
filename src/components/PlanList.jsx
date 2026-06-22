import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PlanPreview from './PlanPreview'
import { useUser } from '@clerk/react'
import { apiRequest } from '../services/api'

const PlanList = ({ showOnlyMine = false }) => {
    const [plans, setPlans] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user } = useUser();
    const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

    const fetchPlans = async () => {
        try {
            setIsLoading(true);
            // מעבירים רק את הנתיב היחסי. הכתובת המלאה מורכבת אוטומטית בתוך apiRequest
            const data = await apiRequest('/api/plans');
            setPlans(data);
        } catch (err) {
            // אם השרת יחזיר שגיאה, apiRequest תזרוק אותה ותגיע ישירות לכאן
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans()
    }, [])

    // Loading State
    if (isLoading) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-loading-pulse"></div>
                <p className="axl-status-text">Loading training plans...</p>
            </div>
        )
    }

    // Error State
    if (error) {
        return (
            <div className="axl-status-wrapper">
                <div className="axl-auth-card">
                    <p className="axl-alert-text">Error: {error}</p>
                </div>
            </div>
        )
    }

    const topLikedPlans = plans.sort((a, b) => a.numOfLikes - b.numOfLikes).slice(0, 21);
    const displayedPlans = showOnlyMine ? plans.filter(plan => plan.email === currentUserEmail) : topLikedPlans;

    // Empty State
    if (!displayedPlans || displayedPlans.length === 0) {
        return (
            <div className="axl-status-wrapper">
                <p className="axl-status-text" style={{ fontSize: '1.4rem', color: '#64748b', marginBottom: '15px' }}>
                    No training plans available yet. Create one now!
                </p>
                {/* שימוש בסטייל הלינק שלך עם התאמת צבע לרקע בהיר */}
                <Link to='/create' className='menu__link' style={{ color: '#1a1a1a', fontWeight: '700' }}>
                    CREATE PLAN
                </Link>
            </div>
        )
    }

    return (
        <section className='list'>
            {
                displayedPlans.map((plan) => (
                    <PlanPreview key={plan.id} plan={plan} />
                ))
            }
        </section>
    )
}

export default PlanList
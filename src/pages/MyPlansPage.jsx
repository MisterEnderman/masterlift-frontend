import React from 'react'
import PlanList from '../components/PlanList'
import { useUser } from '@clerk/react'

const MyPlansPage = () => {
    const { user } = useUser();

    return (
        <div>
            <h1 className='my-name'>{user?.firstName}'s PLANS</h1>

            <PlanList showOnlyMine={true} />
        </div>
    )
}

export default MyPlansPage
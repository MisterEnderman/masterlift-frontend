import React from 'react'
import PlanList from '../components/PlanList'
import Hero from '../components/Hero'

const Home = () => {
    return (
        <main>
            <Hero />

            <h1>HOTTEST PLANS RIGHT NOW:</h1>
            <PlanList />
        </main>
    )
}

export default Home
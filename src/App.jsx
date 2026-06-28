import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import CreatePlanPage from './pages/CreatePlanPage'
import AboutPage from './pages/AboutPage'
import PlanDetails from './pages/PlanDetails'
import MyPlansPage from './pages/MyPlansPage'
import ShowcasePage from './pages/ShowcasePage'

function App() {
  return (
    <>
      <Header />
      {/* <Exercise /> */}
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/create' element={<CreatePlanPage />} />
        <Route path='/edit/:id' element={<CreatePlanPage />} />
        <Route path='/plan/:id' element={<PlanDetails />} />
        <Route path='/myplans' element={<MyPlansPage />} />
        <Route path='/showcase' element={<ShowcasePage />} />
      </Routes>
    </>
  )
}

export default App

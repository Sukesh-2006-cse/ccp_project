import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import WaterSupply from './pages/Water'
import Weather from './pages/Weather'
import DisasterRisk from './pages/Disaster'
import Electricity from './pages/Electricity'
import Dashboard from './pages/Dashboard'
import Predictions from './pages/Predictions'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'
import { CityContext } from './CityContext'

function App() {
  const [city, setCity] = useState('Hyderabad')
  return (
    <CityContext.Provider value={{ city, setCity }}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}> 
            <Route index element={<Dashboard />} />
            <Route path="predictions" element={<Predictions />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="electricity" element={<Electricity />} />
            <Route path="water" element={<WaterSupply />} />
            <Route path="weather" element={<Weather />} />
            <Route path="disaster" element={<DisasterRisk />} />
          </Route>
        </Routes>
      </AuthProvider>
    </CityContext.Provider>
  )
}

export default App

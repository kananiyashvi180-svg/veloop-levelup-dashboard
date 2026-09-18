import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { UserStateProvider } from './context/UserStateContext'
import EnergyBackground from './components/Background/EnergyBackground'
import LevelDashboard from './pages/LevelDashboard/LevelDashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import VeloopCursor from './components/VeloopCursor/VeloopCursor'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/Lvl-Dashboard"
        element={
          <ProtectedRoute>
            <LevelDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/Lvl-Dashboard" replace />} />
      <Route path="*" element={<Navigate to="/Lvl-Dashboard" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserStateProvider>
          <NotificationProvider>
            {/* Premium VELOOP cursor — sits above all UI, pointer-events: none */}
            <VeloopCursor />
            <EnergyBackground />
            <AppRoutes />
          </NotificationProvider>
        </UserStateProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


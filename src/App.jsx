import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { UserStateProvider } from './context/UserStateContext'
import LevelDashboard from './pages/LevelDashboard/LevelDashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

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
            <AppRoutes />
          </NotificationProvider>
        </UserStateProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

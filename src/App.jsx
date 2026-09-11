import { Component } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { UserStateProvider } from './context/UserStateContext'
import LevelDashboard from './pages/LevelDashboard/LevelDashboard'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0d14', color: '#fff', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f59e0b' }}>Something went wrong</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Click below to refresh and restore your session.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
            style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #ec4899)', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reload Dashboard
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

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
            <UserStateProvider>
              <LevelDashboard />
            </UserStateProvider>
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
        <NotificationProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'veloop_users'
const SESSION_KEY = 'veloop_session'

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredSession())
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const session = getStoredSession()
    setUser(session)
  }, [])

  const login = (email, password, remember = false) => {
    setAuthLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers()
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        )
        if (found) {
          const session = {
            userId: found.id,
            fullName: found.fullName,
            email: found.email,
            remember,
            loginAt: Date.now()
          }
          localStorage.setItem(SESSION_KEY, JSON.stringify(session))
          setUser(session)
          setAuthLoading(false)
          resolve(session)
        } else {
          setAuthLoading(false)
          reject(new Error('Invalid email or password.'))
        }
      }, 900)
    })
  }

  const register = (fullName, email, password) => {
    setAuthLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers()
        const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
        if (exists) {
          setAuthLoading(false)
          reject(new Error('An account with this email already exists.'))
          return
        }
        const newUser = {
          id: `user_${Date.now()}`,
          fullName,
          email,
          password,
          createdAt: Date.now()
        }
        users.push(newUser)
        localStorage.setItem(USERS_KEY, JSON.stringify(users))

        const session = {
          userId: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          remember: true,
          loginAt: Date.now()
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        setUser(session)
        setAuthLoading(false)
        resolve(session)
      }, 900)
    })
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

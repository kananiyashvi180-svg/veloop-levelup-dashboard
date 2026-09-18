import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AlertTriangle, Zap, Gift, TrendingUp, Eye, EyeOff } from 'lucide-react'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const { register, user } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    document.documentElement.dataset.page = 'register'
    if (user) navigate('/Lvl-Dashboard', { replace: true })
  }, [user, navigate])


  if (user) return null

  const validate = () => {
    const errs = {}
    if (!fullName.trim()) errs.fullName = 'Full name is required.'
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters.'
    return errs
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      await register(fullName.trim(), email.trim(), password)
      navigate('/Lvl-Dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.ambientGlow} />

      <div className={styles.card}>
        {/* Crystal Shard Emblem Icon */}
        <div className={styles.crystalEmblemWrap}>
          <div className={styles.emblemHalo} />
          <svg viewBox="0 0 60 60" className={styles.emblemSvg}>
            <polygon points="30,4 52,18 44,52 30,58 16,52 8,18" fill="#130e33" stroke="#a855f7" strokeWidth="2" />
            <polygon points="30,8 48,20 30,32" fill="#d8b4fe" opacity="0.8" />
            <polygon points="30,8 12,20 30,32" fill="#a855f7" opacity="0.8" />
            <polygon points="12,20 18,48 30,32" fill="#581c87" />
            <polygon points="48,20 42,48 30,32" fill="#7c3aed" />
            <polygon points="18,48 30,54 30,32" fill="#9333ea" />
            <polygon points="42,48 30,54 30,32" fill="#c084fc" />
          </svg>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join VELOOP Rewards today</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <AlertTriangle size={15} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleRegister} noValidate>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              type="text"
              className={`${styles.input} ${fieldErrors.fullName ? styles.inputError : ''}`}
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setFieldErrors(p => ({ ...p, fullName: '' })) }}
              disabled={loading}
            />
            {fieldErrors.fullName && <span className={styles.fieldError}>{fieldErrors.fullName}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              type="email"
              className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
              placeholder="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: '' })) }}
              autoComplete="email"
              disabled={loading}
            />
            {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="reg-password">Password</label>
            <div className={styles.passwordWrap}>
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: '' })) }}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchLink}>Sign In</Link>
        </p>

        {/* Feature Tags at Bottom */}
        <div className={styles.bottomFeaturesRow}>
          <div className={styles.featureItem}>
            <div className={styles.featIconBox}><Zap size={14} aria-hidden="true" /></div>
            <span>Earn XP</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featIconBox}><Gift size={14} aria-hidden="true" /></div>
            <span>Unlock Rewards</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featIconBox}><TrendingUp size={14} aria-hidden="true" /></div>
            <span>Level Up</span>
          </div>
        </div>
      </div>
    </div>
  )
}

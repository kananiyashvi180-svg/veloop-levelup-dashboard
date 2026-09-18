import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AlertTriangle, CheckCircle2, Zap, Gift, TrendingUp, Eye, EyeOff } from 'lucide-react'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('yashwi@example.com')
  const [password, setPassword] = useState('password123')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '')
  const [fieldErrors, setFieldErrors] = useState({})
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.page = 'login'
    if (user) navigate('/Lvl-Dashboard', { replace: true })
  }, [user, navigate])


  if (user) return null

  const validate = () => {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.'
    if (!password) errs.password = 'Password is required.'
    return errs
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const errs = validate()
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      await login(email, password, remember)
      navigate('/Lvl-Dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = (e) => {
    e.preventDefault()
    if (!forgotEmail.trim()) return
    setTimeout(() => setForgotSent(true), 800)
  }

  return (
    <div className={styles.page}>
      <div className={styles.ambientGlow} />

      <div className={styles.card}>
        {/* Crystal Shard Emblem Icon matching reference */}
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

        {!forgotMode ? (
          <>
            <div className={styles.heading}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Sign in to continue your journey</p>
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <AlertTriangle size={15} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className={styles.successBanner}>
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>{successMessage}</span>
              </div>
            )}

            <form className={styles.form} onSubmit={handleLogin} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })) }}
                  autoComplete="email"
                  disabled={loading}
                />
                {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="login-password">Password</label>
                <div className={styles.passwordWrap}>
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    className={`${styles.input} ${fieldErrors.password ? styles.inputError : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })) }}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}
              </div>

              <div className={styles.rememberRow}>
                <label className={styles.checkboxLabel} htmlFor="login-remember">
                  <input
                    id="login-remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className={styles.forgotLink} onClick={() => setForgotMode(true)}>
                  Forgot password?
                </button>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className={styles.dividerRow}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>or</span>
                <span className={styles.dividerLine} />
              </div>

              <button
                type="button"
                className={styles.createAccountBtn}
                onClick={() => navigate('/register')}
              >
                Create new account
              </button>
            </form>
          </>
        ) : (
          <>
            <div className={styles.heading}>
              <h1 className={styles.title}>Reset Password</h1>
              <p className={styles.subtitle}>Enter your email address to receive reset link</p>
            </div>

            {forgotSent ? (
              <div className={styles.successBanner}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Password reset instructions have been sent to your email.</span>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleForgot} noValidate>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="forgot-email">Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Recovery Link
                </button>
              </form>
            )}

            <button type="button" className={styles.backLink} onClick={() => { setForgotMode(false); setForgotSent(false) }}>
              Back to Sign In
            </button>
          </>
        )}

        {/* Feature Tags Highlight matching reference Panel 7 */}
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

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate('/Lvl-Dashboard', { replace: true })
    return null
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

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
      <div className={styles.bgMesh} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <span className={styles.brandHex}>V</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>VELOOP<span className={styles.brandDot}>.</span></span>
            <span className={styles.brandSub}>REWARDS</span>
          </div>
        </div>

        {!forgotMode ? (
          <>
            <div className={styles.heading}>
              <h1 className={styles.title}>Welcome Back</h1>
              <p className={styles.subtitle}>Sign in to continue your XP journey</p>
            </div>

            {error && (
              <div className={styles.errorBanner}>
                <span className={styles.errorIcon}>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <form className={styles.form} onSubmit={handleLogin} noValidate>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="login-email">Email Address</label>
                <div className={`${styles.inputWrap} ${fieldErrors.email ? styles.inputError : ''}`}>
                  <span className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })) }}
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="login-password">Password</label>
                  <button type="button" className={styles.forgotLink} onClick={() => setForgotMode(true)}>
                    Forgot password?
                  </button>
                </div>
                <div className={`${styles.inputWrap} ${fieldErrors.password ? styles.inputError : ''}`}>
                  <span className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    className={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })) }}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.showPassBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}
              </div>

              <div className={styles.rememberRow}>
                <label className={styles.checkboxLabel} htmlFor="login-remember">
                  <input
                    id="login-remember"
                    type="checkbox"
                    className={styles.checkbox}
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className={styles.checkMark} />
                  <span className={styles.checkText}>Remember me</span>
                </label>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className={styles.switchText}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.switchLink}>Create Account</Link>
            </p>
          </>
        ) : (
          <>
            <div className={styles.heading}>
              <h1 className={styles.title}>Reset Password</h1>
              <p className={styles.subtitle}>We'll send recovery instructions to your email</p>
            </div>

            {forgotSent ? (
              <div className={styles.successBanner}>
                <span>✅</span>
                <span>If an account exists for <strong>{forgotEmail}</strong>, a recovery link has been sent. Check your inbox.</span>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleForgot} noValidate>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="forgot-email">Email Address</label>
                  <div className={styles.inputWrap}>
                    <span className={styles.inputIcon}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      id="forgot-email"
                      type="email"
                      className={styles.input}
                      placeholder="your@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <span>Send Recovery Link</span>
                </button>
              </form>
            )}

            <button type="button" className={styles.backLink} onClick={() => { setForgotMode(false); setForgotSent(false) }}>
              ← Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  )
}

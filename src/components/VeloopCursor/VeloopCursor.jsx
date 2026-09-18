import { useEffect, useRef } from 'react'
import styles from './VeloopCursor.module.css'

/* ─────────────────────────────────────────────────────────────
   Interactive element selector — everything the cursor reacts to
   ───────────────────────────────────────────────────────────── */
const INTERACTIVE_SEL = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[onclick]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/* Max size the cursor frame grows to when locking onto large cards */
const MAX_HOVER_W = 280
const MAX_HOVER_H = 120

/* Lerp speed: 0 = never reaches target, 1 = instant */
const LERP_SPEED = 0.14

export default function VeloopCursor() {
  const wrapRef  = useRef(null) // outermost fixed wrapper — translated to cursor pos
  const innerRef = useRef(null) // sized box — transitions width/height
  const dotRef   = useRef(null) // center dot — stable

  useEffect(() => {
    /* ── Bail early on coarse-pointer (touch-only) devices ── */
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const wrap  = wrapRef.current
    const inner = innerRef.current
    const dot   = dotRef.current
    if (!wrap) return

    /* ── State ── */
    const s = {
      targetX: window.innerWidth  / 2,
      targetY: window.innerHeight / 2,
      curX:    window.innerWidth  / 2,
      curY:    window.innerHeight / 2,
      visible: false,
      hovering: false,
      hoverEl: null,
      rafId: null,
    }

    /* ─────────────────── Helper: hide native cursor ─────────────────── */
    const styleTag = document.createElement('style')
    styleTag.id = 'veloop-cursor-hide'
    styleTag.textContent = !isCoarse
      ? `*, *::before, *::after { cursor: none !important; }`
      : ''
    document.head.appendChild(styleTag)

    /* ─────────────────── RAF animation loop ─────────────────── */
    const tick = () => {
      /* If hovering, continuously refresh position from the live bounding rect */
      if (s.hovering && s.hoverEl) {
        try {
          const r = s.hoverEl.getBoundingClientRect()
          if (r.width > 0) {
            s.targetX = r.left + r.width  / 2
            s.targetY = r.top  + r.height / 2
          }
        } catch (_) {}
      }

      const speed = reduced ? 1 : LERP_SPEED
      s.curX += (s.targetX - s.curX) * speed
      s.curY += (s.targetY - s.curY) * speed

      wrap.style.transform = `translate(${s.curX}px, ${s.curY}px)`
      s.rafId = requestAnimationFrame(tick)
    }

    /* ─────────────────── Pointer-move ─────────────────── */
    const onMove = (e) => {
      if (e.pointerType === 'touch') return

      s.targetX = e.clientX
      s.targetY = e.clientY

      if (!s.visible) {
        s.visible = true
        s.curX = e.clientX
        s.curY = e.clientY
        wrap.style.opacity = '1'
      }
    }

    /* ─────────────────── Pointer-over (hover start) ─────────────────── */
    const onOver = (e) => {
      if (e.pointerType === 'touch') return

      /* Skip the game arena — keep cursor responsive but don't frame the whole arena */
      const arena = document.getElementById('xp-catcher-arena')
      if (arena && arena.contains(e.target)) return

      const el = e.target.closest(INTERACTIVE_SEL)
      if (!el) return

      const rect = el.getBoundingClientRect()
      if (rect.width === 0) return

      /* Clamp the frame to max dims */
      const PAD = 10
      const w = Math.min(rect.width  + PAD * 2, MAX_HOVER_W)
      const h = Math.min(rect.height + PAD * 2, MAX_HOVER_H)

      /* Detect border-radius of the target */
      const br = window.getComputedStyle(el).borderRadius || '8px'

      /* Check for gold CTA buttons */
      const bg = window.getComputedStyle(el).backgroundImage +
                 window.getComputedStyle(el).backgroundColor
      const isGold = /f59e0b|ffd45a|F5B82E|FFD45A|gold/i.test(bg)

      s.hovering = true
      s.hoverEl  = el

      /* Lock target to element center */
      s.targetX = rect.left + rect.width  / 2
      s.targetY = rect.top  + rect.height / 2

      inner.style.width        = `${w}px`
      inner.style.height       = `${h}px`
      inner.style.borderRadius = br
      inner.classList.add(styles.hoverMode)
      if (isGold) inner.classList.add(styles.hoverGold)
    }

    /* ─────────────────── Pointer-out (hover end) ─────────────────── */
    const onOut = (e) => {
      if (e.pointerType === 'touch') return
      if (e.relatedTarget && e.target.contains(e.relatedTarget)) return
      if (!s.hovering) return

      /* Only clear if leaving the actual hovered element */
      if (s.hoverEl && !s.hoverEl.contains(e.relatedTarget)) {
        s.hovering = false
        s.hoverEl  = null

        inner.style.width        = ''
        inner.style.height       = ''
        inner.style.borderRadius = ''
        inner.classList.remove(styles.hoverMode)
        inner.classList.remove(styles.hoverGold)
      }
    }

    /* ─────────────────── Click pulse ─────────────────── */
    const onClick = (e) => {
      if (e.pointerType === 'touch') return
      inner.classList.add(styles.clicking)
      dot.classList.add(styles.dotClick)
      setTimeout(() => {
        inner.classList.remove(styles.clicking)
        dot.classList.remove(styles.dotClick)
      }, 380)
    }

    /* ─────────────────── Touch ripple (mobile) ─────────────────── */
    const onTouchStart = (e) => {
      const t = e.changedTouches[0]
      const ripple = document.createElement('div')
      ripple.className = 'veloop-touch-ripple'
      ripple.style.cssText = `
        position: fixed;
        left: ${t.clientX}px;
        top: ${t.clientY}px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(168, 85, 247, 0.25);
        border: 1.5px solid rgba(192, 132, 252, 0.55);
        transform: translate(-50%, -50%) scale(0);
        animation: veloopTouchRipple 0.65s ease-out forwards;
        pointer-events: none;
        z-index: 99998;
      `
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 700)
    }

    /* ─────────────────── Mount ─────────────────── */
    if (!isCoarse) {
      document.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver, { passive: true })
      document.addEventListener('pointerout',  onOut,  { passive: true })
      document.addEventListener('pointerdown', onClick)
      s.rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })

    /* ─────────────────── Cleanup ─────────────────── */
    return () => {
      cancelAnimationFrame(s.rafId)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout',  onOut)
      document.removeEventListener('pointerdown', onClick)
      document.removeEventListener('touchstart',  onTouchStart)
      const tag = document.getElementById('veloop-cursor-hide')
      if (tag) tag.remove()
    }
  }, [])

  return (
    <>
      {/* ── Cursor wrapper — translated via JS ── */}
      <div ref={wrapRef} className={styles.cursorWrap} aria-hidden="true">
        {/* Ambient glow — behind everything */}
        <div className={styles.glow} />

        {/* Sized box — transitions width/height on hover */}
        <div ref={innerRef} className={styles.cursorInner}>
          {/* Rotating corner brackets */}
          <div className={styles.brackets}>
            <span className={`${styles.corner} ${styles.cTL}`} />
            <span className={`${styles.corner} ${styles.cTR}`} />
            <span className={`${styles.corner} ${styles.cBL}`} />
            <span className={`${styles.corner} ${styles.cBR}`} />
          </div>

          {/* Center dot — NOT inside rotating wrapper, stays stable */}
          <span ref={dotRef} className={styles.dot} />
        </div>
      </div>
    </>
  )
}

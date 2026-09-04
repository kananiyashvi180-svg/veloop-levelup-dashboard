import CurrentLevel from '../CurrentLevel/CurrentLevel'
import XPProgress from '../XPProgress/XPProgress'
import styles from './LevelHero.module.css'

export default function LevelHero({ progression, roadmap, onBoost }) {
  return (
    <section className={styles.heroCard} aria-label="Level Progress Overview">
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />

      <CurrentLevel progression={progression} roadmap={roadmap} />
      <div className={styles.divider} />
      <XPProgress progression={progression} onBoost={onBoost} />
    </section>
  )
}

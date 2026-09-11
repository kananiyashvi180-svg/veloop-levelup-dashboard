import GameContainer from '../../components/PlayAndEarn/GameContainer/GameContainer'
import styles from './PlayAndEarnPage.module.css'

export default function PlayAndEarnPage({ onBack }) {
  return (
    <div className={styles.page}>
      <GameContainer onBack={onBack} />
    </div>
  )
}

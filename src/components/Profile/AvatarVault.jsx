import { gamerAvatars } from '../../data/levelData'
import GamerAvatar from './GamerAvatar'
import styles from './AvatarVault.module.css'

export default function AvatarVault({ isOpen, onClose, currentAvatarId, onSelectAvatar }) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>AVATAR VAULT</span>
            <h2 className={styles.title}>Choose Your Gamer Identity</h2>
            <p className={styles.subtitle}>Select an armored cyber crest or futuristic helm for your profile.</p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Close avatar vault"
          >
            ✕
          </button>
        </div>

        <div className={styles.grid}>
          {gamerAvatars.map((av) => {
            const isSelected = currentAvatarId === av.id
            return (
              <div
                key={av.id}
                className={`${styles.card} ${isSelected ? styles.selectedCard : ''}`}
                onClick={() => onSelectAvatar(av.id)}
              >
                <div className={styles.avatarWrap}>
                  <GamerAvatar avatarId={av.id} size={72} showGlow={isSelected} />
                  {isSelected && (
                    <div className={styles.selectedBadge}>
                      ✓ ACTIVE
                    </div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardMeta}>
                    <span className={styles.avatarName}>{av.name}</span>
                    <span className={styles.tierTag} style={{ borderColor: `${av.theme}66`, color: av.theme }}>
                      {av.tier}
                    </span>
                  </div>
                  <p className={styles.avatarDesc}>{av.desc}</p>
                </div>
                <button
                  type="button"
                  className={`${styles.selectBtn} ${isSelected ? styles.activeSelectBtn : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectAvatar(av.id)
                  }}
                >
                  {isSelected ? 'Equipped' : 'Equip Avatar'}
                </button>
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.doneBtn} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

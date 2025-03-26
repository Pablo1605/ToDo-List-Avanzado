import { SprintCard } from "../SprintCard/SprintCard"
import styles from "./Aside.module.css"
export const Aside = () => {
  return (
    <div className={styles.aside}>
      <div className={styles.asideButton}>
        <button>Backlog</button>
        <button>Sprints <span class="material-symbols-outlined {}">
          add
        </span></button>
      </div>
      <div>
        <SprintCard/>
        <SprintCard/>
      </div>
    </div>
  )
}
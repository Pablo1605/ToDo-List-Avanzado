import { useScreenStore } from "../../../store/screenStore";
import { SprintCard } from "../SprintCard/SprintCard";
import styles from "./Aside.module.css";

export const Aside = () => {
  const { setScreen } = useScreenStore();

  return (
    <div className={styles.aside}>
      <div className={styles.asideButton}>
        <button onClick={() => setScreen("backlog")}>Backlog <span className="material-symbols-outlined">
          menu_book
        </span></button>
        <button>Sprints <span className="material-symbols-outlined">add</span></button>
      </div>
      <div>
        <SprintCard />
        <SprintCard />
      </div>
    </div>
  );
};
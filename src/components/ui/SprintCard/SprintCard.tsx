import { useScreenStore } from "../../../store/screenStore";
import styles from "./SprintCard.module.css"

export const SprintCard = () => {
    const { setScreen } = useScreenStore();
    return (
        <div className={styles.contenedorSprintCard} onClick={() => setScreen("sprint")}>
            <div className={styles.datosSprintCard}>
                <h2>Sprint 1</h2>
                <p>Inicio: 03/04/2025</p>
                <p>Cierre: 03/08/2025</p>
            </div>
            <div className={styles.botonesSprintCard}>
                <button><span className="material-symbols-outlined">
                    visibility
                </span></button>
                <button><span className="material-symbols-outlined">
                    edit
                </span></button>
                <button><span className="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
    )
}
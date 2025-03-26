import styles from "./SprintCard.module.css"

export const SprintCard = () => {
    return (
        <div className={styles.contenedorSprintCard}>
            <div className={styles.datosSprintCard}>
                <h2>Sprint 1</h2>
                <p>Inicio: 22/03/2025</p>
                <p>Cierre: 22/06/2025</p>
            </div>
            <div className={styles.botonesSprintCard}>
                <button><span class="material-symbols-outlined">
                    visibility
                </span></button>
                <button><span class="material-symbols-outlined">
                    edit
                </span></button>
                <button><span class="material-symbols-outlined">
                    delete
                </span></button>
            </div>
        </div>
    )
}
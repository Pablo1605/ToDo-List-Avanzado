import styles from "./BacklogCard.module.css"

export const BacklogCard = () => {
    return (
        <div className={styles.containerBacklogCard}>
            <h3>Nombre de tarea</h3>
            <div className={styles.botonCard}>
                <div className={styles.botonEnviar}>
                <button>Enviar</button>
                </div>
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
import { BacklogCard } from "../BacklogCard/BacklogCard"
import styles from "./BacklogMain.module.css"

export const BacklogMain = () => {
    return (
        <div className={styles.containerPrincipal}>
            <h1>Backlog</h1>
            <div className={styles.subtituloBoton}>
                <h2>Tareas en el backlog</h2>
                <button>Crear Tarea</button>
            </div>
            <div className={styles.containerSecundario}>
                <BacklogCard/>
                <BacklogCard/>
                <BacklogCard/>
            </div>
        </div>
    )
}
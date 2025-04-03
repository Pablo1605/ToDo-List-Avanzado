import styles from "./SprintMain.module.css"

export const SprintMain = () => {
    return (
        <div className={styles.containerPrincipal}>
            <h1>Sprint</h1>
            <div className={styles.subtituloBoton}>
                <h2>Tareas en el sprint</h2>
                <button>Crear Tarea</button>
            </div>
            <div className={styles.containerSecundario}>
                <div className={styles.contenedorPendiente}>
                    <h3>Pendiente</h3>
                </div>
                <div className={styles.contenedorEnProgreso}>
                    <h3>En Progreso</h3>
                    <div className={styles.containerTarea}>
                        <div className={styles.containerTareaData}>
                            <h4>Titulo</h4>
                            <p>Descripcion</p>
                            <p>Fecha limite</p>
                        </div>
                        <div className={styles.botonesEstado}>
                            <button>Enviar al Backlog</button>
                            <button>En progreso</button>
                        </div>
                        <div className={styles.botonesCrud}>
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
                </div>
                <div className={styles.contenedorCompletado}>
                    <h3>Completado</h3>
                </div>
            </div>
        </div>
    )
}
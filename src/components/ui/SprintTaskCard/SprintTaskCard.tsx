import { FC } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./SprintTaskCard.module.css"

type ITarjetaTareaSprint = {
    tasks: ITask[]
    handleChangeStateToPending: (task: ITask) => void;
    handleChangeStateToInProgress: (task: ITask) => void;
    handleChangeStateToCompleted: (task: ITask) => void;
    handleOpenEditModal: (task: ITask) => void;
    handleDeleteTask: (idTask: string) => void;
    handleOpenViewModal: (task: ITask) => void;
    handleSendToBacklog: (task: ITask) => void;
}

export const SprintTaskCard: FC<ITarjetaTareaSprint> = ({ tasks, handleChangeStateToPending, handleChangeStateToInProgress, handleChangeStateToCompleted, handleOpenEditModal, handleDeleteTask, handleOpenViewModal, handleSendToBacklog }) => {
    return (
        <>
            {tasks.map((task) => (
                <div className={styles.containerTarea}>
                    <div className={styles.containerTareaData}>
                        <h4>Titulo: {task.titulo}</h4>
                        <p>Descripcion: {task.descripcion}</p>
                        <p>Fecha limite: {task.fechaLimite}</p>
                    </div>
                    <div className={styles.botonesEstado}>
                        <button onClick={() => handleSendToBacklog(task)}>Enviar al Backlog</button>
                        {
                            task.estado == 'pendiente' ?
                                <button onClick={() => handleChangeStateToInProgress(task)}>En Progreso</button>
                                :
                                task.estado == 'en progreso' ?
                                    <>
                                        <div className={styles.botonesProgreso}>
                                            <button onClick={() => handleChangeStateToPending(task)}>Pendiente</button>
                                            <button onClick={() => handleChangeStateToCompleted(task)}>Completedo</button>
                                        </div>
                                    </>
                                    :
                                    task.estado == 'completado' ?
                                        <button onClick={() => handleChangeStateToInProgress(task)}>En Progreso</button>
                                        : <div></div>
                        }
                    </div>
                    <div className={styles.botonesCrud}>
                        <button onClick={() => { handleOpenViewModal(task) }}><span className="material-symbols-outlined">
                            visibility
                        </span></button>
                        <button onClick={() => { handleOpenEditModal(task) }}><span className="material-symbols-outlined">
                            edit
                        </span></button>
                        <button onClick={() => { handleDeleteTask(task.id!) }}><span className="material-symbols-outlined">
                            delete
                        </span></button>
                    </div>
                </div>
            ))}
        </>
    )
}
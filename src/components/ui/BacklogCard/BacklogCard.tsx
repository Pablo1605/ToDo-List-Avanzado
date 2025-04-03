import { FC, useState } from "react"
import { ITask } from "../../../types/ITask"
import styles from "./BacklogCard.module.css"
import { ModalViewTask } from "../ModalViewTak/ModalViewTask"

type IBacklogCard = {
    task: ITask
    handleOpenModalEdit: (task: ITask) => void
    handleDeleteTask: (idTask: string) => void
}

export const BacklogCard: FC<IBacklogCard> = ({ task, handleOpenModalEdit, handleDeleteTask }) => {
    const [openViewModal, setOpenViewModal] = useState(false)

    return (
        <>
            <div className={styles.containerBacklogCard}>
                <div className={styles.data}>
                    <h4>{task.titulo}</h4>
                    <p>
                        <strong>Descripción:</strong> {task.descripcion}
                    </p>
                    <p>
                        <strong>Fecha Limite:</strong> {task.fechaLimite}
                    </p>
                </div>
                <div className={styles.botonCard}>
                    <div className={styles.botonesEstado}>
                        <button className={styles.enviar}>Enviar</button>
                    </div>
                    <button onClick={() => setOpenViewModal(true)}><span className="material-symbols-outlined">
                        visibility
                    </span></button>
                    <button onClick={() => handleOpenModalEdit(task)}><span className="material-symbols-outlined">
                        edit
                    </span></button>
                    <button onClick={() => handleDeleteTask(task.id!)}><span className="material-symbols-outlined">
                        delete
                    </span></button>
                </div>
            </div>
            {openViewModal && <ModalViewTask task={task} setOpenViewModal={setOpenViewModal} />}
        </>
    )
}
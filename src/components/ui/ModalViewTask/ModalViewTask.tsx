import { FC } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./ModalViewTask.module.css"

type IModalViewTask = {
	task: ITask
    setOpenViewModal: (state: boolean) => void
};

export const ModalViewTask: FC<IModalViewTask> = ({ task, setOpenViewModal }) => {

	return (
		<div className={styles.containerPrincipalModal}>
            <div className={styles.containerSecundarioModal}>
                <h3 className={styles.titulo}>Título: {task.titulo}</h3>
                <h3>Descripción: {task.descripcion}</h3>
                <h3>Fecha Límite: {task.fechaLimite}</h3>
                <div>
                    <button onClick={() => setOpenViewModal(false)}>Cerrar</button>
                </div>
            </div>
        </div>
	);
};

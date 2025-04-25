import { FC, useEffect, useState } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./BacklogCard.module.css";
import { ModalViewTask } from "../ModalViewTask/ModalViewTask";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ISprint";

type IBacklogCard = {
    task: ITask;
    handleOpenModalEdit: (task: ITask) => void;
    handleDeleteTask: (idTask: string) => void;
    handleSendTaskToSprint: (task: ITask, idSprint: string) => void;
};

export const BacklogCard: FC<IBacklogCard> = ({
    task,
    handleOpenModalEdit,
    handleDeleteTask,
    handleSendTaskToSprint,
}) => {
    const [openViewModal, setOpenViewModal] = useState(false);
    const { getSprints, sprints } = useSprint();
    const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);

    useEffect(() => {
        getSprints();
    }, []);

    const handleSendTask = () => {
        if (selectedSprint) {
            handleSendTaskToSprint(task, selectedSprint.id!);
        }
    };

    const handleSprintChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sprintId = event.target.value;
        const sprint = sprints.find((s) => s.id === sprintId) || null;
        setSelectedSprint(sprint);
    };

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
                    <button className={styles.sendButton} onClick={handleSendTask}>
                        Enviar a
                        <span className={`material-symbols-outlined ${styles.sendIcon}`}>
                            send
                        </span>
                    </button>
                    <select
                        className={styles.dropdownSelect}
                        value={selectedSprint?.id || ""}
                        onChange={handleSprintChange}
                    >
                        <option value="" disabled>
                            Seleccione una Sprint
                        </option>
                        {sprints.map((sprint) => (
                            <option key={sprint.id} value={sprint.id}>
                                {sprint.nombre}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => setOpenViewModal(true)}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button onClick={() => handleOpenModalEdit(task)}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => handleDeleteTask(task.id!)}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
            {openViewModal && (
                <ModalViewTask task={task} setOpenViewModal={setOpenViewModal} />
            )}
        </>
    );
};
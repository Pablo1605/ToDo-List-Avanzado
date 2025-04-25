import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./TaskSprintModal.module.css";
import { ITask } from "../../../types/ITask";
import { taskStore } from "../../../store/taskStore";

type IModalCreateTaskSprint = {
    handleCloseModal: VoidFunction;
    handleCreateTaskInSprint: (task: ITask) => void;
    handleEditTaskInSprint: (task: ITask) => void;
};

const initialState: ITask = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: "pendiente",
};

export const TaskSprintModal: FC<IModalCreateTaskSprint> = ({
    handleCloseModal,
    handleCreateTaskInSprint,
    handleEditTaskInSprint,
}) => {
    const activeTask = taskStore((state) => state.activeTask);
    const setActiveTask = taskStore((state) => state.setActiveTask);
    const [formValues, setFormValues] = useState<ITask>(initialState);

    useEffect(() => {
        if (activeTask) {
            setFormValues(activeTask);
        } else {
            setFormValues(initialState);
        }
    }, [activeTask]);



    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();


        const formattedValues: ITask = {
            ...formValues,
            id: activeTask ? formValues.id : crypto.randomUUID(),
            estado: formValues.estado ?? "pendiente",
        };

        if (activeTask) {
            handleEditTaskInSprint(formattedValues);
        } else {
            handleCreateTaskInSprint(formattedValues);
        }

        handleCloseModal();
        setActiveTask(null);
        setFormValues(initialState);
    };

    const handleCancelSubmit = () => {
        handleCloseModal();
        setActiveTask(null);
        setFormValues(initialState);
    };

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.containerSecundarioModal}>
                <h1>{activeTask ? "Editar Tarea" : "Crear Tarea"}</h1>
                <form onSubmit={handleSubmit} className={styles.datosTarea}>
                    <label>Título</label>
                    <input value={formValues.titulo} onChange={handleChange} type="text" required autoComplete="off" name="titulo" />
                    <label>Descripción</label>
                    <textarea value={formValues.descripcion} onChange={handleChange} required name="descripcion" />
                    <label>Fecha Límite</label>
                    <input value={formValues.fechaLimite} onChange={handleChange} type="date" required autoComplete="off" name="fechaLimite" />
                    <div className={styles.botones}>
                        <button type="button" onClick={handleCancelSubmit} className={styles.botonCancelar}>Cancelar</button>
                        <button type="submit" className={styles.botonEnviar}>{activeTask ? "Editar tarea" : "Crear tarea"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
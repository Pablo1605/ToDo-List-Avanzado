import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useTask } from "../../../hooks/useTask";
import styles from "./TaskModal.module.css";
import { ITask } from "../../../types/ITask";
import { taskStore } from "../../../store/taskStore";

type ITaskModal = {
  handleCloseModalTask: () => void;
};

const initialState: ITask = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
  estado: "",
};

export const TaskModal: FC<ITaskModal> = ({ handleCloseModalTask }) => {
  const activeTask = taskStore((state) => state.activeTask);
  const setActiveTask = taskStore((state) => state.setActiveTask);
  const { addTask, putUpdateTask } = useTask();
  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (activeTask) setFormValues(activeTask)
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (activeTask) {
      putUpdateTask(formValues);
    } else {
      addTask({ ...formValues, id: crypto.randomUUID() });
    }
    setActiveTask(null);
    handleCloseModalTask();
  };

  const handleCancelSubmit = () => {
    setActiveTask(null)
    handleCloseModalTask()
  }


  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.containerSecundarioModal}>
        <h1>{activeTask ? "Editar Tarea" : "Crear Tarea"}</h1>
        <form onSubmit={handleSubmit} className={styles.datosTarea}>
          Título
          <input value={formValues.titulo} onChange={handleChange} type="text" required autoComplete="off" name="titulo" />
          Descripción
          <textarea value={formValues.descripcion} onChange={handleChange} required name="descripcion" />
          Fecha Límite
          <input value={formValues.fechaLimite} onChange={handleChange} type="date" required autoComplete="off" name="fechaLimite" />
          <div className={styles.botones}>
            <button type='button' onClick={handleCancelSubmit} className={styles.botonCancelar}>Cancelar</button>
            <button type='submit' className={styles.botonEnviar}>{activeTask ? "Editar tarea" : "Crear tarea"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
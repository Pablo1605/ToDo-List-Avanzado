import { useEffect, useState } from "react";
import { useTask } from "../../../hooks/useTask";
import { taskStore } from "../../../store/taskStore";
import { BacklogCard } from "../../ui/BacklogCard/BacklogCard";
import styles from "./BacklogMain.module.css";
import { ITask } from "../../../types/ITask";
import { TaskModal } from "../../ui/TaskModal/TaskModal";
import { useSprint } from "../../../hooks/useSprint";

export const BacklogMain = () => {

  const setActiveTask = taskStore((state) => state.setActiveTask);
  const { tasks, getTasks, putDeleteTask } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  const { getSprints, sprints } = useSprint()

  useEffect(() => {
    getSprints()
  }, [])


  const [openModalTask, setOpenModalTask] = useState(false);

  const handleOpenModalEditTask = (task: ITask) => {
    setActiveTask(task);
    setOpenModalTask(true);
  };

  const handleCloseModalTask = () => {
    setOpenModalTask(false);
    setActiveTask(null);
  };

  const handleDeleteTask = (idTask: string) => {
    putDeleteTask(idTask)
  }
  const { receiveBacklogTask } = useSprint()
  const { sendTaskToSprint } = useTask()

  const handleSendTaskToSprint = (taskToSend: ITask, idSprint: string) => {
    const sprintToSend = sprints.find((sprint) => sprint.id == idSprint)
    if (!sprintToSend) return;
    const updatedTasks = [...sprintToSend?.tareas, taskToSend]

    sendTaskToSprint(sprintToSend.id!)
    receiveBacklogTask({ ...sprintToSend!, tareas: updatedTasks });
    putDeleteTask(taskToSend.id!);
  }
  return (
    <>
      <div className={styles.containerPrincipal}>
        <h1>Backlog</h1>
        <div className={styles.subtituloBoton}>
          <h2>Tareas en el backlog</h2>
          <button onClick={() => { setOpenModalTask(true) }}>Crear Tarea</button>
        </div>
        <div className={styles.containerSecundario}>
          {tasks?.length > 0 ? (
            tasks.map((el) => (
              <BacklogCard
                key={el.id}
                handleOpenModalEdit={handleOpenModalEditTask}
                task={el}
                handleDeleteTask={handleDeleteTask}
                handleSendTaskToSprint={handleSendTaskToSprint}
              />
            ))
          ) : (
            <div>
              <h3>No hay tareas</h3>
            </div>
          )}
        </div>
      </div>
      {openModalTask && (<TaskModal handleCloseModalTask={handleCloseModalTask} />)}
    </>
  );
};
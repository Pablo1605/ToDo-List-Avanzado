import { useEffect, useState } from "react";
import { useSprint } from "../../../hooks/useSprint";
import { ITask } from "../../../types/ITask";
import { SprintTaskCard } from "../../ui/SprintTaskCard/SprintTaskCard";
import styles from "./SprintMain.module.css";
import { ISprint } from "../../../types/ISprint";
import { taskStore } from "../../../store/taskStore";
import { useTask } from "../../../hooks/useTask";
import { ModalViewTask } from "../../ui/ModalViewTask/ModalViewTask";
import { TaskSprintModal } from "../../ui/TaskSprintModal/TaskSprintModal";
import { useSearchParams } from "react-router-dom";

export const SprintMain = () => {
    const [searchParams] = useSearchParams();
    const { getSprints, sprints } = useSprint();
    const [sprintUrlId, setSprintUrlId] = useState("");

    useEffect(() => {
        const url = searchParams.get("id");
        if (url) setSprintUrlId(url);
    }, [searchParams]);

    useEffect(() => {
        getSprints();
    }, []);

    useEffect(() => {
        if (sprints.length > 0 && sprintUrlId) {
            handleGetTasks();
        }
    }, [sprints, sprintUrlId]);

    const [sprint, setSprint] = useState<ISprint>();
    const handleGetTasks = () => {
        const sprintURL = sprints.find((sprint) => sprint.id === sprintUrlId);
        if (!sprintURL) {
            setSprint(undefined);
            setPendingTasks([]);
            setInProgressTasks([]);
            setCompletedTasks([]);
            return;
        }
        setSprint(sprintURL);
        const tasks = sprintURL.tareas || [];
        sortTasks(tasks);
    };

    const [pendingTasks, setPendingTasks] = useState<ITask[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);
    const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

    const sortTasks = (tasks: ITask[]) => {
        const pending = tasks.filter(task => task.estado === 'pendiente');
        const inProgress = tasks.filter(task => task.estado === 'en progreso');
        const completed = tasks.filter(task => task.estado === 'completado');

        setPendingTasks(pending);
        setInProgressTasks(inProgress);
        setCompletedTasks(completed);
    };

    const { changeSprintTaskState } = useSprint();
    const handleChangeStateToPending = (task: ITask) => {
        const updatedTask: ITask = {
            ...task, estado: 'pendiente'
        };
        handleUpdateTask(updatedTask);
    };
    const handleChangeStateToInProgress = (task: ITask) => {
        const updatedTask: ITask = {
            ...task, estado: 'en progreso'
        };
        handleUpdateTask(updatedTask);
    };
    const handleChangeStateToCompleted = (task: ITask) => {
        const updatedTask: ITask = {
            ...task, estado: 'completado'
        };
        handleUpdateTask(updatedTask);
    };
    const handleUpdateTask = (updatedTask: ITask) => {
        const updatedTasks = sprint?.tareas.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        if (!updatedTasks) return;
        changeSprintTaskState({
            ...sprint!, tareas: updatedTasks
        });
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleCloseModal = () => {
        setIsOpenModal(false);
    };
    const setActiveTask = taskStore((state) => state.setActiveTask);
    const handleOpenEditModal = (task: ITask) => {
        setActiveTask(task);
        setIsOpenModal(true);
    };

    const { addSprintTask } = useSprint();
    const handleCreateTaskInSprint = (newTask: ITask) => {
        if (!sprint) return;
        const updatedTasks = [...sprint.tareas, newTask];
        addSprintTask({
            ...sprint, tareas: updatedTasks
        });
    };

    const { putUpdateSprintTask } = useSprint();
    const handleEditTaskInSprint = (editedTask: ITask) => {
        if (!sprint) return;
        const updatedTasks = sprint.tareas.map((task) =>
            task.id === editedTask.id ? editedTask : task
        );
        putUpdateSprintTask({
            ...sprint, tareas: updatedTasks
        });
    };

    const { putDeleteSprintTask } = useSprint();
    const handleDeleteTask = (taskId: string) => {
        if (!sprint) return;
        const updatedTasks = sprint.tareas.filter(task => task.id !== taskId);
        putDeleteSprintTask({
            ...sprint, tareas: updatedTasks
        });
        sortTasks(updatedTasks);
    };

    const [isOpenViewModal, setIsOpenViewModal] = useState(false);
    const [taskView, setTaskView] = useState<ITask>();

    const handleOpenViewModal = (task: ITask) => {
        setIsOpenViewModal(true);
        setTaskView(task);
    };

    const { receiveSprintTask } = useTask();
    const { sendTaskToBacklog } = useSprint();
    const handleSendToBacklog = (taskIn: ITask) => {
        if (!sprint) return;
        const updatedTasks = sprint.tareas.filter(task => task.id !== taskIn.id);
        sendTaskToBacklog({
            ...sprint, tareas: updatedTasks
        });
        receiveSprintTask(taskIn);
    };

    return (
        <>
            <div className={styles.containerPrincipal}>
                <h1>{sprint?.nombre}</h1>
                <div className={styles.subtituloBoton}>
                    <h2>Tareas en el sprint</h2>
                    <button onClick={() => setIsOpenModal(true)}>Crear Tarea</button>
                </div>
                <div className={styles.containerSecundario}>
                    <div className={styles.contenedorPendiente}>
                        <h3>Pendiente</h3>
                        {pendingTasks.length > 0 ? (
                            <SprintTaskCard
                                tasks={pendingTasks}
                                handleChangeStateToInProgress={handleChangeStateToInProgress}
                                handleChangeStateToPending={handleChangeStateToPending}
                                handleChangeStateToCompleted={handleChangeStateToCompleted}
                                handleOpenEditModal={handleOpenEditModal}
                                handleDeleteTask={handleDeleteTask}
                                handleOpenViewModal={handleOpenViewModal}
                                handleSendToBacklog={handleSendToBacklog}
                            />
                        ) : (
                            <p>No hay tareas pendientes en este momento</p>
                        )}
                    </div>
                    <div className={styles.contenedorEnProgreso}>
                        <h3>En Progreso</h3>
                        {inProgressTasks.length > 0 ? (
                            <SprintTaskCard
                                tasks={inProgressTasks}
                                handleChangeStateToInProgress={handleChangeStateToInProgress}
                                handleChangeStateToPending={handleChangeStateToPending}
                                handleChangeStateToCompleted={handleChangeStateToCompleted}
                                handleOpenEditModal={handleOpenEditModal}
                                handleDeleteTask={handleDeleteTask}
                                handleOpenViewModal={handleOpenViewModal}
                                handleSendToBacklog={handleSendToBacklog}
                            />
                        ) : (
                            <p>No hay tareas en progreso en este momento</p>
                        )}
                    </div>
                    <div className={styles.contenedorCompletado}>
                        <h3>Completado</h3>
                        {completedTasks.length > 0 ? (
                            <SprintTaskCard
                                tasks={completedTasks}
                                handleChangeStateToInProgress={handleChangeStateToInProgress}
                                handleChangeStateToPending={handleChangeStateToPending}
                                handleChangeStateToCompleted={handleChangeStateToCompleted}
                                handleOpenEditModal={handleOpenEditModal}
                                handleDeleteTask={handleDeleteTask}
                                handleOpenViewModal={handleOpenViewModal}
                                handleSendToBacklog={handleSendToBacklog}
                            />
                        ) : (
                            <p>No hay tareas completadas en este momento</p>
                        )}
                    </div>
                </div>
            </div>
            {isOpenModal && <TaskSprintModal handleCloseModal={handleCloseModal} handleCreateTaskInSprint={handleCreateTaskInSprint} handleEditTaskInSprint={handleEditTaskInSprint} />}
            {isOpenViewModal && <ModalViewTask task={taskView!} setOpenViewModal={setIsOpenViewModal} />}
        </>
    );
};
import { taskStore } from "../store/taskStore";
import { getTasksController, createTaskController, updateTaskController, deleteTaskController } from "../data/backlogController";
import { ITask } from "../types/ITask";
import { useShallow } from "zustand/shallow";

export const useTask = () => {
	const { tasks, setArrayTasks, addNewTask, updateTask, deleteTask } = taskStore(useShallow((state) => ({
			tasks: state.tasks,
			setArrayTasks: state.setArrayTasks,
			addNewTask: state.addNewTask,
			updateTask: state.updateTask,
			deleteTask: state.deleteTask,
		}))
	);

	const getTasks = async () => {
		const data = await getTasksController();
		if (data) {
			setArrayTasks(data);
		}
	};

	const addTask = async (newTask: ITask) => {
		addNewTask(newTask);
		try {
			await createTaskController(newTask);
		} catch (error) {
			deleteTask(newTask.id!);
			console.error("Error en addTask:", error);
		}
	};

	const putUpdateTask = async (updatedTask: ITask) => {
		const previousTask = tasks.find((task) => task.id === updatedTask.id);
		if (previousTask) {
			updateTask(updatedTask);
			try {
				await updateTaskController(updatedTask);
			} catch (error) {
				updateTask(previousTask);
				console.error("Error en putUpdateTask:", error);
			}
		}
	};

	const putDeleteTask = async (idDeletedTask: string) => {
		const previousTask = tasks.find((task) => task.id === idDeletedTask);
		if (previousTask) {
			deleteTask(idDeletedTask);
			try {
				await deleteTaskController(idDeletedTask);
			} catch (error) {
				addTask(previousTask);
				console.error("Error en putDeleteTask:", error);
			}
		}
	};

	return { tasks, getTasks, addTask, putUpdateTask, putDeleteTask };
};
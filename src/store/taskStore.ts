import { create } from "zustand";
import { ITask } from "../types/ITask";

interface ITaskStore {
    tasks: ITask[];
    activeTask: ITask | null;
    setArrayTasks: (tasks: ITask[]) => void;
    setActiveTask: (task: ITask | null) => void;
    addNewTask: (task: ITask) => void;
    updateTask: (task: ITask) => void;
    deleteTask: (taskId: string) => void;
}

export const taskStore = create<ITaskStore>((set) => ({
    tasks: [],
    activeTask: null,
    setArrayTasks: (tasksArray) => set(() => ({ tasks: tasksArray })),
    setActiveTask: (activeTaskIn) => set(() => ({ activeTask: activeTaskIn })),
    addNewTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
    updateTask: (updatedTask) => set((state) => {
        const updatedTasks = state.tasks.map((taskA) => taskA.id === updatedTask.id ? { ...taskA, ...updatedTask } : taskA);
        return { tasks: updatedTasks };
    }),
    deleteTask: (taskId) => set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
        return { tasks: updatedTasks };
    }),
}));

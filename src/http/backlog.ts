import axios from "axios";
import { ITask } from "../types/ITask";
import { IBacklog } from "../types/IBacklog";
export const putBacklog = async (task : ITask[]) => {
    try{
        const BACKLOG_API = import.meta.env.VITE_BACKLOG_ENDPOINT;
        const response = await axios.put<IBacklog>(BACKLOG_API, {
            task: task
        });
        return response.data;
    } catch (error) {
        console.error("Algo salió mal putBacklog:", error);
    }
}
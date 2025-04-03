import axios from "axios";
import { ITask } from "../types/ITask";
import { IBacklog } from "../types/IBacklog";
import { API_URL } from "../.env/const";

export const putBacklog = async (task : ITask[]) => {
    try{
        const response = await axios.put<IBacklog>(API_URL, {
            task: task
        });
        return response.data;
    } catch (error) {
        console.error("Algo salió mal backlog:", error);
    }
}
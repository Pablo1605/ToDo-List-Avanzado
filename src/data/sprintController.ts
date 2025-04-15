import axios from "axios";
import { ISprint } from "../types/ISprint";
import { putSprintList } from "../http/putSprintList";

export const getSprintsController = async():Promise<ISprint[]| undefined> => {
    try{
        const SPRINTLIST_API = import.meta.env.VITE_SPRINTLIST_ENDPOINT;
        const response=await axios.get<{sprints:ISprint[]}>(SPRINTLIST_API);
        return response.data.sprints;
    }catch(error){
        console.log("Error en getSprintsController", error)
    }
}

export const createSprintController = async (newSprint: ISprint) => {
    try {
        const sprintsBd = await getSprintsController();
        if (sprintsBd) {
            await putSprintList([...sprintsBd, newSprint]);
        } else {
            await putSprintList([newSprint]);
        }
        return newSprint;
    } catch (error) {
        console.log("Error en createTareaController", error);
    }
};

export const updateSprintController = async (updatedSprint: ISprint) => {
    try {
        const sprintsBd = await getSprintsController();
        if (sprintsBd) {
            const result = sprintsBd.map((sprintBd) => sprintBd.id === updatedSprint.id ? { ...sprintBd, ...updatedSprint } : sprintBd);
            await putSprintList(result);
        }
        return updatedSprint; 
    } catch (error) {
        console.log("Error en updateSprintController", error);
    }
};

export const deleteSprintController = async (idDeletedSprint: string) => {
    try {
        const sprintsDb = await getSprintsController();
        if (sprintsDb) {
            const result = sprintsDb.filter((sprintDb) => sprintDb.id !== idDeletedSprint);
            await putSprintList(result);
        }
    } catch (error) {
        console.log("Error en deleteSprintController", error);
    }
};
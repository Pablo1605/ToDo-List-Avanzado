import { useShallow } from "zustand/shallow";
import { sprintStore } from "../store/sprintStore";
import { createSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintController";
import { ISprint } from "../types/ISprint";

export const useSprint = () => {
    const { sprints, setArraySprint, addNewSprint, updateSprint, deleteSprint } = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        setArraySprint: state.setArraySprint,
        addNewSprint: state.addNewSprint,
        updateSprint: state.updateSprint,
        deleteSprint: state.deleteSprint,
    }))
    );

    const getSprints = async () => {
        const data = await getSprintsController();
        if (data) {
            setArraySprint(data);
        }
    };

    const addSprint = async (newSprint: ISprint) => {
        addNewSprint(newSprint);
        try {
            await createSprintController(newSprint);
        } catch (error) {
            deleteSprint(newSprint.id!);
            console.error("Error en addSprint:", error);
        }
    };

    const putUpdateSprint = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id);
        if (previousSprint) {
            updateSprint(updatedSprint);
            try {
                await updateSprintController(updatedSprint);
            } catch (error) {
                updateSprint(previousSprint);
                console.error("Error en putUpdateSprint:", error);
            }
        }
    };

    const putDeleteSprint = async (idDeletedSprint: string) => {
        const previousSprint = sprints.find((sprint) => sprint.id === idDeletedSprint);
        if (previousSprint) {
            deleteSprint(idDeletedSprint);
            try {
                await deleteSprintController(idDeletedSprint);
            } catch (error) {
                addSprint(previousSprint!);
                console.error("Error en putDeleteSprint:", error);
            }
        }
    };

    const addSprintTask = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        try {
            await updateSprintController(updatedSprint)
            updateSprint(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en addSprintTask:", error);
        }
    }

    const putUpdateSprintTask = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        try {
            await updateSprintController(updatedSprint)
            updateSprint(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en putUpdateSprintTask:", error);
        }
    }

    const putDeleteSprintTask = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        if (previousSprint) return
        try {
            await updateSprintController(updatedSprint)
            updateSprint(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en putDeleteSprintTask:", error);
        }
    }

    const changeSprintTaskState = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        updateSprint(updatedSprint)
        try {
            await updateSprintController(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en changeSprintTaskState:", error);
        }
    }

    const sendTaskToBacklog = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        try {
            await updateSprintController(updatedSprint)
            updateSprint(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en sendTaskToBacklog:", error);
        }
    }

    const receiveBacklogTask = async (updatedSprint: ISprint) => {
        const previousSprint = sprints.find((el) => el.id === updatedSprint.id)
        try {
            await updateSprintController(updatedSprint)
            updateSprint(updatedSprint)
        } catch (error) {
            if (previousSprint) updateSprint(previousSprint)
            console.error("Error en receiveBacklogTask:", error);
        }
    }

    return { sprints, getSprints, addNewSprint, putUpdateSprint, putDeleteSprint, addSprintTask, putUpdateSprintTask, putDeleteSprintTask, changeSprintTaskState, sendTaskToBacklog, receiveBacklogTask };
};
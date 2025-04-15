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

    return { sprints, getSprints, addNewSprint, putUpdateSprint, putDeleteSprint };
};
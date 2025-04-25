import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
    sprints: ISprint[];
    activeSprint: ISprint | null;
    sprintEnProgreso: ISprint | null;
    setArraySprint: (sprint: ISprint[]) => void;
    setActiveSprint: (sprint: ISprint | null) => void;
    addNewSprint: (sprint: ISprint) => void;
    updateSprint: (sprint: ISprint) => void;
    deleteSprint: (sprintId: string) => void;
    setSprintEnProgreso: (sprintEnProgreso: ISprint | null) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    activeSprint: null,
    sprintEnProgreso: null,
    setArraySprint: (arraySprints) => set(() => ({ sprints: arraySprints })),
    setActiveSprint: (activeSprintIn) => set(() => ({activeSprint: activeSprintIn})),
    addNewSprint: (newSprint) => set((state) => ({sprints: [...state.sprints, newSprint]})),
    updateSprint: (updatedSprint) => set((state) => {
        const arregloSprint = state.sprints.map((sprint) => sprint.id === updatedSprint.id ? { ...sprint, ...updatedSprint } : sprint)
        return { sprints: arregloSprint }
    }),
    deleteSprint: (sprintId) => set((state) => {
        const arregloSprint = state.sprints.filter((sprint) => sprint.id !== sprintId)
        return { sprints: arregloSprint }
    }),
    setSprintEnProgreso: (sprintEnProgresoIn) =>
        set(() => ({ sprintEnProgreso: sprintEnProgresoIn })),
}))
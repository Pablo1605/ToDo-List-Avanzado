import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface ISprintStore {
    sprints: ISprint[];
    activeSprint: ISprint | null;
    setArraySprint: (sprint: ISprint[]) => void;
    setActiveSprint: (sprint: ISprint | null) => void;
    addNewSprint: (sprint: ISprint) => void;
    updateSprint: (sprint: ISprint) => void;
    deleteSprint: (sprintId: string) => void;
}

export const sprintStore = create<ISprintStore>((set) => ({
    sprints: [],
    activeSprint: null,
    setArraySprint: (arraySprints) => set(() => ({ sprints: arraySprints })),
    setActiveSprint: (activeSprintIn) => set(() => ({activeSprint: activeSprintIn})),
    addNewSprint: (newSprint) => set((state) => ({sprints: [...state.sprints, newSprint]})),
    updateSprint: (updatedSprint) => set((state) => ({
        sprints: state.sprints.map((el) => el.id === updatedSprint.id ? {...el, ...updatedSprint}: el),
    })),
    deleteSprint: (sprintId) => set((state) => ({
        sprints: state.sprints.filter((el) => el.id !== sprintId)
    })),
}))
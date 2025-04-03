import { create } from "zustand";

interface ScreenState {
  currentScreen: "backlog" | "sprint";
  setScreen: (screen: "backlog" | "sprint") => void;
}

export const useScreenStore = create<ScreenState>((set) => ({
  currentScreen: "backlog",
  setScreen: (screen) => set({ currentScreen: screen }),
}));
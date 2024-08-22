import { create } from "zustand";
import { State } from "./state.types";

export const useAppState = create<State>((set) => ({
  filters: null,
  setFilters: (filters) => set({ filters }),
}));

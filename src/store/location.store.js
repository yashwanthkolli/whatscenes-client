import { create } from "zustand"

export const useLocationStore = create((set) => ({
  location: null,
  isInitialized: false,

  setLocation: (location) => set({ location, isInitialized: true }),

  clearLocation: () => set({ location: null, isInitialized: false }),
}))

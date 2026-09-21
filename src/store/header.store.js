import { create } from "zustand"

export const useHeaderStore = create((set) => ({
  config: {
    variant: "default",
    sticky: false,
    visible: true,
  },

  setHeader: (config) =>
    set((state) => ({
      config: {
        ...state.config,
        ...config,
      },
    })),

  resetHeader: () =>
    set({
      config: {
        variant: "default",
        sticky: false,
        visible: true,
      },
    }),
}))

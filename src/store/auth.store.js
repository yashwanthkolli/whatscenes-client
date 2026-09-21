import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isBootstrapping: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setBootstrapping: (value) =>
    set({
      isBootstrapping: value,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isBootstrapping: false,
    }),
}))

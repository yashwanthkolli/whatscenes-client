import { create } from "zustand"

export const useModalStore = create((set) => ({
  modal: null,

  openModal: (component, props = {}) =>
    set({
      modal: { component, props },
    }),

  closeModal: () =>
    set({
      modal: null,
    }),
}))

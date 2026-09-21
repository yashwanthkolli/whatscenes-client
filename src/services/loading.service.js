import { useLoadingStore } from "@/store/loading.store"

export const startLoading = () => {
  useLoadingStore.getState().start()
}

export const stopLoading = () => {
  useLoadingStore.getState().stop()
}

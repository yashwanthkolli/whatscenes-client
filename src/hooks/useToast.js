import { useToastStore } from "@/store/toast.store"

export default function useToast() {
  const addToast = useToastStore((s) => s.addToast)

  return {
    success: (message) => addToast({ type: "success", message }),

    error: (message) => addToast({ type: "error", message }),

    info: (message) => addToast({ type: "info", message }),
  }
}

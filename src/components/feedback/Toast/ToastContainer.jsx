import { useToastStore } from "@/store/toast.store"
import ToastItem from "./ToastItem"

import "./Toast.styles.scss"

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

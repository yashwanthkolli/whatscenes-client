import { useEffect, useRef } from "react"
import gsap from "gsap"

import { useToastStore } from "@/store/toast.store"

const TOAST_DURATION = 4000

export default function ToastItem({ toast }) {
  const ref = useRef(null)

  const removeToast = useToastStore((s) => s.removeToast)

  useEffect(() => {
    const el = ref.current

    gsap.fromTo(
      el,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      }
    )

    const timer = setTimeout(() => {
      handleClose()
    }, TOAST_DURATION)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    const el = ref.current

    gsap.to(el, {
      x: 80,
      opacity: 0,
      duration: 0.25,
      onComplete: () => removeToast(toast.id),
    })
  }

  return (
    <div ref={ref} className={`toast toast--${toast.type}`}>
      <span className="toast__message">{toast.message}</span>

      <button
        className="toast__close"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  )
}
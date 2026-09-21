import { useEffect, useRef } from "react"
import gsap from "gsap"

import { useModalStore } from "@/store/modal.store"

import ModalBackdrop from "./ModalBackdrop"

import "./Modal.styles.scss"

export default function ModalContainer({ children }) {
  const ref = useRef()

  const closeModal = useModalStore((s) => s.closeModal)

  useEffect(() => {
    const el = ref.current

    gsap.fromTo(
      el,
      { y: 24, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      }
    )
  }, [])

  return (
    <div className="modal">
      <ModalBackdrop onClick={closeModal} />

      <div ref={ref} className="modal__container">
        {children}
      </div>
    </div>
  )
}
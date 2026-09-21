import { useModalStore } from "@/store/modal.store"

import ModalContainer from "./ModalContainer"

export default function ModalRoot() {
  const modal = useModalStore((s) => s.modal)

  if (!modal) return null

  const Component = modal.component

  return (
    <ModalContainer>
      <Component {...modal.props} />
    </ModalContainer>
  )
}
import { useModalStore } from "@/store/modal.store"

export default function useModal() {
  const openModal = useModalStore((s) => s.openModal)
  const closeModal = useModalStore((s) => s.closeModal)

  return {
    openModal,
    closeModal,
  }
}

import { useEffect } from "react"
import { useHeaderStore } from "@/store/header.store"

export default function useHeader(config) {
  const setHeader = useHeaderStore((s) => s.setHeader)
  const resetHeader = useHeaderStore((s) => s.resetHeader)

  useEffect(() => {
    setHeader(config)

    return () => {
      resetHeader()
    }
  }, [])
}

import { useEffect, useRef, useState } from "react"

import Logo from "@/assets/logo.png"

import { PAGE_TRANSITION_CSS_VARIABLES } from "./PageTransition.constants"

import "./PageTransitionLoader.styles.scss"

export default function PageTransitionLoader({
  initial = false,
  phase = "entering",
  onExitComplete,
}) {
  const [hasEntered, setHasEntered] = useState(initial)
  const hasReportedExitRef = useRef(false)

  useEffect(() => {
    if (initial || phase === "exiting") return undefined

    const frame = window.requestAnimationFrame(() => {
      setHasEntered(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [initial, phase])

  useEffect(() => {
    if (phase === "exiting") {
      hasReportedExitRef.current = false
    }
  }, [phase])

  const handleTransitionEnd = (event) => {
    if (
      phase !== "exiting" ||
      event.target !== event.currentTarget ||
      hasReportedExitRef.current
    ) {
      return
    }

    hasReportedExitRef.current = true
    onExitComplete?.()
  }

  const className = [
    "page-transition-loader",
    initial ? "page-transition-loader--initial" : `page-transition-loader--${phase}`,
    hasEntered ? "page-transition-loader--entered" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={className}
      data-ws-loader="1"
      data-ws-base=""
      style={PAGE_TRANSITION_CSS_VARIABLES}
      aria-hidden="true"
      inert=""
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className="page-transition-loader__mark"
        data-ws-mark="1"
        style={{
          WebkitMaskImage: `url(${Logo})`,
          maskImage: `url(${Logo})`,
        }}
      />
    </div>
  )
}

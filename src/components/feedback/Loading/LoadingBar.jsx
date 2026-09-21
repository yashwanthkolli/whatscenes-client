import { useEffect, useRef } from "react"
import gsap from "gsap"

import { useLoadingStore } from "@/store/loading.store"

import "./LoadingBar.styles.scss"

const INITIAL_PROGRESS = 15
const MAX_PROGRESS = 85
const PROGRESS_INTERVAL = 500

export default function LoadingBar() {
  const activeRequests = useLoadingStore((s) => s.activeRequests)

  const barRef = useRef(null)
  const progressRef = useRef(0)
  const intervalRef = useRef(null)

  const startProgress = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      progressRef.current = Math.min(
        progressRef.current + Math.random() * 10,
        MAX_PROGRESS
      )

      gsap.to(barRef.current, {
        width: `${progressRef.current}%`,
        duration: 0.5,
        ease: "power2.out",
      })
    }, PROGRESS_INTERVAL)
  }

  const finishProgress = () => {
    clearInterval(intervalRef.current)

    gsap.to(barRef.current, {
      width: "100%",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(barRef.current, { width: "0%" })
        progressRef.current = 0
      },
    })
  }

  useEffect(() => {
    if (!barRef.current) return

    if (activeRequests > 0) {
      if (progressRef.current === 0) {
        gsap.set(barRef.current, { width: `${INITIAL_PROGRESS}%` })
        progressRef.current = INITIAL_PROGRESS
      }

      startProgress()
    } else {
      finishProgress()
    }

    return () => {
      clearInterval(intervalRef.current)
      gsap.killTweensOf(barRef.current)
    }
  }, [activeRequests])

  return (
    <div className="loading-bar">
      <div ref={barRef} className="loading-bar__progress" />
    </div>
  )
}
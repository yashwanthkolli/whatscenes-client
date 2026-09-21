import { useCallback, useEffect, useRef, useState } from "react"

import PageTransitionLoader from "@/components/feedback/Loading/PageTransitionLoader"
import { PAGE_TRANSITION_TIMINGS } from "@/components/feedback/Loading/PageTransition.constants"

const getLocationId = (location) => {
  if (!location) return null

  return `${location.pathname}${location.search}${location.hash}`
}

export default function PageTransitionProvider({ children, router }) {
  const [routerState, setRouterState] = useState(() => router.state)
  const [transition, setTransition] = useState(null)

  const transitionRef = useRef(null)
  const routerStateRef = useRef(router.state)
  const transitionIdRef = useRef(0)
  const coverTimerRef = useRef(null)
  const exitFallbackTimerRef = useRef(null)

  const clearTimers = useCallback(() => {
    window.clearTimeout(coverTimerRef.current)
    window.clearTimeout(exitFallbackTimerRef.current)

    coverTimerRef.current = null
    exitFallbackTimerRef.current = null
  }, [])

  const completeTransition = useCallback(
    (id) => {
      const current = transitionRef.current

      if (!current || current.id !== id || routerStateRef.current.navigation.state !== "idle") {
        return
      }

      clearTimers()
      transitionRef.current = null
      setTransition((activeTransition) => (activeTransition?.id === id ? null : activeTransition))
    },
    [clearTimers]
  )

  const beginTransition = useCallback(
    (target = null) => {
      clearTimers()

      const id = transitionIdRef.current + 1
      const startedAt = performance.now()

      transitionIdRef.current = id
      transitionRef.current = {
        id,
        phase: "entering",
        startedAt,
        target,
      }

      setTransition({ id, phase: "entering" })
    },
    [clearTimers]
  )

  const beginExit = useCallback(
    (id) => {
      const current = transitionRef.current

      if (
        !current ||
        current.id !== id ||
        current.phase === "exiting" ||
        routerStateRef.current.navigation.state !== "idle"
      ) {
        return
      }

      current.phase = "exiting"
      setTransition({ id, phase: "exiting" })

      exitFallbackTimerRef.current = window.setTimeout(() => {
        completeTransition(id)
      }, PAGE_TRANSITION_TIMINGS.exitFallback)
    },
    [completeTransition]
  )

  const finishWhenRouteIsReady = useCallback(() => {
    const current = transitionRef.current

    if (
      !current ||
      current.phase === "exiting" ||
      routerStateRef.current.navigation.state !== "idle"
    ) {
      return
    }

    window.clearTimeout(coverTimerRef.current)

    const remainingCoverTime = Math.max(
      0,
      PAGE_TRANSITION_TIMINGS.coverUntil - (performance.now() - current.startedAt)
    )

    coverTimerRef.current = window.setTimeout(() => {
      beginExit(current.id)
    }, remainingCoverTime)
  }, [beginExit])

  useEffect(() => {
    const unsubscribe = router.subscribe((nextState) => {
      routerStateRef.current = nextState
      setRouterState(nextState)
    })

    return unsubscribe
  }, [router])

  useEffect(() => {
    const navigate = router.navigate

    const navigateWithTransition = (...args) => {
      beginTransition()
      return navigate(...args)
    }

    router.navigate = navigateWithTransition

    return () => {
      if (router.navigate === navigateWithTransition) {
        router.navigate = navigate
      }
    }
  }, [beginTransition, router])

  useEffect(() => {
    const handlePopState = () => {
      if (!transitionRef.current) {
        beginTransition(getLocationId(window.location))
      }
    }

    window.addEventListener("popstate", handlePopState, true)

    return () => window.removeEventListener("popstate", handlePopState, true)
  }, [beginTransition])

  useEffect(() => {
    if (!routerState.initialized) return

    const { navigation } = routerState

    if (navigation.state === "idle") {
      finishWhenRouteIsReady()
      return
    }

    const target = getLocationId(navigation.location)
    const current = transitionRef.current

    if (!current || current.target !== target) {
      beginTransition(target)
    }
  }, [beginTransition, finishWhenRouteIsReady, routerState])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  const isTransitionActive = transition !== null

  return (
    <>
      <div
        className="page-transition-provider__content"
        inert={isTransitionActive ? "" : undefined}
      >
        {children}
      </div>

      {!routerState.initialized && <PageTransitionLoader initial />}

      {transition && (
        <PageTransitionLoader
          key={transition.id}
          phase={transition.phase}
          onExitComplete={() => completeTransition(transition.id)}
        />
      )}
    </>
  )
}

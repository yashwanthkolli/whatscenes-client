import { createElement } from "react"

export const createLazyRoute = (loadPage, { guard: Guard, props } = {}) => async () => {
  const { default: Page } = await loadPage()

  function RoutePage() {
    const page = createElement(Page, props)

    return Guard ? createElement(Guard, null, page) : page
  }

  return { Component: RoutePage }
}

import { createLazyRoute } from "@/app/lazyRoute"

export const eventRoutes = [
  {
    path: "/app",
    lazy: createLazyRoute(() => import("./pages/HomePage/HomePage")),
  },
  {
    path: "/events",
    lazy: createLazyRoute(() => import("./pages/EventsPage")),
  },
  {
    path: "/events/:city/:slug",
    lazy: createLazyRoute(() => import("./pages/EventDetailsPage/EventDetailsPage")),
  },
]

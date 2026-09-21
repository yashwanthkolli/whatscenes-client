import GuestOnlyRoute from "../../guards/GuestOnlyRoute"
import { createLazyRoute } from "@/app/lazyRoute"

export const authRoutes = [
  {
    path: "/auth/login",
    lazy: createLazyRoute(() => import("./pages/LoginPage/LoginPage"), {
      guard: GuestOnlyRoute,
    }),
  },
]

import ProtectedRoute from "@/guards/ProtectedRoute"
import { createLazyRoute } from "@/app/lazyRoute"

export const userRoutes = [
  {
    path: "/profile",
    lazy: createLazyRoute(() => import("./pages/ProfilePage/ProfilePage"), {
      guard: ProtectedRoute,
    }),
  },

  {
    path: "/connections",
    lazy: createLazyRoute(() => import("./pages/ConnectionsPage/ConnectionsPage"), {
      guard: ProtectedRoute,
    }),
  },

  {
    path: "/my-scenes",
    lazy: createLazyRoute(() => import("./pages/MyEventsPage/MyEventsPage"), {
      guard: ProtectedRoute,
    }),
  },

  {
    path: "/profile/edit",
    lazy: createLazyRoute(() => import("./pages/EditProfilePage/EditProfilePage"), {
      guard: ProtectedRoute,
    }),
  },

  {
    path: "/profile/settings",
    lazy: createLazyRoute(() => import("./pages/SettingsPage/SettingsPage"), {
      guard: ProtectedRoute,
    }),
  },
]

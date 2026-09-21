import { createBrowserRouter } from "react-router-dom"

import AppBootstrap from "./AppBootstrap"
import { createLazyRoute } from "./lazyRoute"

import MainLayout from "@/layouts/MainLayout/MainLayout"
import MinimalLayout from "@/layouts/MinimalLayout/MinimalLayout"
import RouterErrorBoundary from "@/components/error/RouterErrorBoundary"

import {
  appRoutes,
  authenticationRoutes,
  onboardingFeatureRoutes,
  userFeatureRoutes,
  policyRoutes,
} from "./routeModules"
import NavigationProvider from "./NavigationProvider"
import GuestOnlyRoute from "../guards/GuestOnlyRoute"

export const router = createBrowserRouter([
  {
    element: (
      <NavigationProvider>
        <AppBootstrap />
      </NavigationProvider>
    ),
    errorElement: <RouterErrorBoundary />,
    children: [
      // MAIN LAYOUT
      {
        element: <MainLayout />,
        children: [...appRoutes, ...userFeatureRoutes],
      },

      // MINIMAL LAYOUT
      {
        element: <MinimalLayout />,
        children: [...authenticationRoutes, ...onboardingFeatureRoutes],
      },

      {
        path: "/",
        lazy: createLazyRoute(() => import("@/pages/LandingPage/LandingPage"), {
          guard: GuestOnlyRoute,
        }),
      },

      ...policyRoutes,

      {
        path: "*",
        lazy: createLazyRoute(() => import("@/pages/NotFoundPage/NotFoundPage")),
      },
    ],
  },
])

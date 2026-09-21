import { eventRoutes } from "@/features/events/routes"
import { authRoutes } from "@/features/auth/routes"
import { onboardingRoutes } from "@/features/onboarding/routes"
import { userRoutes } from "@/features/user/routes"
import { policyRoutes } from "@/pages/PolicyPages/routes"

export const appRoutes = [...eventRoutes]

export const authenticationRoutes = [...authRoutes]

export const onboardingFeatureRoutes = [...onboardingRoutes]

export const userFeatureRoutes = [...userRoutes]

export { policyRoutes }

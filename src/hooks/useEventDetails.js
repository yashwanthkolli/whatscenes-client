import { useQuery } from "@tanstack/react-query"
import { getEventDetails } from "@/services/event.service"
import { useAuthStore } from "@/store/auth.store"

export const useEventDetails = ({ city, slug }) => {
  const user = useAuthStore((state) => state.user)

  return useQuery({
    queryKey: ["event-details", city, slug, user?._id],

    queryFn: () => getEventDetails(city, slug),

    enabled: !!city && !!slug,

    staleTime: 5 * 60 * 1000,
  })
}

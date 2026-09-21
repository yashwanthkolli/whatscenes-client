import { useQuery } from "@tanstack/react-query"
import { getHomepageEvents } from "@/services/event.service"
import { useLocationStore } from "@/store/location.store"

export function useHomepageEvents() {
  const cityId = useLocationStore((s) => s.location?.effectiveCity?.id)

  return useQuery({
    queryKey: ["events", "home", cityId],
    queryFn: () => getHomepageEvents(cityId),
    enabled: !!cityId,
    staleTime: 1000 * 60 * 5,
  })
}

import { useQuery } from "@tanstack/react-query"

import { getMyEvents } from "@/services/user.service"

export const MY_EVENTS_TABS = {
  WAITLISTED: "WAITLISTED",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  PAST: "PAST",
}

export const useMyEvents = ({ tab = MY_EVENTS_TABS.CONFIRMED, page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: ["my-events", tab, page, limit],

    queryFn: () =>
      getMyEvents({
        tab,
        page,
        limit,
      }),

    placeholderData: (previousData) => previousData,

    staleTime: 60 * 1000,
  })
}

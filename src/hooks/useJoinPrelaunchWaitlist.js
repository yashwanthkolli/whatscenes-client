import { useMutation, useQueryClient } from "@tanstack/react-query"
import { joinPrelaunchWaitlistForEvent } from "@/services/event.service"

export const useJoinPrelaunchWaitlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId }) => joinPrelaunchWaitlistForEvent(eventId),

    onSuccess: () => {
      // Refresh event details → updates CTA
      queryClient.invalidateQueries(["event-details"])
    },
  })
}

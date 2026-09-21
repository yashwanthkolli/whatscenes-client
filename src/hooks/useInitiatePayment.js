import { useMutation, useQueryClient } from "@tanstack/react-query"
import { initiatePayment } from "@/services/event.service"

export const useInitiatePayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ registrationId }) => initiatePayment(registrationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["event-details"])
    },
  })
}

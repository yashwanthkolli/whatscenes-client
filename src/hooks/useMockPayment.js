import { useMutation, useQueryClient } from "@tanstack/react-query"
import { paymentSuccess, paymentFailure } from "@/services/event.service"

export const useMockPayment = () => {
  const queryClient = useQueryClient()

  const successMutation = useMutation({
    mutationFn: paymentSuccess,
    onSuccess: () => {
      queryClient.invalidateQueries(["event-details"])
    },
  })

  const failureMutation = useMutation({
    mutationFn: paymentFailure,
    onSuccess: () => {
      queryClient.invalidateQueries(["event-details"])
    },
  })

  return {
    successMutation,
    failureMutation,
  }
}

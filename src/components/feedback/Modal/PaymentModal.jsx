import { useState } from "react"

import ModalContainer from "@/components/feedback/Modal/ModalContainer"
import ModalHeader from "@/components/feedback/Modal/ModalHeader"
import ModalBody from "@/components/feedback/Modal/ModalBody"
import ModalFooter from "@/components/feedback/Modal/ModalFooter"

import Stack from "@/components/layout/Stack"
import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner"

import { useMockPayment } from "@/hooks/useMockPayment"
import useModal from "@/hooks/useModal"

const PaymentModal = ({ registrationId, amount }) => {
  const [status, setStatus] = useState("IDLE")

  const { closeModal } = useModal()

  const { successMutation, failureMutation } = useMockPayment()

  const handlePayment = async () => {
    try {
      setStatus("LOADING")

      // Simulate delay (UX realism)
      await new Promise((res) => setTimeout(res, 1200))

      // Random success/failure (for mock)
      const isSuccess = Math.random() > 0.3

      if (isSuccess) {
        await successMutation.mutateAsync(registrationId)
        setStatus("SUCCESS")
      } else {
        await failureMutation.mutateAsync(registrationId)
        setStatus("FAILURE")
      }
    } catch (err) {
      setStatus("FAILURE")
    }
  }

  // -------------------------
  // UI STATES
  // -------------------------

  return (
    <ModalContainer>
      <ModalHeader title="Complete Payment" />

      <ModalBody>
        <Stack gap="md" align="center">
          {status === "IDLE" && (
            <>
              <div style={{ fontSize: "20px", fontWeight: 600 }}>₹{amount}</div>
              <span>Secure your spot by completing payment</span>
            </>
          )}

          {status === "LOADING" && (
            <>
              <Spinner size="lg" />
              <span>Processing payment...</span>
            </>
          )}

          {status === "SUCCESS" && (
            <>
              <span>Payment Successful</span>
              <span>Your booking is confirmed</span>
            </>
          )}

          {status === "FAILURE" && (
            <>
              <span>Payment Failed!</span>
              <span>Please try again</span>
            </>
          )}
        </Stack>
      </ModalBody>

      <ModalFooter>
        {status === "IDLE" && (
          <>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Pay Now
            </Button>
          </>
        )}

        {status === "LOADING" && (
          <Button loading fullWidth>
            Processing...
          </Button>
        )}

        {status === "SUCCESS" && (
          <Button onClick={closeModal} fullWidth>
            Done
          </Button>
        )}

        {status === "FAILURE" && (
          <>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePayment}>
              Retry
            </Button>
          </>
        )}
      </ModalFooter>
    </ModalContainer>
  )
}

export default PaymentModal

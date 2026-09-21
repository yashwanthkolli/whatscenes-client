import Card from "@/components/layout/Card"
import Stack from "@/components/layout/Stack"
import Button from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"
import useModal from "@/hooks/useModal"
import PaymentModal from "@/components/feedback/Modal/PaymentModal"
import { useRegisterEvent } from "@/hooks/useRegisterEvent"
import { useInitiatePayment } from "@/hooks/useInitiatePayment"

import "./EventCTA.styles.scss"
import { CTA_CONFIG } from "./CTAConfig"

const EventCTA = ({ event }) => {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const registerMutation = useRegisterEvent()
  const initiatePaymentMutation = useInitiatePayment()

  const { pricing, userContext } = event

  const { cta, canRegister, reasonIfNot, registrationId } = userContext

  const config = CTA_CONFIG[cta] || {}

  const handleRegister = () => {
    registerMutation.mutate(
      {
        eventId: event.id,
        groupSize: 1,
      },
      {
        onSuccess: (registration) => {
          if (registration.status === "PAYMENT_PENDING" || registration.status === "SELECTED") {
            openModal(PaymentModal, {
              registrationId: registration.id,
              amount: pricing.price,
            })
          }
        },
      }
    )
  }

  const handleInitiatePayment = () => {
    if (!registrationId) return

    initiatePaymentMutation.mutate(
      { registrationId },
      {
        onSuccess: () => {
          openModal(PaymentModal, {
            registrationId,
            amount: pricing.price,
          })
        },
        onError: (err) => {
          const message = err?.response?.data?.message

          if (message === "Group is already full") {
            alert("All spots are filled. Please try another event.")
            return
          }

          if (message === "Payment window not open yet") {
            alert("Payment window hasn't opened yet.")
            return
          }

          alert(message || "Something went wrong")
        },
      }
    )
  }

  const handleClick = () => {
    if (config.disabled) return

    switch (config.action) {
      case "REGISTER":
        handleRegister()
        break

      case "OPEN_PAYMENT":
        handleInitiatePayment()
        break

      case "VIEW_STATUS":
        console.log("View status")
        break

      default:
        if (typeof config.action === "function") {
          config.action({ navigate })
        }
    }
  }

  const isDisabled =
    config.disabled || (!canRegister && cta !== "LOGIN_REQUIRED" && cta !== "VIEW_STATUS")

  return (
    <Card className="event-cta">
      <Stack gap="md">
        <div className="event-cta__price">₹{pricing.price}</div>

        <Button
          variant={config.variant || "white"}
          size="lg"
          fullWidth
          onClick={handleClick}
          disabled={isDisabled}
          loading={registerMutation.isPending}
        >
          {config.label || "Unavailable"}
        </Button>

        {reasonIfNot && <span className="event-cta__helper">{reasonIfNot}</span>}
      </Stack>
    </Card>
  )
}

export default EventCTA

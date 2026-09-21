import { MapPin, ArrowRight } from "lucide-react"
import { useState } from "react"

import ModalHeader from "@/components/feedback/Modal/ModalHeader"
import ModalBody from "@/components/feedback/Modal/ModalBody"
import ModalFooter from "@/components/feedback/Modal/ModalFooter"

import { useLocationStore } from "@/store/location.store"
import { initializeLocation } from "@/services/location.service"

import useModal from "@/hooks/useModal"
import useToast from "@/hooks/useToast"

import "./LocationSelectionModal.styles.scss"

const CITIES = [
  {
    id: "69dc96f38b2ab212919abaa2",
    name: "Bangalore",
  },
  {
    id: "69dc96f38b2ab212919abaa1",
    name: "Hyderabad",
  },
]

export default function LocationSelectionModal() {
  const [loading, setLoading] = useState(false)

  const setLocation = useLocationStore((s) => s.setLocation)

  const { closeModal } = useModal()
  const toast = useToast()

  const handleAutoDetect = () => {
    if (loading) return

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords

          const locationData = await initializeLocation({
            lat: latitude,
            lng: longitude,
          })

          setLocation(locationData)
          closeModal()
        } catch (err) {
          toast.error("Failed to detect location")
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)

        toast.error("Location access denied. Please select city manually.")
      }
    )
  }

  const handleCitySelect = async (cityId) => {
    if (loading) return

    setLoading(true)

    try {
      const locationData = await initializeLocation({
        cityId,
      })

      setLocation(locationData)
      closeModal()
    } catch (err) {
      toast.error("Failed to set location")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ModalHeader title="Where are you based?" />

      <ModalBody>
        <div className="location-selection">
          <p className="location-selection__intro">
            Choose your city so we can show you scenes happening around you.
          </p>

          <button
            type="button"
            className="location-selection__detect"
            onClick={handleAutoDetect}
            disabled={loading}
          >
            <span className="location-selection__detect-icon">
              <MapPin size={20} strokeWidth={1.8} />
            </span>

            <span className="location-selection__detect-content">
              <span className="location-selection__detect-title">Use my current location</span>

              <span className="location-selection__detect-description">
                We'll use your location to find your city.
              </span>
            </span>

            <ArrowRight className="location-selection__arrow" size={20} strokeWidth={1.8} />
          </button>

          <div className="location-selection__divider">
            <span />
            <em>or choose your city</em>
            <span />
          </div>

          <div className="location-selection__cities">
            {CITIES.map((city) => (
              <button
                key={city.id}
                type="button"
                className="location-selection__city"
                onClick={() => handleCitySelect(city.id)}
                disabled={loading}
              >
                <span className="location-selection__city-name">{city.name}</span>

                <ArrowRight className="location-selection__arrow" size={20} strokeWidth={1.8} />
              </button>
            ))}
          </div>
        </div>
      </ModalBody>

      <ModalFooter />
    </>
  )
}

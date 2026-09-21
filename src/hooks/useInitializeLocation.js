import { useEffect } from "react"
import { useLocationStore } from "@/store/location.store"
import { initializeLocation } from "@/services/location.service"
import useModal from "./useModal"
import LocationSelectionModal from "@/components/feedback/Modal/LocationSelectionModal"

export default function useInitializeLocation(user, isBootstrapping) {
  const { setLocation } = useLocationStore()
  const { openModal } = useModal()

  useEffect(() => {
    if (isBootstrapping) return
    // if (!user) return
    if (user?.currentLocation) {
      setLocation({
        ...user.currentLocation,
        effectiveCity: {
          id: user.currentLocation.effectiveCityId,
          name: user.currentLocation.name,
        },
      })
      return
    }

    const init = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        })

        if (permission.state === "granted" || permission.state === "prompt") {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords

            const locationData = await initializeLocation({
              lat: latitude,
              lng: longitude,
            })

            setLocation(locationData)
          })
        } else {
          openModal(LocationSelectionModal)
        }
      } catch (err) {
        openModal(LocationSelectionModal)
      }
    }

    init()
  }, [user?.currentLocation, isBootstrapping])
}

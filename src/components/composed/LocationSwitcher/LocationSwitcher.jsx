import { useLocationStore } from "@/store/location.store"
import Button from "@/components/ui/Button"
import useModal from "@/hooks/useModal"
import LocationSelectionModal from "@/components/feedback/Modal/LocationSelectionModal"

export default function LocationSwitcher() {
  const location = useLocationStore((s) => s.location)
  const { openModal } = useModal()

  const cityName = location?.effectiveCity?.name || "Select Location"

  return (
    <Button
      variant="location"
      size="sm"
      onClick={() => openModal(LocationSelectionModal)}
      aria-label={`Change location: ${cityName}`}
    >
      <span className="location-switcher__dot" aria-hidden="true" />
      &nbsp;
      <span>{cityName}</span>&nbsp;
      <span className="location-switcher__status">· prelaunch</span>
    </Button>
  )
}

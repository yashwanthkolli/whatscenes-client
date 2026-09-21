import { useRef, useState } from "react"
import { Plus } from "lucide-react"

import Spinner from "@/components/ui/Spinner"

import { uploadProfilePicture } from "@/services/onboarding.service"
import { useAuthStore } from "@/store/auth.store"

import "./ProfilePictureUploader.styles.scss"

export default function ProfilePictureUploader({ index = 0 }) {
  const fileInputRef = useRef(null)

  const { user, setUser } = useAuthStore()

  const [loading, setLoading] = useState(false)

  const profilePicture = user?.profilePictures?.[index] || null

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    try {
      setLoading(true)

      const response = await uploadProfilePicture(file)

      if (response?.data) {
        setUser({
          ...user,
          profilePictures: response.data.profilePictures,
          profileCompletion: response.data.profileCompletion,
        })
      }
    } catch (error) {
      // handled globally
    } finally {
      setLoading(false)

      // Allow the same file to be selected again.
      event.target.value = ""
    }
  }

  const openFileDialog = () => {
    if (loading) return

    fileInputRef.current?.click()
  }

  return (
    <div className="profile-picture-uploader">
      <button
        type="button"
        className={[
          "profile-picture-uploader__tile",
          profilePicture ? "profile-picture-uploader__tile--filled" : "",
          loading ? "profile-picture-uploader__tile--loading" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={openFileDialog}
        disabled={loading}
        aria-label={profilePicture ? `Change photo ${index + 1}` : `Add photo ${index + 1}`}
      >
        {profilePicture && (
          <img
            className="profile-picture-uploader__image"
            src={profilePicture}
            alt={`Profile photo ${index + 1}`}
          />
        )}

        {loading && (
          <div className="profile-picture-uploader__loading">
            <Spinner size="lg" />
          </div>
        )}

        {!profilePicture && !loading && (
          <span className="profile-picture-uploader__plus" aria-hidden="true">
            <Plus size={28} strokeWidth={1.5} />
          </span>
        )}

        {profilePicture && !loading && (
          <span className="profile-picture-uploader__edit" aria-hidden="true">
            <Plus size={20} strokeWidth={2} />
          </span>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="profile-picture-uploader__input"
        onChange={handleFileSelect}
      />
    </div>
  )
}

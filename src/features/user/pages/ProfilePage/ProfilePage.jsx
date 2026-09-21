import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import { useLocationStore } from "@/store/location.store"

import { useProfileSummary } from "@/hooks/useProfileSummary"
import useLogout from "@/hooks/useLogout"

import "./ProfilePage.styles.scss"

const ACCOUNT_LINKS = [
  {
    label: "My scenes",
    description: "Seats you hold, lists you are on, and anything cancelled.",
    to: "/my-scenes",
  },
  {
    label: "Connections",
    description: "Numbers that moved because you both asked.",
    to: "/connections",
  },
  {
    label: "Edit profile",
    description: "Photos, contact, work, lifestyle, taste. Everything that changes as you do.",
    to: "/profile/edit",
  },
  {
    label: "Settings",
    description: "What we send you, and what we do with your data.",
    to: "/profile/settings",
  },
  {
    label: "Help & policies",
    description: "Safety, terms, refunds and privacy in one place.",
    to: "/policy/faq",
  },
]

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const location = useLocationStore((s) => s.location)
  const logoutMutation = useLogout()

  const { data, isLoading, isError } = useProfileSummary()

  const stats = data?.stats
  const upcomingEvents = data?.upcomingEvents ?? []

  const firstName = user?.name?.trim()?.split(" ")?.[0] || "You"

  const city = location?.effectiveCity?.name || "Hyderabad"

  const age = user?.dateOfBirth ? calculateAge(user.dateOfBirth) : null
  const gender = user?.gender ? user.gender : null

  const isVerified = user?.profileCompletion?.photos === true

  return (
    <div className="profile-page">
      <section className="profile-page__hero">
        <div className="profile-page__identity">
          <div className="profile-page__status">
            <span className="profile-page__status-dot" />

            <span>{isVerified ? "VERIFIED" : "NOT VERIFIED YET"}</span>
          </div>

          <h1 className="profile-page__name">{firstName}</h1>

          <p className="profile-page__location">
            {age && gender ? `${age}${gender[0].toUpperCase()} · ` : ""}
            {city}
          </p>
        </div>

        <Link to="/profile/edit" className="profile-page__edit-button">
          Edit profile
        </Link>
      </section>

      <section className="profile-page__stats">
        <ProfileStat
          value={isLoading ? "—" : (stats?.eventsAttended ?? 0)}
          label="EXPERIENCES SO FAR"
        />

        <ProfileStat
          value={isLoading ? "—" : (stats?.connections ?? 0)}
          label="CONNECTIONS"
          accent
        />

        <ProfileStat value={isLoading ? "—" : upcomingEvents.length} label="COMING UP" />
      </section>

      <section className="profile-page__account">
        <div className="profile-page__section-label">YOUR ACCOUNT</div>

        <div className="profile-page__links">
          {ACCOUNT_LINKS.map((item) => (
            <Link key={item.to} to={item.to} className="profile-page__link">
              <div className="profile-page__link-copy">
                <h2 className="profile-page__link-title">{item.label}</h2>

                <p className="profile-page__link-description">{item.description}</p>
              </div>

              <span className="profile-page__link-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="profile-page__logout"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          {logoutMutation.isPending ? "Logging out…" : "Log out"}
        </button>
      </section>

      {isError && (
        <div className="profile-page__error">Unable to load your activity right now.</div>
      )}
    </div>
  )
}

function ProfileStat({ value, label, accent = false }) {
  return (
    <div className="profile-page__stat">
      <span
        className={["profile-page__stat-value", accent ? "profile-page__stat-value--accent" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </span>

      <span className="profile-page__stat-label">{label}</span>
    </div>
  )
}

function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth)

  if (Number.isNaN(birthDate.getTime())) {
    return null
  }

  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age
}

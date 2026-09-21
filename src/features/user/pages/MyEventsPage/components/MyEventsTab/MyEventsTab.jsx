import "./MyEventsTab.styles.scss"

const TABS = [
  {
    key: "WAITLISTED",
    label: "On waitlist",
  },
  {
    key: "CONFIRMED",
    label: "Confirmed",
  },
  {
    key: "CANCELLED",
    label: "Cancelled",
  },
  {
    key: "PAST",
    label: "Past",
  },
]

export default function MyEventsTabs({ activeTab, onChange }) {
  return (
    <nav className="my-events-tabs" aria-label="My events">
      {TABS.map((tab) => {
        const active = activeTab === tab.key

        return (
          <button
            key={tab.key}
            type="button"
            className={`my-events-tabs__item ${active ? "is-active" : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

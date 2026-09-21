import { useEffect, useState } from "react"

import AccountSidebar from "@/components/composed/AccountSidebar"

import MyEventsTabs from "./components/MyEventsTab/MyEventsTab"
import MyEventItem from "./components/MyEventItem/MyEventItem"
import MyEventsSkeleton from "./components/MyEventsSkeleton/MyEventsSkeleton"

import { useMyEvents } from "@/hooks/useMyEvents"

import "./MyEventsPage.styles.scss"

const DEFAULT_TAB = "CONFIRMED"
const PAGE_LIMIT = 10

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const [page, setPage] = useState(1)

  const { data, isLoading, isFetching, isError, refetch } = useMyEvents({
    tab: activeTab,
    page,
    limit: PAGE_LIMIT,
  })

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  const events = data?.events ?? []
  const pagination = data?.pagination

  const handleTabChange = (tab) => {
    if (tab === activeTab) return

    setActiveTab(tab)
    setPage(1)
  }

  const handlePreviousPage = () => {
    if (!pagination?.hasPreviousPage || isFetching) return

    setPage((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    if (!pagination?.hasNextPage || isFetching) return

    setPage((currentPage) => currentPage + 1)
  }

  return (
    <div className="account-page">
      <AccountSidebar activeItem="scenes" />

      <main className="account-page__content my-events-page">
        <header className="my-events-page__header">
          <h1 className="my-events-page__title">My events</h1>

          <p className="my-events-page__description">
            Everything you are holding: confirmed, waiting or on a list.
          </p>
        </header>

        <MyEventsTabs activeTab={activeTab} onChange={handleTabChange} />

        <section className="my-events-page__list">
          {isLoading ? (
            <MyEventsSkeleton />
          ) : isError ? (
            <div className="my-events-page__state">
              <h2>Something went wrong</h2>

              <p>We couldn't load your events right now.</p>

              <button type="button" onClick={() => refetch()}>
                Try again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="my-events-page__state">
              <h2>No events here yet</h2>

              <p>Your {activeTab.toLowerCase()} events will appear here.</p>
            </div>
          ) : (
            <>
              <div
                className={`my-events-page__items${
                  isFetching ? " my-events-page__items--fetching" : ""
                }`}
              >
                {events.map((registration) => (
                  <MyEventItem key={registration.registrationId} registration={registration} />
                ))}
              </div>

              {pagination?.totalPages > 1 && (
                <div className="my-events-page__pagination">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={!pagination.hasPreviousPage || isFetching}
                  >
                    Previous
                  </button>

                  <span>
                    {pagination.page} / {pagination.totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={!pagination.hasNextPage || isFetching}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}

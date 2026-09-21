import api from "./apiClient"

/**
 * Fetch authenticated user's registered events.
 *
 * @param {Object} params
 * @param {"WAITLISTED"|"CONFIRMED"|"CANCELLED"|"PAST"} params.tab
 * @param {number} params.page
 * @param {number} params.limit
 */
export async function getMyEvents({ tab = "CONFIRMED", page = 1, limit = 10 } = {}) {
  const res = await api.get("/user/my-events", {
    params: {
      tab,
      page,
      limit,
    },
  })

  return res.data?.data
}

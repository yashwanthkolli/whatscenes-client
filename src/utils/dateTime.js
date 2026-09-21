import { format, parseISO } from "date-fns"
import { toZonedTime } from "date-fns-tz"

const IST_TIMEZONE = "Asia/Kolkata"

/**
 * Convert UTC string to IST Date object
 */
export function toIST(dateString) {
  const utcDate = parseISO(dateString)
  return toZonedTime(utcDate, IST_TIMEZONE)
}

/**
 * Mar 21
 */
export function formatEventDate(dateString) {
  return format(toIST(dateString), "MMM d")
}

/**
 * Mar 21, 2026
 */
export function formatEventDateFull(dateString) {
  return format(toIST(dateString), "MMM d, yyyy")
}

/**
 * 6:30 PM
 */
export function formatEventTime(dateString) {
  return format(toIST(dateString), "h:mm a")
}

/**
 * Mar 21 • 6:30 PM
 */
export function formatEventDateTime(dateString) {
  return format(toIST(dateString), "MMM d • h:mm a")
}

/**
 * Mar 21, 2026 • 6:30 PM
 */
export function formatEventDateTimeFull(dateString) {
  return format(toIST(dateString), "MMM d, yyyy • h:mm a")
}

/**
 * Fri, Mar 21
 */
export function formatEventDayDate(dateString) {
  return format(toIST(dateString), "EEE, MMM d")
}
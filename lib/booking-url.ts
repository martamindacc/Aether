const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

/**
 * Builds the Calendly URL to open for a given session, preserving the current
 * page's UTM parameters and pointing Calendly's post-booking redirect at
 * /booking-confirmed so completed bookings can be tracked.
 *
 * The exact Calendly event URL itself is never changed, only query params are appended.
 */
export function buildCalendlyBookingUrl(calendlyUrl: string): string {
  if (typeof window === "undefined") return calendlyUrl

  const url = new URL(calendlyUrl)
  const currentParams = new URLSearchParams(window.location.search)

  for (const key of UTM_PARAMS) {
    const value = currentParams.get(key)
    if (value) {
      url.searchParams.set(key, value)
    }
  }

  const redirectUrl = new URL("/booking-confirmed", window.location.origin)
  url.searchParams.set("redirect_url", redirectUrl.toString())

  return url.toString()
}

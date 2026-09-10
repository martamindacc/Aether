"use client"

import { useEffect } from "react"

const GA_MEASUREMENT_ID = "G-0DEP95KV30"
const STORAGE_KEY = "aether-consent"
const CONSENT_EVENT = "aether-consent-change"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed.analytics === true
  } catch {
    return false
  }
}

function loadGoogleTag() {
  if (typeof window === "undefined" || window.gtag) return

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_MEASUREMENT_ID)
}

/** Sends a GA4 event, but only if the visitor has given analytics consent. */
export function sendGAEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return
  if (!window.gtag) {
    // Consent is present but the tag hasn't finished initializing yet (e.g. a page
    // effect fired before GoogleAnalytics' effect ran). Load it now so the event isn't dropped.
    loadGoogleTag()
  }
  window.gtag?.("event", eventName, params)
}

// Evaluate consent as early as possible on the client (module load, not just in an effect)
// so window.gtag is ready before other components' effects try to send events.
if (typeof window !== "undefined" && hasAnalyticsConsent()) {
  loadGoogleTag()
}

/** Loads the Google tag only when analytics consent is present, and reacts live to consent changes. */
export function GoogleAnalytics() {
  useEffect(() => {
    const evaluateConsent = () => {
      if (hasAnalyticsConsent()) {
        loadGoogleTag()
      }
    }

    evaluateConsent()

    window.addEventListener(CONSENT_EVENT, evaluateConsent)
    window.addEventListener("storage", evaluateConsent)

    return () => {
      window.removeEventListener(CONSENT_EVENT, evaluateConsent)
      window.removeEventListener("storage", evaluateConsent)
    }
  }, [])

  return null
}

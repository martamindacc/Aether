"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "aether-consent"

export type ConsentPreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function readStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    }
  } catch {
    return null
  }
}

function saveConsent(preferences: ConsentPreferences) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [draft, setDraft] = useState<ConsentPreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    const stored = readStoredConsent()
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const preferences: ConsentPreferences = { necessary: true, analytics: true, marketing: true }
    saveConsent(preferences)
    setVisible(false)
  }

  const handleRejectOptional = () => {
    saveConsent(DEFAULT_PREFERENCES)
    setVisible(false)
  }

  const handleOpenManage = () => {
    setDraft(readStoredConsent() ?? DEFAULT_PREFERENCES)
    setShowManage(true)
  }

  const handleSavePreferences = () => {
    saveConsent(draft)
    setShowManage(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Privacy consent"
      className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-zinc-300/80 bg-[#f7f4f1] px-4 py-4 sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#1c1c1c]">
          We use essential cookies to run this site. With your consent, we may also use analytics and marketing
          cookies to understand site usage and improve our services.
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="/privacy#cookies"
            className="whitespace-nowrap font-[Roboto,Arial,sans-serif] text-sm font-normal leading-[1.5] text-[#1c1c1c] underline underline-offset-4 transition-colors hover:text-zinc-600"
          >
            Cookie Policy
          </a>
          <button
            type="button"
            onClick={handleOpenManage}
            className="whitespace-nowrap font-[Roboto,Arial,sans-serif] text-sm font-normal leading-[1.5] text-[#1c1c1c] underline underline-offset-4 transition-colors hover:text-zinc-600"
          >
            Cookie Settings
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="whitespace-nowrap border border-zinc-900 bg-transparent px-5 py-2.5 font-[Roboto,Arial,sans-serif] text-sm font-medium text-[#1c1c1c] transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Accept all
          </button>
        </div>
      </div>

      {showManage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Manage privacy preferences"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-zinc-300/80 bg-white p-6 sm:p-8">
            <h2 className="font-[NeueHaasDisplayRoman,Arial,sans-serif] text-xl font-medium text-zinc-900">
              Manage preferences
            </h2>
            <p className="mt-2 font-[Roboto,Arial,sans-serif] text-sm leading-[1.5] text-[#383838]">
              Choose which optional cookies we may use. Necessary cookies are always on so the site can function.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-[Roboto,Arial,sans-serif] text-sm font-medium text-zinc-900">Necessary</p>
                  <p className="mt-1 font-[Roboto,Arial,sans-serif] text-sm leading-[1.4] text-zinc-600">
                    Required for core site functionality. Always enabled.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4 shrink-0" aria-label="Necessary cookies, always enabled" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-[Roboto,Arial,sans-serif] text-sm font-medium text-zinc-900">Analytics</p>
                  <p className="mt-1 font-[Roboto,Arial,sans-serif] text-sm leading-[1.4] text-zinc-600">
                    Helps us understand how visitors use the site.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) => setDraft((prev) => ({ ...prev, analytics: event.target.checked }))}
                  className="mt-1 h-4 w-4 shrink-0"
                  aria-label="Analytics cookies"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-[Roboto,Arial,sans-serif] text-sm font-medium text-zinc-900">Marketing</p>
                  <p className="mt-1 font-[Roboto,Arial,sans-serif] text-sm leading-[1.4] text-zinc-600">
                    Used in the future for advertising personalization.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) => setDraft((prev) => ({ ...prev, marketing: event.target.checked }))}
                  className="mt-1 h-4 w-4 shrink-0"
                  aria-label="Marketing cookies"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="whitespace-nowrap border border-zinc-900/20 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="whitespace-nowrap bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

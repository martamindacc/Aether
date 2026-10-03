"use client"

import { useState, useEffect, useRef } from "react"
import { useDialog } from "@/lib/use-dialog"
import { track } from "@vercel/analytics"
import { sendGAEvent } from "@/components/google-analytics"
import { buildCalendlyBookingUrl } from "@/lib/booking-url"
import { PRODUCTS } from "@/lib/products"
import type { LanguageCode } from "@/lib/service-content"

export function BookingModal({
  isOpen,
  onClose,
  language = "en",
}: {
  isOpen: boolean
  onClose: () => void
  language?: LanguageCode
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [step, setStep] = useState<"select" | "schedule">("select")
  const hasTrackedOpenRef = useRef(false)

  useEffect(() => {
    if (isOpen && !hasTrackedOpenRef.current) {
      hasTrackedOpenRef.current = true
      const params = { page: window.location.pathname }
      track("booking_modal_opened", params)
      sendGAEvent("booking_modal_opened", params)
    } else if (!isOpen) {
      hasTrackedOpenRef.current = false
    }
  }, [isOpen])

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedId)
  const labels = language === "no"
    ? {
        chooseSession: "Velg din økt",
        chooseTime: "Velg et tidspunkt",
        scheduleTitle: "Bestill din økt",
        paymentNotice: "Betaling forfaller etter sesjonen.",
        openedNotice: "Calendly-bookingsiden din har åpnet i en ny fane.",
        openCalendly: "Åpne Calendly",
        back: "Tilbake",
      }
    : {
        chooseSession: "Choose your session",
        chooseTime: "Choose a time",
        scheduleTitle: "Schedule your session",
        paymentNotice: "Payment is due after the session.",
        openedNotice: "Your Calendly booking page has opened in a new tab.",
        openCalendly: "Open Calendly",
        back: "Back",
      }

  const handleSelect = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) return
    const params = { service: product.name, page: window.location.pathname }
    track("booking_service_selected", params)
    sendGAEvent("booking_service_selected", params)
    setSelectedId(productId)
    setStep("schedule")
    window.open(buildCalendlyBookingUrl(product.calendlyUrl), "_blank", "noopener,noreferrer")
    track("booking_calendar_opened", params)
    sendGAEvent("booking_calendar_opened", params)
  }

  const handleClose = () => {
    onClose()
    setStep("select")
    setSelectedId(null)
  }

  const panelRef = useRef<HTMLDivElement>(null)
  useDialog(isOpen, handleClose, panelRef)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-6 py-6">
        <div
          className="fixed inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.scheduleTitle}
          tabIndex={-1}
          className="relative my-auto flex max-h-[90vh] w-full max-w-md flex-col gap-6 overflow-y-auto rounded-3xl bg-[#fafafb] p-6 shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-300 ease-out sm:p-10"
        >
          <button
            onClick={handleClose}
            aria-label="Close booking"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-zinc-900/20 bg-white transition-colors hover:bg-zinc-100 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {step === "select" && (
            <>
              <p className="pr-12 text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">{labels.chooseSession}</p>
              <div className="flex flex-col gap-3">
                {PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.id)}
                    className="flex items-center justify-between gap-3 border border-zinc-900/15 bg-white px-5 py-4 text-left transition-colors hover:bg-zinc-100"
                  >
                    <span className="min-w-0 font-[Roboto,Arial,sans-serif] text-base font-medium text-zinc-900 sm:text-lg">
                      {product.name}
                    </span>
                    <span className="shrink-0 whitespace-nowrap text-right text-sm text-zinc-500">
                      {product.duration}
                      {product.priceInCents > 0 && ` · $${(product.priceInCents / 100).toFixed(0)}`}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "schedule" && selectedProduct && (
            <>
              <div className="flex items-center justify-between gap-3 pr-12">
                <p className="text-xs uppercase tracking-wide text-zinc-500 sm:text-sm">{labels.chooseTime}</p>
                <button
                  onClick={() => setStep("select")}
                  className="shrink-0 text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline"
                >
                  {labels.back}
                </button>
              </div>
              <p className="text-sm text-zinc-500">{labels.paymentNotice}</p>
              <p className="text-sm text-zinc-500">{labels.openedNotice}</p>
              <a
                href={buildCalendlyBookingUrl(selectedProduct.calendlyUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-900/20 bg-white px-5 py-3 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                {labels.openCalendly}
              </a>
            </>
          )}
        </div>
      </div>
    </>
  )
}

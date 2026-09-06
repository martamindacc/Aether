"use client"

import { useState } from "react"
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

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedId)
  const labels = language === "no"
    ? { chooseSession: "Velg din økt", chooseTime: "Velg et tidspunkt", scheduleTitle: "Bestill din økt" }
    : { chooseSession: "Choose your session", chooseTime: "Choose a time", scheduleTitle: "Schedule your session" }

  const handleSelect = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) return
    setSelectedId(productId)
    setStep("schedule")
  }

  const handleClose = () => {
    onClose()
    setStep("select")
    setSelectedId(null)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-6 py-6">
        <div
          className="fixed inset-0 animate-in fade-in bg-zinc-900/20 duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
        <div className="relative my-auto flex max-h-[90vh] w-full max-w-md flex-col gap-6 overflow-y-auto rounded-3xl bg-[#fafafb] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 ease-out sm:p-10">
          <button
            onClick={handleClose}
            aria-label="Close booking"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-zinc-900/20 bg-white transition-colors hover:bg-zinc-100"
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
              <p className="text-sm uppercase tracking-wide text-zinc-500">{labels.chooseSession}</p>
              <div className="flex flex-col gap-3">
                {PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.id)}
                    className="flex items-center justify-between border border-zinc-900/15 bg-white px-5 py-4 text-left transition-colors hover:bg-zinc-100"
                  >
                    <span className="font-[Roboto,Arial,sans-serif] text-lg font-medium text-zinc-900">
                      {product.name}
                    </span>
                    <span className="text-sm text-zinc-500">{product.duration}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "schedule" && selectedProduct && (
            <>
              <p className="text-sm uppercase tracking-wide text-zinc-500">{labels.chooseTime}</p>
              <div className="overflow-hidden rounded-2xl border border-zinc-900/10">
                <iframe
                  key={selectedProduct.calendlyUrl}
                  src={`${selectedProduct.calendlyUrl}?hide_gdpr_banner=1&primary_color=e1c4b1`}
                  title={labels.scheduleTitle}
                  className="h-[70vh] min-h-[500px] w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

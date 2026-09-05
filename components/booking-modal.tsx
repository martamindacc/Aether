"use client"

import { useState } from "react"
import Script from "next/script"
import { Checkout } from "@/components/checkout"
import { PRODUCTS } from "@/lib/products"

export function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [step, setStep] = useState<"select" | "payment" | "schedule">("select")

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedId)

  const openCalendly = (url: string) => {
    const calendly = (window as any).Calendly
    if (calendly) {
      calendly.initPopupWidget({ url })
    }
    handleClose()
  }

  const handleSelect = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) return
    setSelectedId(productId)
    if (product.priceInCents === 0) {
      openCalendly(product.calendlyUrl)
      return
    }
    setStep("payment")
  }

  const handlePaymentComplete = () => {
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
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

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
              <p className="text-sm uppercase tracking-wide text-zinc-500">Choose your session</p>
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
                    <span className="text-sm text-zinc-500">
                      {product.duration} ·{" "}
                      {product.priceInCents === 0
                        ? "Free"
                        : `$${(product.priceInCents / 100).toFixed(0)}`}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "payment" && selectedProduct && (
            <>
              <p className="text-sm uppercase tracking-wide text-zinc-500">
                Pay for your {selectedProduct.name.toLowerCase()}
              </p>
              <Checkout productId={selectedProduct.id} onComplete={handlePaymentComplete} />
            </>
          )}

          {step === "schedule" && selectedProduct && (
            <>
              <p className="text-sm uppercase tracking-wide text-zinc-500">Payment received</p>
              <p className="font-[Roboto,Arial,sans-serif] text-base leading-[1.5] text-[#383838]">
                Thank you. Now choose a time for your {selectedProduct.name.toLowerCase()}.
              </p>
              <button
                onClick={() => openCalendly(selectedProduct.calendlyUrl)}
                className="border border-zinc-900/20 bg-white px-8 py-4 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Schedule your session
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

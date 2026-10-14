"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"

export function InstrumentsNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <FloatingNav
      language="en"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      brandLabel="Aether Instruments"
      showBooking={false}
      // Instruments are English-only, so the switcher has nothing to offer here.
      showLanguage={false}
      tone="dark"
    />
  )
}

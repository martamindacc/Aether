"use client"

import { useState } from "react"
import { FloatingNav } from "@/components/floating-nav"
import type { LanguageLink } from "@/lib/locale-routes"

// Instruments exist in English only, so Norwegian falls back to the Norwegian home page.
const languageLinks: LanguageLink[] = [
  { code: "en", href: "/instruments" },
  { code: "no", href: "/no" },
]

export function InstrumentsNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <FloatingNav
      language="en"
      languageLinks={languageLinks}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isLangOpen={isLangOpen}
      onLangOpenChange={setIsLangOpen}
      brandLabel="Aether Instruments"
      showBooking={false}
    />
  )
}

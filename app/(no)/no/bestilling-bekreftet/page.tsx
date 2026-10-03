import type { Metadata } from "next"
import { localizedPaths } from "@/lib/locale-routes"
import BookingConfirmedPage from "@/components/pages/booking-confirmed-page"

export const metadata: Metadata = {
  title: "Bestilling bekreftet | Aether Practice",
  alternates: {
    canonical: `https://aetherpractice.com${localizedPaths.bookingConfirmed.no}`,
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page() {
  return <BookingConfirmedPage language="no" />
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Booking Confirmed",
  alternates: {
    canonical: "https://aetherpractice.com/booking-confirmed",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function BookingConfirmedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

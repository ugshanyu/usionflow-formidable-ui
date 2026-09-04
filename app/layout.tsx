import type { Metadata } from "next"
import { Outfit, Source_Serif_4 } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-yc-sans",
  weight: ["200", "300", "400", "500"],
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-yc-serif",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: "UsionFlow Formidable UI — Theme Plate",
  description: "A bilingual Tailwind design-system plate for the UsionFlow back office.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${sourceSerif.variable}`}>{children}</body>
    </html>
  )
}

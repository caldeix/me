import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Caldeiro — Full Stack Developer",
  description:
    "Luis Miguel Caldeiro · Full Stack Developer & AI Engineer · PHP · REST APIs · Vue.js · Python · LLMs",
  keywords: [
    "Full Stack Developer",
    "PHP Developer",
    "REST APIs",
    "Vue.js",
    "Python",
    "LLM Integration",
    "AI Engineer",
    "Luis Miguel Caldeiro",
    "ATLS GLOBAL",
  ],
  openGraph: {
    title: "Luis Miguel Caldeiro — Full Stack Developer",
    description: "5+ years · PHP · REST APIs · Vue.js · Python · LLMs",
    url: "https://caldeix.github.io/me",
    siteName: "Caldeiro · Portfolio",
    images: [
      {
        url: "https://media.licdn.com/dms/image/v2/C4D03AQGJ9B5PJj0K1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1631016421362",
        width: 800,
        height: 800,
        alt: "Luis Miguel Caldeiro",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Luis Miguel Caldeiro — Full Stack Developer",
    description: "5+ years · PHP · REST APIs · Vue.js · Python · LLMs",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

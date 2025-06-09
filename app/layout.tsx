import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caldeiro - Portfolio",
  description: "Luis Miguel Caldeiro Fernández, programador fullstack",

  keywords: [
    "desarrollador full stack",
    "programador PHP",
    "APIs REST",
    "Vue.js",
    "Laravel",
    "MySQL",
    "JavaScript",
    "desarrollador web",
    "portfolio programador",
    "Luis Miguel Caldeiro",
    "ATLS GLOBAL",
    "automatización IA",
    "microservicios"
  ],
  // Open Graph para redes sociales
  openGraph: {
    title: "Luis Miguel Caldeiro - Full Stack Developer",
    description: "CV de desarrollador full stack con +5 años de experiencia",
    url: "https://tu-dominio.com", // Cambia por tu URL real
    siteName: "Portfolio Luis Miguel Caldeiro",
    images: [
      {
        url: "https://media.licdn.com/dms/image/v2/C4D03AQGJ9B5PJj0K1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1631016421362?e=1755129600&v=beta&t=Ws_cPjqmmizJ41XdgQP2A9mSY8pJr9eD5-JF_fFhvW4", // Imagen para compartir en redes
        width: 1200,
        height: 630,
        alt: "Portfolio de Luis Miguel Caldeiro"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Luis Miguel Caldeiro - Full Stack Developer",
    description: "Portfolio profesional de desarrollador full stack",
    images: ["https://media.licdn.com/dms/image/v2/C4D03AQGJ9B5PJj0K1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1631016421362?e=1755129600&v=beta&t=Ws_cPjqmmizJ41XdgQP2A9mSY8pJr9eD5-JF_fFhvW4"]
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

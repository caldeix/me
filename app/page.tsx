"use client"

import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ContactSection from "@/components/contact-section"
import PrivacySector from "@/components/privacy-sector"
import literals from "@/data/literals.json"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [showCookiePolicy, setShowCookiePolicy] = useState(false)
  const [showCookiePrivacity, setShowCookiePrivacity] = useState(false)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const isMobile = useMobile()

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())

    if (!localStorage.getItem("cookiesAccepted")) {
      setShowCookiePolicy(true)
    }
  }, [])

  const toggleCookiePolicy = () => {
    setShowCookiePolicy(true)
  }

  const toggleCookiePrivacity = () => {
    setShowCookiePrivacity(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <HeroSection data={literals.hero} personal={literals.personal} links={literals.links} />
      <AboutSection data={literals.about} />
      <SkillsSection data={literals.skills} isMobile={isMobile} />
      <ExperienceSection data={literals.experience} />
      <ContactSection data={literals.contact} links={literals.links} />

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
            <span>
              © {currentYear} {literals.footer.copyright}
            </span>
            <span className="hidden md:block">•</span>
            <button onClick={toggleCookiePolicy} className="hover:text-blue-400 transition-colors">
              {literals.footer.cookiePolicy}
            </button>
            <span>•</span>
            <button onClick={toggleCookiePrivacity} className="hover:text-blue-400 transition-colors">
              {literals.footer.privacyPolicy}
            </button>
          </div>
        </div>
      </footer>

      <PrivacySector
        show={showCookiePolicy}
        showPrivacity={showCookiePrivacity}
        setShow={setShowCookiePolicy}
        setShowPrivacity={setShowCookiePrivacity}
        data={literals.privacy}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #334155",
          },
          success: {
            style: {
              background: "#0f766e",
              color: "#f0fdfa",
            },
          },
        }}
      />
    </main>
  )
}

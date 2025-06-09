"use client"

import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  data: any
  personal: any
  links: any
}

export default function HeroSection({ data, personal, links }: HeroSectionProps) {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f10d_1px,transparent_1px)] dark:bg-[radial-gradient(#6366f120_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 animate-float">
            <img
              src={personal.profileImage || "/placeholder.svg"}
              alt={personal.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-2xl border-4 border-white dark:border-slate-700 transition-colors duration-300"
            />
          </div>

          {/* Name and Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4 animate-slide-up transition-colors duration-300">
            {personal.firstName}
            <span className="block text-3xl md:text-5xl text-blue-600 dark:text-blue-400 mt-2 transition-colors duration-300">
              {personal.lastName}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6 animate-slide-up transition-colors duration-300">
            {personal.role}
          </p>

          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up transition-colors duration-300">
            {data.description.split(data.company).map((part: string, index: number) => (
              <span key={index}>
                {part}
                {index === 0 && (
                  <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">
                    {data.company}
                  </span>
                )}
              </span>
            ))}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToAbout}
            >
              {data.cta.primary}
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a
                href={links.cv}
                target="_blank"
                rel="noreferrer"
              >
                <Download className="mr-2 h-5 w-5" />
                {data.cta.secondary}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-slate-400 dark:text-slate-500 transition-colors duration-300" />
      </div>
    </section>
  )
}

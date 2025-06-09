"use client"

import { Code, Lightbulb, Target, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AboutSectionProps {
  data: any
}

export default function AboutSection({ data }: AboutSectionProps) {
  const icons = [Code, Lightbulb, Target, Users]

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            {data.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 transition-colors duration-300">
              {data.sectionTitle}
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 transition-colors duration-300">
              {data.description.map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph.includes("ATLS GLOBAL SL") ? (
                    <>
                      {paragraph.split("ATLS GLOBAL SL")[0]}
                      <strong className="text-blue-600 dark:text-blue-400 transition-colors duration-300">
                        ATLS GLOBAL SL
                      </strong>
                      {paragraph.split("ATLS GLOBAL SL")[1]}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.highlights.map((highlight: any, index: number) => {
              const IconComponent = icons[index]
              return (
                <Card
                  key={index}
                  className="skill-card border-0 shadow-lg dark:bg-slate-800 dark:shadow-slate-900/20 transition-colors duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 transition-colors duration-300" />
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 text-sm transition-colors duration-300">
                      {highlight.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 transition-colors duration-300">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

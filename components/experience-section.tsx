"use client"

import { ExternalLink, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceSectionProps {
  data: any
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {data.list.map((exp: any, index: number) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl dark:bg-slate-800 dark:shadow-slate-900/20 dark:hover:shadow-slate-900/40 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
                      {exp.position}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2 transition-colors duration-300">
                      <span>{exp.company}</span>
                      <div className="flex gap-2">
                        {exp.links.linkedin && (
                          <a
                            href={exp.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {exp.links.website && (
                          <a
                            href={exp.links.website}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 transition-colors duration-300"
                      >
                        {exp.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed transition-colors duration-300">
                  {exp.description}
                </p>

                {exp.achievements && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
                      Logros principales:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 transition-colors duration-300">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li key={i} className="text-sm">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
                    Tecnologías utilizadas:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech: string, i: number) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

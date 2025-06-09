"use client"

import { Github, Linkedin, Mail, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "react-hot-toast"

interface ContactSectionProps {
  data: any
  links: any
}

export default function ContactSection({ data, links }: ContactSectionProps) {
  const iconMap = {
    Email: Mail,
    LinkedIn: Linkedin,
    GitHub: Github,
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("¡Copiado al portapapeles!")
    } catch (err) {
      toast.error("Error al copiar")
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
          {data.title}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto transition-colors duration-300">
          {data.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {data.methods.map((method: any, index: number) => {
            const IconComponent = iconMap[method.label as keyof typeof iconMap]
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl dark:bg-slate-800 dark:shadow-slate-900/20 dark:hover:shadow-slate-900/40 transition-all duration-300 skill-card"
              >
                <CardContent className="p-6">
                  <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-4 transition-colors duration-300" />
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 transition-colors duration-300">
                    {method.label}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 transition-colors duration-300">
                    {method.value}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                    >
                      <a href={method.href} target="_blank" rel="noreferrer">
                        Contactar
                      </a>
                    </Button>
                    {method.copyable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(method.value)}
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-300"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="mailto:caldeiro@pm.me">
              <Mail className="mr-2 h-5 w-5" />
              {data.cta.primary}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href={links.cv} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-5 w-5" />
              {data.cta.secondary}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

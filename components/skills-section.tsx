"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Code, Database, Palette, Server, Bot } from "lucide-react"

interface SkillsSectionProps {
  data: any
  isMobile: boolean
}

export default function SkillsSection({ data, isMobile }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const categoryIcons = {
    all: Star,
    frontend: Palette,
    backend: Server,
    database: Database,
    tools: Code,
    ai: Bot,
  }

  const filteredSkills =
    selectedCategory === "all" ? data.list : data.list.filter((skill: any) => skill.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Experto":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
      case "Avanzado":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700"
      case "Básico":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-600"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/30 dark:text-gray-300 dark:border-gray-600"
    }
  }

  const openModal = (skill: any) => {
    setSelectedSkill(skill)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSkill(null)
  }

  return (
    <>
      <section className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors duration-300" id="skills">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors duration-300">
              {data.title}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
              {data.subtitle}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {data.categories.map((category: any) => {
              const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons]
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full transition-colors duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                      : "border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>

          {/* Skills Grid */}
          <div className={`grid ${isMobile ? "grid-cols-2" : "md:grid-cols-3 lg:grid-cols-4"} gap-4`}>
            {filteredSkills.map((skill: any, index: number) => (
              <Card
                key={index}
                className="skill-card border-0 shadow-lg hover:shadow-xl dark:bg-slate-700 dark:shadow-slate-900/20 dark:hover:shadow-slate-900/40 transition-all duration-300 cursor-pointer"
                onClick={() => openModal(skill)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center transition-colors duration-300">
                      <span className="mr-2 text-2xl">{skill.icon}</span>
                      {skill.name}
                      {skill.isTop && (
                        <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 ml-2 fill-current transition-colors duration-300" />
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      {skill.years}
                    </p>
                    <Badge className={`${getLevelColor(skill.level)} border text-xs transition-colors duration-300`}>
                      {skill.level}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedSkill && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 shadow-2xl transition-colors duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center transition-colors duration-300">
                <span className="mr-2 text-2xl">{selectedSkill.icon}</span>
                {selectedSkill.name}
                {selectedSkill.isTop && (
                  <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 ml-2 fill-current transition-colors duration-300" />
                )}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                {selectedSkill.years}
              </span>
              <Badge className={`${getLevelColor(selectedSkill.level)} border transition-colors duration-300`}>
                {selectedSkill.level}
              </Badge>
            </div>
            <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">
              {selectedSkill.description}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

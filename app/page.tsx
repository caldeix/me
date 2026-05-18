"use client"

import { useState } from "react"
import Image from "next/image"

/* ── HELPERS ──────────────────────────────────────────────────── */
function highlight(text: string, keywords: string[]): React.ReactNode {
  if (!keywords.length) return text
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi")
  const parts = text.split(pattern)
  const kwSet = new Set(keywords.map((k) => k.toLowerCase()))
  return (
    <>
      {parts.map((part, i) =>
        kwSet.has(part.toLowerCase()) ? (
          <span key={i} className="kw">{part}</span>
        ) : (
          part
        )
      )}
    </>
  )
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="star-rating" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((slot) => {
        const type = value >= slot ? "full" : value >= slot - 0.5 ? "half" : "empty"
        return (
          <i
            key={slot}
            className={
              type === "full"
                ? "fa-solid fa-star"
                : type === "half"
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
            aria-hidden="true"
          />
        )
      })}
    </span>
  )
}

function TechIcon({
  slug,
  color,
  name,
  fallbackFA,
  size = 26,
}: {
  slug?: string
  color: string
  name: string
  fallbackFA?: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)

  if (!slug || failed) {
    return fallbackFA ? (
      <i
        className={`${fallbackFA} tech-fa-icon`}
        style={{ color: `#${color}`, fontSize: `${size * 0.88}px` }}
        aria-hidden="true"
      />
    ) : (
      <span className="tech-initial" style={{ color: `#${color}`, fontSize: `${size * 0.55}px` }}>
        {name[0].toUpperCase()}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt={name}
      width={size}
      height={size}
      className="tech-icon"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/* ── DATA ──────────────────────────────────────────────────────── */
const LINKS = {
  cv: "https://drive.google.com/file/d/1n9BE79HED3G1uh3pOSH1gco7Fs_jv-wJ/view?usp=sharing",
  github: "https://github.com/caldeix",
  linkedin: "https://www.linkedin.com/in/caldeiro-luism/",
  email: "mailto:caldeiro@pm.me",
  emailRaw: "caldeiro@pm.me",
}

interface Tech {
  name: string
  slug?: string
  fallbackFA?: string
  stars: number
  color: string
  dual?: { slug?: string; fallbackFA?: string; color: string; name: string }
}

/* sorted descending by stars */
const STACK: Tech[] = [
  { name: "PHP",             slug: "php",               stars: 5,   color: "777BB4" },
  { name: "MySQL",           slug: "mysql",             stars: 5,   color: "4479A1" },
  { name: "Git",             slug: "git",               stars: 5,   color: "F05032" },
  { name: "Linux",           slug: "linux",             stars: 4.5, color: "FCC624" },
  { name: "Apache",          slug: "apache",            stars: 4.5, color: "D22128" },
  { name: "REST API",        slug: "openapiinitiative", stars: 4.5, color: "6BA539" },
  { name: "Python",          slug: "python",            stars: 4,   color: "3776AB" },
  {
    name: "Postman / Apidog",
    slug: "postman",
    stars: 4,
    color: "FF6C37",
    dual: { slug: "apidog", fallbackFA: "fa-solid fa-flask", color: "00B4D8", name: "Apidog" },
  },
  { name: "VS Code",         slug: "visualstudiocode",  stars: 4,   color: "007ACC" },
  { name: "Claude AI",       slug: "anthropic",         stars: 4,   color: "D4AF37" },
  { name: "Laravel",         slug: "laravel",           stars: 3.5, color: "FF2D20" },
  { name: "Docker",          slug: "docker",            stars: 3.5, color: "2496ED" },
  { name: "Windsurf",        slug: "windsurf",          stars: 3.5, color: "00B4D8" },
  { name: "AI Coding",       slug: "githubcopilot",     stars: 3.5, color: "8957E5" },
  { name: "Obsidian",        slug: "obsidian",          stars: 3,   color: "7C3AED" },
  { name: "Vue.js",          slug: "vuedotjs",          stars: 2.5, color: "4FC08D" },
  { name: "Java",            slug: "openjdk",           stars: 2,   color: "ED8B00" },
  { name: "JavaScript",      slug: "javascript",        stars: 2,   color: "F7DF1E" },
  { name: "N8N",             slug: "n8n",               stars: 2,   color: "EA4B71" },
  { name: "Jupyter",         slug: "jupyter",           stars: 2,   color: "F37626" },
  { name: "TypeScript",      slug: "typescript",        stars: 1,   color: "3178C6" },
  { name: "React",           slug: "react",             stars: 1,   color: "61DAFB" },
  { name: "Next.js",         slug: "nextdotjs",         stars: 1,   color: "FFFFFF" },
  { name: "OpenClaw",        fallbackFA: "fa-solid fa-paw", stars: 0.5, color: "888888" },
]

interface Job {
  company: string
  role: string
  period: string
  url: string
  tech: string[]
  description: string
  keywords: string[]
}

const EXPERIENCE: Job[] = [
  {
    company: "ATLS GLOBAL SL",
    role: "Full Stack Developer",
    period: "2021 — Presente",
    url: "https://www.atls-global.com/",
    tech: ["PHP", "Java", "Vue.js", "MySQL", "Python", "REST APIs"],
    description:
      "Desempeñé un rol clave en la actualización tecnológica del sistema principal de la empresa, implementando mejoras significativas que resultaron en una notable optimización de los tiempos de procesamiento. Mis principales responsabilidades incluyen la creación y evolución de REST APIs en PHP y Java orientadas a microservicios con un framework propio, así como el desarrollo de interfaces frontend con Vue.js, consolidándome como desarrollador full stack. También implementé automatización de procesos mediante colas y participé activamente en la investigación e implementación de herramientas de IA generativa.",
    keywords: [
      "actualización tecnológica",
      "REST APIs",
      "PHP",
      "Java",
      "microservicios",
      "framework propio",
      "Vue.js",
      "full stack",
      "automatización de procesos",
      "IA generativa",
    ],
  },
  {
    company: "CLICKEDU",
    role: "Backend Developer",
    period: "2020 — 2021",
    url: "https://www.clickedu.net",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript"],
    description:
      "En CLICKEDU me encargué de la resolución de incidencias en la aplicación educativa principal, gestionando problemas en el backend y el frontend. Realicé mejoras significativas en ambos entornos optimizando el rendimiento del sistema y garantizando su estabilidad. Utilicé Laravel para implementar soluciones eficientes en el backend y mejorar la estructura del frontend, contribuyendo a una mejor experiencia de usuario y mayor eficiencia operativa.",
    keywords: [
      "incidencias",
      "backend",
      "frontend",
      "rendimiento",
      "Laravel",
      "experiencia de usuario",
    ],
  },
  {
    company: "FOXTENN",
    role: "Systems Technician",
    period: "2019 — 2020",
    url: "http://www.foxtenn.com",
    tech: ["Hardware Especializado", "Sistemas en Tiempo Real"],
    description:
      "En FOXTENN fui responsable de la instalación y gestión de hardware y software especializado para la recolección de datos en grandes eventos de tenis. Trabajé con tecnología avanzada de línea electrónica y análisis de rendimiento, utilizando cámaras de alta velocidad y escáneres láser para capturar con precisión el bote de la pelota y los movimientos de los jugadores en tiempo real, cumpliendo los más altos estándares de torneos ATP, WTA e ITF.",
    keywords: [
      "hardware y software especializado",
      "cámaras de alta velocidad",
      "escáneres láser",
      "tiempo real",
      "ATP, WTA e ITF",
    ],
  },
  {
    company: "GMEDIA SL",
    role: "Web Developer · Prácticas",
    period: "2018 — 2019",
    url: "https://www.gmedia.es",
    tech: ["WordPress", "PHP", "JavaScript", "HTML / CSS"],
    description:
      "En GMEDIA SL desempeñé un rol clave en la creación y personalización de páginas web para diversos clientes, ofreciendo soluciones a medida con WordPress y desarrollando temas personalizados según las necesidades específicas de cada proyecto. Me enfoqué en asegurar una excelente experiencia de usuario mediante el uso de tecnologías modernas, contribuyendo a la transformación digital de múltiples negocios.",
    keywords: [
      "WordPress",
      "temas personalizados",
      "experiencia de usuario",
      "transformación digital",
    ],
  },
]

/* ── PAGE ──────────────────────────────────────────────────────── */
export default function Page() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.emailRaw)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = LINKS.email
    }
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <Image
            src="/profile_pic.jpg"
            alt="Luis Miguel Caldeiro"
            width={148}
            height={148}
            className="avatar"
            priority
          />

          <div className="hero-content">
            <span className="overline">Full Stack Developer &amp; AI Engineer</span>

            <h1>
              Luis Miguel
              <br />
              <span className="gold">Caldeiro</span>
            </h1>

            <p className="tagline">
              5+ yrs · PHP · REST APIs · Vue.js · Python · LLMs
            </p>

            <div className="cta-group">
              <a href={LINKS.cv} target="_blank" rel="noreferrer" className="btn btn-primary">
                <i className="fa-regular fa-file-pdf" aria-hidden="true" />
                CV PDF
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <i className="fa-brands fa-github" aria-hidden="true" />
                GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <i className="fa-brands fa-linkedin" aria-hidden="true" />
                LinkedIn
              </a>
              <button
                onClick={copyEmail}
                className="btn btn-ghost"
                aria-label="Copiar dirección de email"
              >
                <i
                  className={copied ? "fa-solid fa-check" : "fa-regular fa-envelope"}
                  aria-hidden="true"
                />
                {copied ? "Copiado" : "Email"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ── */}
      <section className="section" aria-label="Stack tecnológico">
        <h2 className="section-label">Stack</h2>
        <div className="tech-grid">
          {STACK.map((tech) => (
            <div key={tech.name} className="tech-item">
              {tech.dual ? (
                <div className="tech-dual">
                  <div className="tech-dual-main">
                    <TechIcon
                      slug={tech.slug}
                      color={tech.color}
                      name={tech.name}
                      fallbackFA={tech.fallbackFA}
                      size={22}
                    />
                  </div>
                  <div className="tech-dual-sub">
                    <TechIcon
                      slug={tech.dual.slug}
                      color={tech.dual.color}
                      name={tech.dual.name}
                      fallbackFA={tech.dual.fallbackFA}
                      size={18}
                    />
                  </div>
                </div>
              ) : (
                <TechIcon
                  slug={tech.slug}
                  color={tech.color}
                  name={tech.name}
                  fallbackFA={tech.fallbackFA}
                />
              )}
              <span className="tech-name">{tech.name}</span>
              <StarRating value={tech.stars} />
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section" aria-label="Experiencia profesional">
        <h2 className="section-label">Experiencia</h2>
        <div className="timeline">
          {EXPERIENCE.map((job) => (
            <article key={job.company} className="job">
              <div className="job-header">
                <div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="job-company"
                  >
                    {job.company}
                  </a>
                  <span className="job-role">{job.role}</span>
                </div>
                <time className="job-period">{job.period}</time>
              </div>

              <p className="job-desc">
                {highlight(job.description, job.keywords)}
              </p>

              <div className="tech-tags">
                {job.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <strong className="footer-name">Luis Miguel Caldeiro</strong>
          <nav className="footer-links" aria-label="Contacto">
            <a href={LINKS.email} className="footer-link">caldeiro@pm.me</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
          </nav>
          <span className="footer-copy">© {new Date().getFullYear()} · v1.3.0</span>
        </div>
      </footer>
    </main>
  )
}

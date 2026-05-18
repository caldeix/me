"use client"

import { useState, useEffect } from "react"

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
  customUrl,
  color,
  name,
  fallbackFA,
  size = 26,
}: {
  slug?: string
  customUrl?: string
  color: string
  name: string
  fallbackFA?: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)
  const src = customUrl ?? (slug ? `https://cdn.simpleicons.org/${slug}/${color}` : null)

  if (!src || failed) {
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
      src={src}
      alt={name}
      width={size}
      height={size}
      className="tech-icon"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/* ── GITHUB REPOS ─────────────────────────────────────────────── */
interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
}

const LANG_COLOR: Record<string, string> = {
  PHP: "777BB4", Python: "3776AB", JavaScript: "F7DF1E",
  TypeScript: "3178C6", Java: "ED8B00", HTML: "E34F26",
  CSS: "1572B6", Shell: "89E051", Vue: "4FC08D",
  Ruby: "CC342D", Go: "00ADD8", Rust: "CE4A00",
  "Jupyter Notebook": "F37626", Dockerfile: "2496ED",
}

function timeAgo(iso: string): string {
  const months = Math.floor((Date.now() - new Date(iso).getTime()) / 2_628_000_000)
  if (months < 1) return "este mes"
  if (months < 12) return `hace ${months}m`
  return `hace ${Math.floor(months / 12)}a`
}

/* ── DATA ──────────────────────────────────────────────────────── */
const LINKS = {
  cv: "https://drive.google.com/file/d/1n9BE79HED3G1uh3pOSH1gco7Fs_jv-wJ/view?usp=sharing",
  github: "https://github.com/caldeix",
  linkedin: "https://www.linkedin.com/in/caldeiro-luism/",
  email: "mailto:caldeiro@pm.me",
  emailRaw: "caldeiro@pm.me",
}

/* basePath /me is NOT prepended by next/image in static export — use explicit path */
const PROFILE_SRC = "/me/profile_pic.jpg"

interface Tech {
  name: string
  slug?: string
  customUrl?: string
  fallbackFA?: string
  stars: number
  color: string
  dual?: { slug?: string; customUrl?: string; fallbackFA?: string; color: string; name: string }
}

const DEVICON = (name: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`

/* sorted descending by stars */
const STACK: Tech[] = [
  { name: "PHP",            slug: "php",               stars: 5,   color: "777BB4" },
  { name: "MySQL",          slug: "mysql",             stars: 5,   color: "4479A1" },
  { name: "Git",            slug: "git",               stars: 5,   color: "F05032" },
  { name: "Linux",          slug: "linux",             stars: 4.5, color: "FCC624" },
  { name: "Apache",         slug: "apache",            stars: 4.5, color: "D22128" },
  { name: "REST API",       slug: "openapiinitiative", stars: 4.5, color: "6BA539" },
  { name: "Python",         slug: "python",            stars: 4,   color: "3776AB" },
  { name: "Postman / Apidog", slug: "postman", stars: 4, color: "FF6C37" },
  { name: "VS Code",        customUrl: DEVICON("vscode"),  stars: 4,   color: "007ACC" },
  { name: "Claude AI",      slug: "anthropic",             stars: 4,   color: "CC9B7A" },
  { name: "Laravel",        slug: "laravel",               stars: 3.5, color: "FF2D20" },
  { name: "Docker",         slug: "docker",                stars: 3.5, color: "2496ED" },
  { name: "Windsurf",       slug: "windsurf",              stars: 3.5, color: "00B4D8", fallbackFA: "fa-solid fa-wind" },
  { name: "AI Coding",      slug: "githubcopilot",         stars: 3.5, color: "8957E5", fallbackFA: "fa-solid fa-robot" },
  { name: "Obsidian",       slug: "obsidian",              stars: 3,   color: "7C3AED" },
  { name: "Vue.js",         slug: "vuedotjs",              stars: 2.5, color: "4FC08D" },
  { name: "Java",           customUrl: DEVICON("java"),    stars: 2,   color: "ED8B00" },
  { name: "JavaScript",     slug: "javascript",            stars: 2,   color: "F7DF1E" },
  { name: "N8N",            slug: "n8n",                   stars: 2,   color: "EA4B71", fallbackFA: "fa-solid fa-diagram-project" },
  { name: "Jupyter",        slug: "jupyter",               stars: 2,   color: "F37626" },
  { name: "TypeScript",     slug: "typescript",            stars: 1,   color: "3178C6" },
  { name: "React",          slug: "react",                 stars: 1,   color: "61DAFB" },
  { name: "Next.js",        slug: "nextdotjs",             stars: 1,   color: "EEEEEE" },
  { name: "OpenClaw",       fallbackFA: "fa-solid fa-paw", stars: 0.5, color: "888888" },
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
      "Desempeño un rol clave en la modernización y evolución tecnológica del ecosistema SaaS principal de la compañía. Lidero el diseño e implementación de nuevos productos de alto impacto, incluyendo sistemas de post-revisión de traducciones basados en Inteligencia Artificial Generativa, y optimizo la arquitectura del backend y frontend para maximizar el rendimiento del sistema.",
    keywords: [
      "modernización",
      "evolución tecnológica",
      "ecosistema SaaS",
      "diseño e implementación",
      "post-revisión de traducciones",
      "Inteligencia Artificial Generativa",
      "backend",
      "frontend",
      "rendimiento",
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

/* ── EDUCATION ────────────────────────────────────────────────── */
interface EduItem {
  kind: "degree" | "course"
  title: string
  org: string
  year: string
  badge?: string
  location?: string
  current?: boolean
  certUrl?: string
  platformSlug?: string
  platformColor?: string
}

/* sorted newest → oldest */
const EDUCATION: EduItem[] = [
  {
    kind: "degree",
    badge: "BACHELOR",
    title: "Ingeniería Informática",
    org: "Universitat Digital Europea",
    location: "Andorra",
    year: "2024 — 2029",
    current: true,
    certUrl: "https://universidadeuropeadigital.com/",
  },
  {
    kind: "course",
    title: "Fundamentos profesionales de IA generativa",
    org: "Microsoft & LinkedIn Learning",
    year: "2025",
    certUrl:
      "https://www.linkedin.com/learning/certificates/93a41b31c8805e15ecde8898b6435fc61566ba93c543e7d5f301da53703cfcd3",
    platformSlug: "linkedin",
    platformColor: "0A66C2",
  },
  {
    kind: "course",
    title: "IA Generativa: ChatGPT, Midjourney y más!",
    org: "Udemy",
    year: "2024",
    certUrl:
      "https://media.licdn.com/dms/image/v2/D4D2DAQExP1aIcbsAzQ/profile-treasury-document-images_1280/B4DZd3v6oQGgAY-/1/1750060740695?e=1779926400&v=beta&t=RYwLPmRwaJP_YPja_yB-0MJPTAthqnEyXhPWSmmFeUY",
    platformSlug: "udemy",
    platformColor: "A435F0",
  },
  {
    kind: "course",
    title: "Docker for the Absolute Beginner — Hands On",
    org: "Udemy",
    year: "2022",
    certUrl: "https://www.udemy.com/certificate/UC-3155e7a2-8495-4b22-b76e-39d21420e699/",
    platformSlug: "udemy",
    platformColor: "A435F0",
  },
  {
    kind: "course",
    title: "Master en PHP, SQL, POO, MVC, Laravel, Symfony, WordPress+",
    org: "Udemy",
    year: "2021",
    certUrl: "https://www.udemy.com/certificate/UC-33df8af0-8056-4347-8221-310c29e8c56a/",
    platformSlug: "udemy",
    platformColor: "A435F0",
  },
  {
    kind: "degree",
    badge: "CFGS · DAM",
    title: "Desarrollo de Aplicaciones Multiplataforma",
    org: "Ins Joan d'Austria",
    year: "2019",
  },
  {
    kind: "course",
    title: "Flexbox desde 0",
    org: "Udemy",
    year: "2018",
    certUrl: "https://www.udemy.com/certificate/UC-FFV2XFER/",
    platformSlug: "udemy",
    platformColor: "A435F0",
  },
  {
    kind: "degree",
    badge: "CFGM · SMX",
    title: "Sistemas Microinformáticos y Redes",
    org: "Ins Joan d'Austria",
    year: "2017",
  },
  {
    kind: "degree",
    badge: "ESO",
    title: "",
    org: "Ins Sant Josep de Gràcia",
    year: "2015",
  },
]

/* ── PAGE ──────────────────────────────────────────────────────── */
export default function Page() {
  const [copied, setCopied] = useState(false)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [reposLoading, setReposLoading] = useState(true)

  useEffect(() => {
    fetch(
      "https://api.github.com/users/caldeix/repos?sort=updated&per_page=30&type=public"
    )
      .then((r) => r.json())
      .then((data: GitHubRepo[]) => {
        setRepos(
          data
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        )
        setReposLoading(false)
      })
      .catch(() => setReposLoading(false))
  }, [])

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROFILE_SRC}
            alt="Luis Miguel Caldeiro"
            width={148}
            height={148}
            className="avatar"
          />

          <div className="hero-content">
            <span className="overline">Full Stack Developer &amp; Future Engineer</span>

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
                      customUrl={tech.customUrl}
                      color={tech.color}
                      name={tech.name}
                      fallbackFA={tech.fallbackFA}
                      size={22}
                    />
                  </div>
                  <div className="tech-dual-sub">
                    <TechIcon
                      slug={tech.dual.slug}
                      customUrl={tech.dual.customUrl}
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
                  customUrl={tech.customUrl}
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
                  <a href={job.url} target="_blank" rel="noreferrer" className="job-company">
                    {job.company}
                  </a>
                  <span className="job-role">{job.role}</span>
                </div>
                <time className="job-period">{job.period}</time>
              </div>

              <p className="job-desc">{highlight(job.description, job.keywords)}</p>

              <div className="tech-tags">
                {job.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" aria-label="Proyectos">
        <h2 className="section-label">Proyectos</h2>

        <div className="inv-grid">
          {reposLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="inv-slot inv-skeleton" aria-hidden="true" />
              ))
            : repos.map((repo) => {
                const langColor = repo.language ? (LANG_COLOR[repo.language] ?? "555555") : "444444"
                return (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inv-slot"
                    title={repo.description ?? repo.name}
                  >
                    <div className="inv-top">
                      {repo.language && (
                        <span
                          className="inv-lang"
                          style={{ background: `#${langColor}22`, color: `#${langColor}`, borderColor: `#${langColor}44` }}
                        >
                          {repo.language}
                        </span>
                      )}
                    </div>

                    <span className="inv-name">{repo.name}</span>

                    {repo.description && (
                      <p className="inv-desc">{repo.description}</p>
                    )}

                    <div className="inv-meta">
                      <span className="inv-stars">
                        <i className="fa-solid fa-star" aria-hidden="true" />
                        {repo.stargazers_count}
                      </span>
                      <span className="inv-time">{timeAgo(repo.updated_at)}</span>
                    </div>
                  </a>
                )
              })}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section" aria-label="Formación y cursos">
        <h2 className="section-label">Formación</h2>
        <div className="edu-timeline">
          {EDUCATION.map((item, i) => (
            <div key={i} className={`edu-item edu-${item.kind}`}>
              <div className="edu-row">
                <div className="edu-left">
                  {item.badge && <span className="edu-badge">{item.badge}</span>}
                  <span className="edu-title">
                    {item.title}
                    {item.current && <span className="edu-current">cursando</span>}
                  </span>
                  <span className="edu-org">
                    {item.platformSlug && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://cdn.simpleicons.org/${item.platformSlug}/${item.platformColor}`}
                        alt={item.org}
                        width={11}
                        height={11}
                        className="edu-platform-icon"
                        loading="lazy"
                      />
                    )}
                    {item.org}
                    {item.location && ` · ${item.location}`}
                  </span>
                </div>
                <div className="edu-right">
                  <time className="edu-year">{item.year}</time>
                  {item.certUrl && (
                    <a
                      href={item.certUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="edu-cert-link"
                      aria-label={`Certificado: ${item.title}`}
                    >
                      <i className="fa-solid fa-certificate" aria-hidden="true" />
                      ver
                    </a>
                  )}
                </div>
              </div>
            </div>
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

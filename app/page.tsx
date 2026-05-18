"use client"

import { useState } from "react"

/* ── DATA ──────────────────────────────────────────────────────── */
const PROFILE_IMG =
  "https://media.licdn.com/dms/image/v2/C4D03AQGJ9B5PJj0K1Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1631016421362?e=1754524800&v=beta&t=Lw9rb55Ip6TxuG6yl3xpKt9zkiJI3LGifitz2yRcsLg"

const LINKS = {
  cv: "https://drive.google.com/file/d/1n9BE79HED3G1uh3pOSH1gco7Fs_jv-wJ/view?usp=sharing",
  github: "https://github.com/caldeix",
  linkedin: "https://www.linkedin.com/in/caldeiro-luism/",
  email: "mailto:caldeiro@pm.me",
  emailRaw: "caldeiro@pm.me",
}

interface Tech { name: string; slug: string }

const STACK: Tech[] = [
  { name: "PHP",        slug: "php"                },
  { name: "Python",     slug: "python"             },
  { name: "Java",       slug: "openjdk"            },
  { name: "Laravel",    slug: "laravel"            },
  { name: "Vue.js",     slug: "vuedotjs"           },
  { name: "JavaScript", slug: "javascript"         },
  { name: "TypeScript", slug: "typescript"         },
  { name: "React",      slug: "react"              },
  { name: "Next.js",    slug: "nextdotjs"          },
  { name: "MySQL",      slug: "mysql"              },
  { name: "Docker",     slug: "docker"             },
  { name: "Linux",      slug: "linux"              },
  { name: "Git",        slug: "git"                },
  { name: "Apache",     slug: "apache"             },
  { name: "Postman",    slug: "postman"            },
  { name: "VS Code",    slug: "visualstudiocode"   },
  { name: "N8N",        slug: "n8n"               },
  { name: "Claude AI",  slug: "anthropic"          },
  { name: "Jupyter",    slug: "jupyter"            },
  { name: "Windsurf",   slug: "windsurf"           },
]

interface Job {
  company: string
  role: string
  period: string
  url: string
  tech: string[]
  points: string[]
}

const EXPERIENCE: Job[] = [
  {
    company: "ATLS GLOBAL SL",
    role: "Full Stack Developer",
    period: "2021 — Presente",
    url: "https://www.atls-global.com/",
    tech: ["PHP", "Java", "Vue.js", "MySQL", "Python", "REST APIs"],
    points: [
      "Diseño y evolución de REST APIs orientadas a microservicios (PHP / Java)",
      "Desarrollo SPA con Vue.js y automatización de procesos con colas",
      "Integración de LLMs: Claude, GPT, Gemini y modelos open source con Python",
    ],
  },
  {
    company: "CLICKEDU",
    role: "Backend Developer",
    period: "2020 — 2021",
    url: "https://www.clickedu.net",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript"],
    points: [
      "Evolución de APIs Laravel y resolución de incidencias críticas",
      "Optimización de rendimiento en backend y frontend",
    ],
  },
  {
    company: "FOXTENN",
    role: "Systems Technician",
    period: "2019 — 2020",
    url: "http://www.foxtenn.com",
    tech: ["Hardware Especializado", "Sistemas en Tiempo Real"],
    points: [
      "Sistemas de captura de alta velocidad en torneos ATP / WTA / ITF",
    ],
  },
  {
    company: "GMEDIA SL",
    role: "Web Developer · Prácticas",
    period: "2018 — 2019",
    url: "https://www.gmedia.es",
    tech: ["WordPress", "PHP", "JavaScript", "HTML / CSS"],
    points: [
      "Desarrollo de temas WordPress a medida para clientes",
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PROFILE_IMG}
            alt="Luis Miguel Caldeiro"
            className="avatar"
            width={148}
            height={148}
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
              <a
                href={LINKS.cv}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <i className="fa-regular fa-file-pdf" aria-hidden="true" />
                CV PDF
              </a>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
                GitHub
              </a>

              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
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
            <div key={tech.slug} className="tech-item" title={tech.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={tech.name}
                width={26}
                height={26}
                className="tech-icon"
                loading="lazy"
              />
              <span className="tech-name">{tech.name}</span>
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

              <ul className="job-points">
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>

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
            <a href={LINKS.email} className="footer-link">
              caldeiro@pm.me
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          </nav>

          <span className="footer-copy">
            © {new Date().getFullYear()} · v1.3.0
          </span>
        </div>
      </footer>
    </main>
  )
}

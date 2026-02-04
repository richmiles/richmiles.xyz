import { useEffect, useMemo, useState } from 'react'
import SkillsSection from './components/SkillsSection'

const NAV_OFFSET_PX = 70

type NavItem = { id: string; label: string }

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function App() {
  const navItems = useMemo<NavItem[]>(
    () => [
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const [activeId, setActiveId] = useState<string>('about')

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      for (const item of navItems) {
        const section = document.getElementById(item.id)
        if (!section) continue
        const top = section.offsetTop - 100
        const bottom = top + section.offsetHeight
        if (scrollY >= top && scrollY < bottom) {
          setActiveId(item.id)
          return
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [navItems])

  const year = new Date().getFullYear()

  return (
    <>
      <header>
        <div className="header-pattern"></div>
        <div className="container">
          <div className="profile-container">
            <img src="/img/profile.png" alt="Rich Miles" className="profile-img" />
            <div className="profile-info">
              <h1>Rich Miles</h1>
              <p>Software Developer with 20+ years of experience</p>
              <div className="contact-info">
                <span>
                  <i className="fa-solid fa-location-dot"></i> Laramie, WY
                </span>
                <a href="mailto:me@richmiles.xyz">
                  <i className="fa-solid fa-envelope"></i> me@richmiles.xyz
                </a>
                <a href="https://linkedin.com/in/r-miles" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-linkedin"></i> LinkedIn
                </a>
                <a href="https://github.com/richmiles" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav>
        <div className="container nav-container">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? 'active' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(item.id)
                    setActiveId(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="hero" id="about">
        <div className="container">
          <h2>Innovation at the Edge</h2>
          <h3>(of sanity)</h3>
          <p>
            Building software that bends rules, challenges APIs, and occasionally offends best
            practices. With 20+ years dancing between startups, I&apos;ve learned that innovation
            thrives on discomfort. Currently weaponizing AI—turning buzzwords like LLM into tools
            that actually solve problems, automate drudgery, and occasionally make me question my
            career choices. Based in Laramie, Wyoming, because cutting-edge chaos deserves a scenic
            backdrop.
          </p>
          <a
            href="#contact"
            className="btn"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('contact')
              setActiveId('contact')
            }}
          >
            Get In Touch
          </a>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="container">
          <h2 className="section-title">My Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">April 2024 - Present</span>
                <h3 className="timeline-title">Founder &amp; Lead Developer</h3>
                <h4 className="timeline-company">Miles Automation</h4>
                <p>
                  Architecting a scalable LLM platform leveraging multiple models (ChatGPT, Claude,
                  Gemini) to automate knowledge management and task execution. Developing tools for
                  rich LLM context and semantic search capabilities.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Aug 2023 - April 2024</span>
                <h3 className="timeline-title">Game Developer</h3>
                <h4 className="timeline-company">Edventure Studios</h4>
                <p>
                  Built Edventure Trek, an educational game using Unity/C#/SQLite on the frontend
                  and Python/FastAPI/ MySQL on the backend. Launched a successful Kickstarter
                  campaign that validated core concepts.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Nov 2015 - Aug 2023</span>
                <h3 className="timeline-title">CTO &amp; Backend Developer</h3>
                <h4 className="timeline-company">Neowire</h4>
                <p>
                  Built a full Azure CI/CD pipeline using Azure DevOps with blue/green deployments.
                  Scaled operations to 250,000+ users in European markets while ensuring high
                  availability and managing diverse data regulations.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Dec 2011 - Mar 2016</span>
                <h3 className="timeline-title">Lead Software Developer</h3>
                <h4 className="timeline-company">Propel Labs</h4>
                <p>
                  Engineered a next-generation flow cytometry platform in C#/WPF, capable of
                  real-time analysis of up to 100,000 events/sec. Pioneered automated drop delay
                  calibration, replacing manual steps with a patented system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />

      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>

          <div className="projects-grid">
            <div className="project-card">
              <div className="project-img">
                <img src="/img/spark-swarm.svg" alt="Spark Swarm" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Spark Swarm</h3>
                <p>
                  Spark Swarm is your AI-powered cofounder, built specifically for solopreneurs
                  tired of drowning in half-finished projects. It ruthlessly prioritizes your
                  endless stream of ideas, quickly tests which ones are worth your time, and even
                  handles the grunt work of coding, marketing, and early-stage support. By
                  harnessing the power of ChatGPT, Claude, and a dash of entrepreneurial cynicism,
                  Spark Swarm makes sure your brilliant ideas actually see the light of day, and
                  turn a profit while they&apos;re at it.
                </p>
                <div className="project-tags">
                  <span className="project-tag">Python</span>
                  <span className="project-tag">React</span>
                  <span className="project-tag">AI</span>
                  <span className="project-tag">Docker</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img">
                <img src="/img/edventure-trek.png" alt="Edventure Trek" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Edventure Trek</h3>
                <p>
                  Edventure Trek is an educational scavenger hunt game that transforms learning into
                  hands-on adventures. It encourages users to explore the world through interactive
                  markers that cover nature, culture, science, and practical skills. Participants
                  record observations via photos, videos, sketches, and more, earning achievements
                  while collaborating socially. With real-time updates, community-created content,
                  and gamified challenges, Edventure Trek makes education engaging, social, and
                  endlessly customizable.
                </p>
                <div className="project-tags">
                  <span className="project-tag">Swift</span>
                  <span className="project-tag">C#</span>
                  <span className="project-tag">PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img">
                <img src="/img/code-loom.svg" alt="Code Loom" />
              </div>
              <div className="project-content">
                <h3 className="project-title">Code Loom</h3>
                <p>
                  Code Loom is a context management tool designed for developers who want to tame
                  the chaos of large codebases. It collects and organizes relevant snippets and file
                  structures, packaging them neatly for interaction with large language models
                  (LLMs) like Claude and ChatGPT. Whether you&apos;re debugging tricky functions,
                  writing detailed documentation, or rapidly prototyping, Code Loom streamlines your
                  workflow by delivering precise context exactly when and how you need it. Think of
                  it as your personal coding assistant that remembers everything so you don’t have
                  to.
                </p>
                <div className="project-tags">
                  <span className="project-tag">TypeScript</span>
                  <span className="project-tag">VS Code</span>
                  <span className="project-tag">Web Sockets</span>
                  <span className="project-tag">MCP Server</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>

          <div className="contact-tags-container">
            <div className="contact-tags">
              <a href="mailto:me@richmiles.xyz" className="skill-tag">
                <i className="fa-solid fa-envelope"></i> me@richmiles.xyz
              </a>
              <a
                href="https://linkedin.com/in/r-miles"
                target="_blank"
                rel="noreferrer"
                className="skill-tag"
              >
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="https://github.com/richmiles"
                target="_blank"
                rel="noreferrer"
                className="skill-tag"
              >
                <i className="fa-brands fa-github"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <p className="copyright">© {year} Rich Miles. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

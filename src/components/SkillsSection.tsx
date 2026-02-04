import { useEffect, useMemo, useState } from 'react'

type SkillsOverviewResponse = {
  skills: Array<{ id: string; title: string; experience: number }>
}

type SkillDetail = {
  title: string
  icon: string
  experience: number
  overview: string
}

type CategoryKey = 'ai' | 'languages' | 'databases' | 'frameworks' | 'devops'

type CategoryData = {
  title: string
  icon: string
  summary: string
  content?: string
}

type SkillIcon =
  | { kind: 'img'; src: string; alt: string }
  | { kind: 'i'; className: string; ariaLabel: string }

type SkillItem = {
  id: string
  name: string
  icon: SkillIcon
}

type SkillCategory = {
  key: CategoryKey
  containerClass: string
  skills: SkillItem[]
}

function masteryBars(experience: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const threshold = (i + 1) * 20
    const filled = experience >= threshold
    return <div key={i} className={`mastery-bar${filled ? ' filled' : ''}`}></div>
  })
}

function CategoryIntroCard({ data }: { data: CategoryData }) {
  return (
    <div className="category-intro-card">
      <div className="intro-card-icon">
        <i className={data.icon}></i>
      </div>
      <div className="intro-card-content">
        <h4>{data.title}</h4>
        <p>{data.summary}</p>
        {data.content ? (
          <div className="intro-card-expanded">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SkillsModal({ skill, onClose }: { skill: SkillDetail; onClose: () => void }) {
  return (
    <div
      className="skills-modal"
      style={{ display: 'block' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${skill.title} details`}
      onClick={onClose}
    >
      <div className="skills-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="modal-header">
          <h3>{skill.title}</h3>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <div className="experience-bar-container">
              <div className="experience-bar">
                <div className="experience-fill" style={{ width: `${skill.experience}%` }}></div>
              </div>
              <div className="experience-labels">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
          <div className="modal-section">
            <h4>My Take</h4>
            <p>{skill.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const categories = useMemo<SkillCategory[]>(
    () => [
      {
        key: 'ai',
        containerClass: 'category-ai',
        skills: [
          {
            id: 'chatgpt',
            name: 'ChatGPT',
            icon: { kind: 'img', src: '/img/chatgpt.svg', alt: 'ChatGPT' },
          },
          {
            id: 'claude',
            name: 'Claude',
            icon: { kind: 'img', src: '/img/claude.svg', alt: 'Claude' },
          },
          {
            id: 'gemini',
            name: 'Gemini',
            icon: { kind: 'img', src: '/img/gemini.svg', alt: 'Gemini' },
          },
          {
            id: 'deepseek',
            name: 'DeepSeek',
            icon: { kind: 'img', src: '/img/deepseek.svg', alt: 'DeepSeek' },
          },
          { id: 'llama', name: 'Llama', icon: { kind: 'img', src: '/img/meta.svg', alt: 'Llama' } },
        ],
      },
      {
        key: 'languages',
        containerClass: 'category-languages',
        skills: [
          {
            id: 'python',
            name: 'Python',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
              alt: 'Python',
            },
          },
          {
            id: 'typescript',
            name: 'TypeScript',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
              alt: 'TypeScript',
            },
          },
          {
            id: 'csharp',
            name: 'C#',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
              alt: 'C#',
            },
          },
          {
            id: 'swift',
            name: 'Swift',
            icon: { kind: 'i', className: 'devicon-swift-plain colored', ariaLabel: 'Swift' },
          },
          {
            id: 'rust',
            name: 'Rust',
            icon: { kind: 'i', className: 'devicon-rust-original', ariaLabel: 'Rust' },
          },
        ],
      },
      {
        key: 'databases',
        containerClass: 'category-databases',
        skills: [
          {
            id: 'postgresql',
            name: 'PostgreSQL',
            icon: {
              kind: 'i',
              className: 'devicon-postgresql-plain colored',
              ariaLabel: 'PostgreSQL',
            },
          },
          {
            id: 'sqlserver',
            name: 'SQL Server',
            icon: {
              kind: 'i',
              className: 'devicon-microsoftsqlserver-plain colored',
              ariaLabel: 'SQL Server',
            },
          },
          {
            id: 'azuresql',
            name: 'Azure SQL',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg',
              alt: 'Azure SQL',
            },
          },
          {
            id: 'sqlite',
            name: 'SQLite',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
              alt: 'SQLite',
            },
          },
          {
            id: 'mysql',
            name: 'MySQL',
            icon: { kind: 'i', className: 'devicon-mysql-plain colored', ariaLabel: 'MySQL' },
          },
        ],
      },
      {
        key: 'frameworks',
        containerClass: 'category-frameworks',
        skills: [
          {
            id: 'fastapi',
            name: 'FastAPI',
            icon: { kind: 'i', className: 'devicon-fastapi-plain colored', ariaLabel: 'FastAPI' },
          },
          {
            id: 'react',
            name: 'React',
            icon: { kind: 'i', className: 'devicon-react-original colored', ariaLabel: 'React' },
          },
          {
            id: 'vite',
            name: 'Vite',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
              alt: 'Vite',
            },
          },
          {
            id: 'sqlalchemy',
            name: 'SQLAlchemy',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlalchemy/sqlalchemy-original.svg',
              alt: 'SQLAlchemy',
            },
          },
          {
            id: 'entityframeworkcore',
            name: 'Entity Framework',
            icon: {
              kind: 'i',
              className: 'devicon-dotnetcore-plain colored',
              ariaLabel: 'Entity Framework',
            },
          },
        ],
      },
      {
        key: 'devops',
        containerClass: 'category-devops',
        skills: [
          {
            id: 'githubactions',
            name: 'GitHub Actions',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
              alt: 'GitHub Actions',
            },
          },
          {
            id: 'azuredevops',
            name: 'Azure DevOps',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg',
              alt: 'Azure DevOps',
            },
          },
          {
            id: 'docker',
            name: 'Docker',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
              alt: 'Docker',
            },
          },
          {
            id: 'kubernetes',
            name: 'Kubernetes',
            icon: {
              kind: 'i',
              className: 'devicon-kubernetes-plain colored',
              ariaLabel: 'Kubernetes',
            },
          },
          {
            id: 'jenkins',
            name: 'Jenkins',
            icon: {
              kind: 'img',
              src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
              alt: 'Jenkins',
            },
          },
        ],
      },
    ],
    [],
  )

  const [overview, setOverview] = useState<Record<string, { title: string; experience: number }>>(
    {},
  )
  const [categoryData, setCategoryData] = useState<Record<CategoryKey, CategoryData | null>>({
    ai: null,
    languages: null,
    databases: null,
    frameworks: null,
    devops: null,
  })

  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null)
  const [loadingSkill, setLoadingSkill] = useState(false)
  const [skillCache, setSkillCache] = useState<Record<string, SkillDetail>>({})

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const res = await fetch('/data/skills/_overview.json')
      if (!res.ok) return
      const data = (await res.json()) as SkillsOverviewResponse
      if (cancelled) return
      const next: Record<string, { title: string; experience: number }> = {}
      for (const s of data.skills) next[s.id] = { title: s.title, experience: s.experience }
      setOverview(next)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const keys: CategoryKey[] = ['ai', 'languages', 'databases', 'frameworks', 'devops']
      const entries = await Promise.all(
        keys.map(async (k) => {
          try {
            const res = await fetch(`/data/categories/${k}.json`)
            if (!res.ok) return [k, null] as const
            return [k, (await res.json()) as CategoryData] as const
          } catch {
            return [k, null] as const
          }
        }),
      )
      if (cancelled) return
      const next: Record<CategoryKey, CategoryData | null> = { ...categoryData }
      for (const [k, v] of entries) next[k] = v
      setCategoryData(next)
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkillId(null)
        setSelectedSkill(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!selectedSkillId) return
    const cached = skillCache[selectedSkillId]
    if (cached) {
      setSelectedSkill(cached)
      return
    }

    let cancelled = false
    setLoadingSkill(true)
    setSelectedSkill(null)
    ;(async () => {
      try {
        const res = await fetch(`/data/skills/${selectedSkillId}.json`)
        if (!res.ok) return
        const detail = (await res.json()) as SkillDetail
        if (cancelled) return
        setSkillCache((prev) => ({ ...prev, [selectedSkillId]: detail }))
        setSelectedSkill(detail)
      } finally {
        if (!cancelled) setLoadingSkill(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [selectedSkillId, skillCache])

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-container">
          {categories.map((cat) => (
            <div key={cat.key} className={`skills-category ${cat.containerClass}`}>
              {categoryData[cat.key] ? <CategoryIntroCard data={categoryData[cat.key]!} /> : null}
              <div className="skills-grid">
                {cat.skills.map((s) => {
                  const exp = overview[s.id]?.experience ?? 0
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className="skill-icon-item"
                      data-skill={s.id}
                      onClick={() => setSelectedSkillId(s.id)}
                    >
                      <div className="skill-mastery-container">
                        {s.icon.kind === 'img' ? (
                          <img src={s.icon.src} alt={s.icon.alt} />
                        ) : (
                          <i className={s.icon.className} aria-label={s.icon.ariaLabel}></i>
                        )}
                        <div className="skill-mastery-bars animate">{masteryBars(exp)}</div>
                      </div>

                      <span className="skill-name">{s.name}</span>
                      <span className="skill-more">Learn more</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedSkillId ? (
          loadingSkill || !selectedSkill ? (
            <div
              className="skills-modal"
              style={{ display: 'block' }}
              role="dialog"
              aria-modal="true"
              aria-label="Loading skill"
              onClick={() => setSelectedSkillId(null)}
            >
              <div className="skills-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setSelectedSkillId(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="modal-header">
                  <h3>{overview[selectedSkillId]?.title || 'Loading…'}</h3>
                </div>
                <div className="modal-body">
                  <div className="modal-section">
                    <p>Loading…</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SkillsModal
              skill={selectedSkill}
              onClose={() => {
                setSelectedSkillId(null)
                setSelectedSkill(null)
              }}
            />
          )
        ) : null}
      </div>
    </section>
  )
}

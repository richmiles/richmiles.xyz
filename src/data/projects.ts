export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  url: string | null
  icon: string
}

export const projects: Project[] = [
  {
    id: 'spark-swarm',
    title: 'Spark Swarm',
    tagline: 'Project dashboard + secrets manager',
    description:
      'Dashboard for managing projects, secrets, deployments, and fleet health across a multi-service platform.',
    tags: ['Python', 'FastAPI', 'React', 'Docker'],
    url: 'https://swarm.sparkswarm.com',
    icon: '/img/spark-swarm.svg',
  },
  {
    id: 'ieomd',
    title: 'In the Event of My Death',
    tagline: 'Digital vault for posthumous delivery',
    description:
      'Encrypted message vault that delivers letters, files, and instructions to designated recipients.',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
    url: 'https://ieomd.com',
    icon: '/img/ieomd.svg',
  },
  {
    id: 'human-index',
    title: 'Human Index',
    tagline: 'Private recall + personality profiling',
    description:
      'Personal knowledge base that captures and indexes information with semantic search and personality modeling.',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
    url: null,
    icon: '/img/human-index.svg',
  },
  {
    id: 'noodle',
    title: 'Noodle',
    tagline: 'Noodle bar rating app',
    description:
      'Rate and track noodle bars with photo reviews, personal rankings, and location-based discovery.',
    tags: ['Python', 'FastAPI', 'React', 'SQLite'],
    url: null,
    icon: '/img/noodle.svg',
  },
  {
    id: 'code-loom',
    title: 'Code Loom',
    tagline: 'LLM context management',
    description:
      'VS Code extension and MCP server that collects, organizes, and delivers codebase context to LLMs.',
    tags: ['TypeScript', 'VS Code', 'MCP'],
    url: null,
    icon: '/img/code-loom.svg',
  },
  {
    id: 'edventure-trek',
    title: 'Edventure Trek',
    tagline: 'Educational scavenger hunt',
    description:
      'Gamified learning platform where players explore the real world through interactive markers and achievements.',
    tags: ['Unity', 'C#', 'Swift', 'Python'],
    url: null,
    icon: '/img/edventure-trek.png',
  },
]

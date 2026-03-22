import type { Project } from '../data/projects'

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Alpha',
    description: 'First project',
    domain: 'alpha.example.com',
    stage: 'production',
    health: 'healthy',
    last_deploy_at: new Date().toISOString(),
    category: 'web',
    icon: '/icons/alpha.svg',
  },
  {
    id: 'proj-2',
    title: 'Beta',
    description: 'Second project',
    domain: null,
    stage: 'building',
    health: 'needs_love',
    last_deploy_at: null,
    category: 'tool',
    icon: '/icons/beta.svg',
  },
  {
    id: 'proj-3',
    title: 'Gamma',
    description: 'Third project',
    domain: 'gamma.example.com',
    stage: 'production',
    health: 'degraded',
    last_deploy_at: '2025-01-01T00:00:00Z',
    category: 'web',
    icon: '/icons/gamma.svg',
  },
]

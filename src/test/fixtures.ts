import type { ContactLink, ExperienceItem, ProfileResponse, Project } from '../api'

export const mockProfile: ProfileResponse = {
  name: 'Rich Miles',
  tagline: 'Full-stack engineer',
  description: 'Building things on the web.',
  photo_url: '/img/profile.png',
  cta_label: 'See my projects',
  location: 'Austin, TX',
  contact_links: [
    { label: 'GitHub', href: 'https://github.com/richmiles', icon: 'fab fa-github' },
    { label: 'Email', href: 'mailto:hi@richmiles.xyz', icon: 'fas fa-envelope' },
  ],
}

export const mockExperience: ExperienceItem[] = [
  {
    date: '2023 - Present',
    title: 'Senior Engineer',
    company: 'Acme Corp',
    description: 'Leading platform engineering.',
  },
  {
    date: '2020 - 2023',
    title: 'Software Engineer',
    company: 'Widgets Inc',
    description: 'Built internal tooling.',
  },
]

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

export const mockContactLinks: ContactLink[] = mockProfile.contact_links

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectCarousel from './ProjectCarousel'
import { type Project } from '../data/projects'

const mockProjects: Project[] = [
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

// Mock the fetchProjects function
vi.mock('../data/projects', async () => {
  const actual = await vi.importActual('../data/projects')
  return {
    ...actual,
    fetchProjects: vi.fn(() => Promise.resolve(mockProjects)),
  }
})

describe('ProjectCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the Projects heading', async () => {
    render(<ProjectCarousel />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders project titles after loading', async () => {
    render(<ProjectCarousel />)
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
    })
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('renders visit links for projects with domains', async () => {
    render(<ProjectCarousel />)
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
    })
    const visitLinks = screen.getAllByText(/Visit/)
    expect(visitLinks).toHaveLength(2)
  })

  it('navigates to next project when next arrow is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ProjectCarousel />)
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
    })

    const nextBtn = screen.getByLabelText('Next project')
    await user.click(nextBtn)

    const cards = document.querySelectorAll('.carousel-card')
    expect(cards[1]).toHaveClass('active')
  })

  it('renders the carousel with correct aria attributes', async () => {
    render(<ProjectCarousel />)
    await waitFor(() => {
      expect(screen.getByText('Alpha')).toBeInTheDocument()
    })
    const region = screen.getByRole('region', { name: 'Project carousel' })
    expect(region).toBeInTheDocument()
  })
})

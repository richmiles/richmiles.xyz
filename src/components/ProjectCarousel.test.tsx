import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectCarousel from './ProjectCarousel'
import { mockProjects } from '../test/fixtures'

describe('ProjectCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the Projects heading', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders all project titles', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('renders a loading state when projects array is empty', () => {
    render(<ProjectCarousel projects={[]} source="loading" warning={null} />)
    expect(screen.getByText('Loading projects...')).toBeInTheDocument()
  })

  it('shows the source badge with correct label', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)
    expect(screen.getByText('Live portfolio feed')).toBeInTheDocument()
  })

  it('shows fallback source label', () => {
    render(<ProjectCarousel projects={mockProjects} source="fallback" warning={null} />)
    expect(screen.getByText('Fallback portfolio feed')).toBeInTheDocument()
  })

  it('shows a warning when provided', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning="API is slow" />)
    expect(screen.getByText('API is slow')).toBeInTheDocument()
  })

  it('renders visit links for projects with domains', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)
    const visitLinks = screen.getAllByText(/Visit/)
    // Alpha and Gamma have domains, Beta does not
    expect(visitLinks).toHaveLength(2)
    expect(visitLinks[0].closest('a')).toHaveAttribute('href', 'https://alpha.example.com')
  })

  it('navigates to next project when next arrow is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)

    const nextBtn = screen.getByLabelText('Next project')
    await user.click(nextBtn)

    // After clicking next, the second card should be active
    const cards = document.querySelectorAll('.carousel-card')
    expect(cards[1]).toHaveClass('active')
  })

  it('navigates to previous project when prev arrow is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)

    const prevBtn = screen.getByLabelText('Previous project')
    await user.click(prevBtn)

    // Wraps around: from 0 to last (index 2)
    const cards = document.querySelectorAll('.carousel-card')
    expect(cards[2]).toHaveClass('active')
  })

  it('navigates via dot buttons', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)

    const dot3 = screen.getByLabelText('Go to project 3')
    await user.click(dot3)

    const cards = document.querySelectorAll('.carousel-card')
    expect(cards[2]).toHaveClass('active')
  })

  it('renders the carousel with correct aria attributes', () => {
    render(<ProjectCarousel projects={mockProjects} source="live" warning={null} />)
    const region = screen.getByRole('region', { name: 'Project carousel' })
    expect(region).toBeInTheDocument()
  })
})

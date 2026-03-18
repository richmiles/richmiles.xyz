import { render, screen } from '@testing-library/react'
import ExperienceTimeline from './ExperienceTimeline'
import { mockExperience } from '../test/fixtures'

describe('ExperienceTimeline', () => {
  it('renders the Experience heading', () => {
    render(<ExperienceTimeline items={mockExperience} />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders all experience items', () => {
    render(<ExperienceTimeline items={mockExperience} />)
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Widgets Inc')).toBeInTheDocument()
  })

  it('renders dates for each item', () => {
    render(<ExperienceTimeline items={mockExperience} />)
    expect(screen.getByText('2023 - Present')).toBeInTheDocument()
    expect(screen.getByText('2020 - 2023')).toBeInTheDocument()
  })

  it('shows loading state when items is empty', () => {
    render(<ExperienceTimeline items={[]} />)
    expect(screen.getByText('Loading experience...')).toBeInTheDocument()
  })
})

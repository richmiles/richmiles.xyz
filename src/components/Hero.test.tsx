import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from './Hero'
import { mockProfile } from '../test/fixtures'

describe('Hero', () => {
  it('renders profile data when provided', () => {
    render(<Hero profile={mockProfile} onCta={() => {}} />)
    expect(screen.getByText('Rich Miles')).toBeInTheDocument()
    expect(screen.getByText('Full-stack engineer')).toBeInTheDocument()
    expect(screen.getByText('Building things on the web.')).toBeInTheDocument()
    expect(screen.getByText('Austin, TX')).toBeInTheDocument()
  })

  it('renders defaults when profile is null (loading state)', () => {
    render(<Hero profile={null} onCta={() => {}} />)
    expect(screen.getByText('Rich Miles')).toBeInTheDocument()
    expect(screen.getByText('Loading portfolio...')).toBeInTheDocument()
  })

  it('renders the CTA button with profile label', () => {
    render(<Hero profile={mockProfile} onCta={() => {}} />)
    const btn = screen.getByRole('button')
    expect(btn.textContent).toContain('See my projects')
  })

  it('calls onCta when the button is clicked', async () => {
    const user = userEvent.setup()
    const onCta = vi.fn()
    render(<Hero profile={mockProfile} onCta={onCta} />)
    await user.click(screen.getByRole('button'))
    expect(onCta).toHaveBeenCalledOnce()
  })

  it('renders the profile photo with correct alt text', () => {
    render(<Hero profile={mockProfile} onCta={() => {}} />)
    const img = screen.getByAltText('Rich Miles')
    expect(img).toHaveAttribute('src', '/img/profile.png')
  })
})

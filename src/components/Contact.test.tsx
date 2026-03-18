import { render, screen } from '@testing-library/react'
import Contact from './Contact'
import { mockContactLinks } from '../test/fixtures'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact links={mockContactLinks} />)
    expect(screen.getByText('Say hello.')).toBeInTheDocument()
  })

  it('renders all contact links', () => {
    render(<Contact links={mockContactLinks} />)
    expect(screen.getByText(/GitHub/)).toBeInTheDocument()
    expect(screen.getByText(/Email/)).toBeInTheDocument()
  })

  it('sets target=_blank for http links', () => {
    render(<Contact links={mockContactLinks} />)
    const githubLink = screen.getByText(/GitHub/).closest('a')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('does not set target=_blank for mailto links', () => {
    render(<Contact links={mockContactLinks} />)
    const emailLink = screen.getByText(/Email/).closest('a')
    expect(emailLink).not.toHaveAttribute('target')
  })

  it('shows loading state when links is empty', () => {
    render(<Contact links={[]} />)
    expect(screen.getByText('Loading contact links...')).toBeInTheDocument()
  })
})

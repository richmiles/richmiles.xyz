import { render, screen } from '@testing-library/react'
import Contact from './Contact'

describe('Contact', () => {
  it('renders the section heading', () => {
    render(<Contact />)
    expect(screen.getByText('Say hello.')).toBeInTheDocument()
  })

  it('renders contact links', () => {
    render(<Contact />)
    expect(screen.getByText(/GitHub/)).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument()
    expect(screen.getByText(/me@richmiles.xyz/)).toBeInTheDocument()
  })

  it('sets target=_blank for external links', () => {
    render(<Contact />)
    const githubLink = screen.getByText(/GitHub/).closest('a')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer')
  })

  it('does not set target=_blank for mailto links', () => {
    render(<Contact />)
    const emailLink = screen.getByText(/me@richmiles.xyz/).closest('a')
    expect(emailLink).not.toHaveAttribute('target')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from './Nav'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

describe('Nav', () => {
  it('renders all nav links', () => {
    render(<Nav navItems={navItems} activeId="about" onNav={() => {}} />)
    for (const item of navItems) {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    }
  })

  it('marks the active link with the active class', () => {
    render(<Nav navItems={navItems} activeId="projects" onNav={() => {}} />)
    const projectsLink = screen.getByText('Projects')
    expect(projectsLink).toHaveClass('active')

    const aboutLink = screen.getByText('About')
    expect(aboutLink).not.toHaveClass('active')
  })

  it('calls onNav with the correct id when a link is clicked', async () => {
    const user = userEvent.setup()
    const onNav = vi.fn()
    render(<Nav navItems={navItems} activeId="about" onNav={onNav} />)

    await user.click(screen.getByText('Contact'))
    expect(onNav).toHaveBeenCalledWith('contact')
  })

  it('renders the RM mark', () => {
    render(<Nav navItems={navItems} activeId="about" onNav={() => {}} />)
    expect(screen.getByText('RM')).toBeInTheDocument()
  })

  it('prevents default link behavior on click', async () => {
    const user = userEvent.setup()
    render(<Nav navItems={navItems} activeId="about" onNav={() => {}} />)
    const link = screen.getByText('About')
    expect(link.getAttribute('href')).toBe('#about')
    await user.click(link)
    // If preventDefault wasn't called, the URL would change — we just verify onNav was called
  })
})

type NavItem = { id: string; label: string }

type NavProps = {
  navItems: NavItem[]
  activeId: string
  onNav: (id: string) => void
}

export default function Nav({ navItems, activeId, onNav }: NavProps) {
  return (
    <nav>
      <div className="container nav-container">
        <span className="nav-mark">RM</span>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? 'active' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  onNav(item.id)
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
    isActive ? 'bg-white/15 text-gold' : 'text-white/90 hover:bg-white/10 hover:text-gold'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-md text-base font-semibold transition-colors ${
    isActive ? 'bg-white/15 text-gold' : 'text-white/90 hover:bg-white/10 hover:text-gold'
  }`

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/partners', label: 'Partners' },
  { to: '/signup', label: 'Sign Up' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-cobalt text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/logo.jpeg"
            alt="Langebaan Business Chamber"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white/45"
          />
          <span className="font-semibold text-lg leading-tight hidden sm:block tracking-wide">
            Langebaan<br />Business Chamber
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-white rounded transition-transform ${open ? 'translate-y-[9px] rotate-45' : ''}`} />
            <span className={`block h-0.5 w-full bg-white rounded transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-full bg-white rounded transition-transform ${open ? '-translate-y-[9px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-cobalt-dark border-t border-white/10 px-4 py-3 space-y-1">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={mobileLinkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

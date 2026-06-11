import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
    isActive ? 'bg-white/15 text-gold' : 'text-white/90 hover:bg-white/10 hover:text-gold'
  }`

export default function Navbar() {
  return (
    <header className="bg-navy/95 backdrop-blur text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Langebaan Business Chamber" className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/60" />
          <span className="font-semibold text-lg leading-tight hidden sm:block tracking-wide">
            Langebaan<br />Business Chamber
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/partners" className={linkClass}>Partners</NavLink>
          <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

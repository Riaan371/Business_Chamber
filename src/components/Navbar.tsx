import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'
  }`

export default function Navbar() {
  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Langebaan Business Chamber" className="h-14 w-14 rounded-full object-cover" />
          <span className="font-semibold text-lg leading-tight hidden sm:block">
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

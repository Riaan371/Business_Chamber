import { useState, type FormEvent, type ReactNode } from 'react'

const SESSION_KEY = 'lbc_admin_authed'
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'Admin'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin'

export default function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
      setError(null)
    } else {
      setError('Incorrect username or password.')
    }
  }

  if (authed) return <>{children}</>

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="bg-sand rounded-lg p-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-navy text-white py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
        >
          Log In
        </button>
      </form>
    </div>
  )
}

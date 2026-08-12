import { Link } from 'react-router-dom'
import KalkmuurBg from '../components/KalkmuurBg'

const values = [
  { title: 'Ethical Listings', text: 'A directory of vetted businesses that follow our code of conduct.' },
  { title: 'Networking & Training', text: 'Referrals, events and training opportunities to help your business grow.' },
  { title: 'Transparent Membership', text: 'One simple membership fee with clear, defined benefits.' },
  { title: 'Strong Governance', text: 'Community advocacy backed by accountable leadership.' },
]

const benefits = [
  'Voting rights',
  'Website listing in our partner directory',
  'Networking events & meeting access',
  'Referrals & training opportunities',
]

export default function Home() {
  return (
    <div>
      {/* ── Hero: lime-washed wall over the Langebaan shallows ── */}
      <section className="relative overflow-hidden">
        <KalkmuurBg water={0.26} seed={1001} />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-32 sm:pt-24 sm:pb-44 text-center">
          <img
            src="/logo.jpeg"
            alt="Langebaan Business Chamber"
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover mx-auto mb-7 shadow-xl ring-4 ring-cobalt/80"
          />
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight text-navy">
            Langebaan Business Chamber
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-9 text-navy/70 leading-relaxed">
            Uniting ethical, vetted businesses on the West Coast through networking, referrals,
            training and collaboration &mdash; built on integrity, fairness and accountability.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-cobalt text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-cobalt/25 hover:opacity-90 transition-opacity"
            >
              Become a Member
            </Link>
            <Link
              to="/partners"
              className="bg-white/60 border border-cobalt/30 text-cobalt px-8 py-3.5 rounded-full font-semibold hover:bg-white transition-colors"
            >
              View Our Partners
            </Link>
          </div>
        </div>
      </section>

      {/* ── What We Stand For ── */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">What We Stand For</h2>
        <p className="text-gray-500 text-center mb-10 sm:mb-12">The values that guide our chamber and its members</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {values.map((item) => (
            <div
              key={item.title}
              className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-cobalt"
            >
              <h3 className="text-navy font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Membership ── */}
      <section className="relative overflow-hidden">
        <KalkmuurBg water={0.18} seed={2002} />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-28 sm:pt-20 sm:pb-36">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-2">Membership</h2>
          <p className="text-navy/60 text-center mb-10 sm:mb-12">One simple plan for every business</p>
          <div className="max-w-md mx-auto">
            <div className="card-hover bg-white rounded-2xl p-8 sm:p-10 shadow-xl border-t-8 border-cobalt text-center">
              <h3 className="text-xl font-bold text-navy mb-2 uppercase tracking-wide">Membership</h3>
              <p className="text-4xl sm:text-5xl font-extrabold text-cobalt mb-1">
                R120<span className="text-lg font-medium text-gray-500">/month</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Billed monthly &middot; cancel anytime</p>
              <ul className="text-sm text-gray-700 space-y-2.5 text-left mb-8">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="text-cobalt font-bold mt-px">&#10003;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="block bg-cobalt text-white px-6 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Sign Up Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

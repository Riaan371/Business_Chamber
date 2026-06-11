import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-navy via-navy-light to-teal text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,185,35,0.18),transparent_55%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <img src="/logo.jpeg" alt="Langebaan Business Chamber" className="h-32 w-32 rounded-full object-cover mx-auto mb-6 shadow-2xl ring-4 ring-gold/50" />
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight">Langebaan Business Chamber</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-white/90">
            Uniting ethical, vetted businesses on the West Coast through networking, referrals,
            training and collaboration &mdash; built on integrity, fairness and accountability.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup" className="bg-gold text-navy px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity">
              Become a Member
            </Link>
            <Link to="/partners" className="bg-white/10 border border-white/40 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur">
              View Our Partners
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-navy text-center mb-2">What We Stand For</h2>
        <p className="text-gray-500 text-center mb-12">The values that guide our chamber and its members</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Ethical Listings', text: 'A directory of vetted businesses that follow our code of conduct.' },
            { title: 'Networking & Training', text: 'Referrals, events and training opportunities to help your business grow.' },
            { title: 'Transparent Membership', text: 'One simple membership fee with clear, defined benefits.' },
            { title: 'Strong Governance', text: 'Community advocacy backed by accountable leadership.' },
          ].map((item) => (
            <div key={item.title} className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-gold">
              <h3 className="text-navy font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-navy text-center mb-2">Membership</h2>
          <p className="text-gray-600 text-center mb-12">One simple plan for every business</p>
          <div className="max-w-md mx-auto">
            <div className="card-hover bg-white rounded-2xl p-10 shadow-lg border-t-8 border-gold text-center">
              <h3 className="text-xl font-bold text-navy mb-2 uppercase tracking-wide">Membership</h3>
              <p className="text-5xl font-extrabold text-navy mb-1">
                R120<span className="text-lg font-medium text-gray-500">/month</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Billed monthly &middot; cancel anytime</p>
              <ul className="text-sm text-gray-700 space-y-2 text-left mb-8">
                <li className="flex items-start gap-2"><span className="text-teal font-bold">&#10003;</span> Voting rights</li>
                <li className="flex items-start gap-2"><span className="text-teal font-bold">&#10003;</span> Website listing in our partner directory</li>
                <li className="flex items-start gap-2"><span className="text-teal font-bold">&#10003;</span> Networking events &amp; meeting access</li>
                <li className="flex items-start gap-2"><span className="text-teal font-bold">&#10003;</span> Referrals &amp; training opportunities</li>
              </ul>
              <Link to="/signup" className="block bg-navy text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                Sign Up Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy via-teal to-sunset text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <img src="/logo.jpeg" alt="Langebaan Business Chamber" className="h-32 w-32 rounded-full object-cover mx-auto mb-6 shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Langebaan Business Chamber</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Uniting ethical, vetted businesses on the West Coast through networking, referrals,
            training and collaboration &mdash; built on integrity, fairness and accountability.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup" className="bg-sunset px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
              Become a Member
            </Link>
            <Link to="/partners" className="bg-white/10 border border-white/40 px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition-colors">
              View Our Partners
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-navy text-center mb-10">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Ethical Listings', text: 'A directory of vetted businesses that follow our code of conduct.' },
            { title: 'Networking & Training', text: 'Referrals, events and training opportunities to help your business grow.' },
            { title: 'Transparent Membership', text: 'Clear membership tiers with defined benefits for every member.' },
            { title: 'Strong Governance', text: 'Community advocacy backed by accountable leadership.' },
          ].map((item) => (
            <div key={item.title} className="bg-sand rounded-lg p-6 shadow-sm">
              <h3 className="text-navy font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-navy text-center mb-10">Membership Tiers</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm border-t-4 border-teal">
              <h3 className="text-xl font-bold text-navy mb-2">Standard</h3>
              <p className="text-3xl font-bold text-navy mb-1">R100<span className="text-base font-normal">/month</span></p>
              <p className="text-sm text-gray-500 mb-4">or R1200/year</p>
              <ul className="text-sm text-gray-700 space-y-1 text-left list-disc list-inside">
                <li>Voting rights</li>
                <li>Website listing</li>
                <li>Meeting access</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border-t-4 border-sunset">
              <h3 className="text-xl font-bold text-navy mb-2">Premium</h3>
              <p className="text-3xl font-bold text-navy mb-1">R300<span className="text-base font-normal">/month</span></p>
              <p className="text-sm text-gray-500 mb-4">or R3600/year</p>
              <ul className="text-sm text-gray-700 space-y-1 text-left list-disc list-inside">
                <li>Everything in Standard</li>
                <li>Enhanced visibility</li>
                <li>Priority promotion</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/signup" className="bg-navy text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity inline-block">
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

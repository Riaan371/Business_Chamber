const team = [
  { role: 'President', email: 'president@langebaanbusinesschamber.co.za' },
  { role: 'Vice President', email: 'vicepresident@langebaanbusinesschamber.co.za' },
  { role: 'Secretary', email: 'secretary@langebaanbusinesschamber.co.za' },
  { role: 'Treasurer', email: 'treasurer@langebaanbusinesschamber.co.za' },
  { role: 'Marketing', email: 'marketing@langebaanbusinesschamber.co.za' },
  { role: 'Ethics Officer', email: 'ethics@langebaanbusinesschamber.co.za' },
]

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
          <p className="text-white/90 max-w-3xl">
            The Langebaan Business Chamber unites ethical businesses across the West Coast region,
            promoting growth, community and sustainability. We connect members through networking,
            referrals, training and collaboration, underpinned by a strong commitment to integrity,
            fairness and accountability.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-navy mb-6">Our Executive Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <div key={member.role} className="card-hover bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-teal">
              <h3 className="font-bold text-navy">{member.role}</h3>
              <a href={`mailto:${member.email}`} className="text-sm text-teal hover:underline">{member.email}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

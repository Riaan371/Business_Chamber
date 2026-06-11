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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6">About Us</h1>
      <p className="text-gray-700 max-w-3xl mb-10">
        The Langebaan Business Chamber unites ethical businesses across the West Coast region,
        promoting growth, community and sustainability. We connect members through networking,
        referrals, training and collaboration, underpinned by a strong commitment to integrity,
        fairness and accountability.
      </p>

      <h2 className="text-2xl font-bold text-navy mb-6">Our Executive Team</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <div key={member.role} className="bg-sand rounded-lg p-5">
            <h3 className="font-semibold text-navy">{member.role}</h3>
            <a href={`mailto:${member.email}`} className="text-sm text-teal hover:underline">{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

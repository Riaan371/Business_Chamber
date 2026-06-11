export default function Signup() {
  const formUrl = import.meta.env.VITE_SIGNUP_FORM_URL as string | undefined

  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Become a Member</h1>
          <p className="text-white/90">Join the Langebaan Business Chamber for R120/month</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-700 mb-8">
          Thanks for your interest in joining the Langebaan Business Chamber! Please complete the
          membership application form. Our team will review your application and be in
          touch to confirm your payment details.
        </p>

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-gold text-navy px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            Open Membership Application Form
          </a>
        ) : (
          <div className="bg-sand rounded-xl p-8 text-gray-700">
            <p>
              The membership application form link has not been configured yet. Please set
              <code className="mx-1 bg-white px-1 rounded">VITE_SIGNUP_FORM_URL</code>
              to your Google Form link, or contact us directly at{' '}
              <a href="mailto:info@langebaanbusinesschamber.co.za" className="text-teal hover:underline">
                info@langebaanbusinesschamber.co.za
              </a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

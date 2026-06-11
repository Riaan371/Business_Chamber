export default function Signup() {
  const formUrl = import.meta.env.VITE_SIGNUP_FORM_URL as string | undefined

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-navy mb-4">Become a Member</h1>
      <p className="text-gray-700 mb-8">
        Thanks for your interest in joining the Langebaan Business Chamber! Please complete the
        membership application form. Our team will review your application and be in
        touch to confirm your membership tier and payment details.
      </p>

      {formUrl ? (
        <a
          href={formUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-sunset text-white px-8 py-4 rounded-md font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Open Membership Application Form
        </a>
      ) : (
        <div className="bg-sand rounded-lg p-8 text-gray-700">
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
  )
}

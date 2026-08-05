import { useState } from 'react'

export default function Signup() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('https://formspree.io/f/mljrenoy', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold mb-2">Become a Member</h1>
          <p className="text-white/90">Join the Langebaan Business Chamber for R120/month</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <p className="text-gray-700 mb-8 text-center">
          Thanks for your interest in joining the Langebaan Business Chamber! Complete the form
          below and our team will be in touch to confirm your membership and payment details.
        </p>

        {status === 'success' ? (
          <div className="bg-teal/10 border border-teal rounded-xl p-8 text-center">
            <p className="text-2xl font-bold text-navy mb-2">Application Submitted!</p>
            <p className="text-gray-700">Thank you for applying. We'll be in touch shortly to confirm your membership.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border-t-8 border-gold p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Business Name <span className="text-red-500">*</span></label>
              <input name="Business Name" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Contact Person <span className="text-red-500">*</span></label>
              <input name="Contact Person" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input name="Phone Number" type="tel" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Email Address <span className="text-red-500">*</span></label>
                <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Website</label>
              <input name="Website" type="url" placeholder="https://www.example.com" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Business Category</label>
              <input name="Category" placeholder="e.g. Retail, Hospitality, Professional Services" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Brief Description of Your Business</label>
              <textarea name="Description" rows={3} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal resize-none" />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gold text-navy font-bold py-3 rounded-full text-lg shadow hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Membership is R120/month. Payment details will be confirmed after review.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

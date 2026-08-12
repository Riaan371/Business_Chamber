import PageHero from '../components/PageHero'

export default function Contact() {
  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you" />

      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl space-y-4 text-gray-700 shadow-lg border-t-8 border-cobalt">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-navy sm:w-20 shrink-0">Phone:</span>
            <a href="tel:0228800456" className="text-cobalt hover:underline">022 880 0456</a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-navy sm:w-20 shrink-0">Email:</span>
            <a
              href="mailto:info@langebaanbusinesschamber.co.za"
              className="text-cobalt hover:underline break-all"
            >
              info@langebaanbusinesschamber.co.za
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-navy sm:w-20 shrink-0">Location:</span>
            <span>Langebaan, Western Cape, 7357</span>
          </div>
        </div>
      </div>
    </div>
  )
}

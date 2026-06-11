export default function Contact() {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-white/90">We'd love to hear from you</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 max-w-xl space-y-4 text-gray-700 shadow-lg border-t-8 border-gold">
          <p className="flex items-center gap-3">
            <span className="font-semibold text-navy w-20">Phone:</span>
            <a href="tel:0228800456" className="text-teal hover:underline">022 880 0456</a>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-navy w-20">Email:</span>
            <a href="mailto:info@langebaanbusinesschamber.co.za" className="text-teal hover:underline">info@langebaanbusinesschamber.co.za</a>
          </p>
          <p className="flex items-center gap-3">
            <span className="font-semibold text-navy w-20">Location:</span>
            <span>Langebaan, Western Cape, 7357</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-navy mb-6">Contact Us</h1>
      <div className="bg-sand rounded-lg p-8 max-w-xl space-y-3 text-gray-700">
        <p><span className="font-semibold text-navy">Phone:</span> <a href="tel:0228800456" className="hover:underline">022 880 0456</a></p>
        <p><span className="font-semibold text-navy">Email:</span> <a href="mailto:info@langebaanbusinesschamber.co.za" className="hover:underline">info@langebaanbusinesschamber.co.za</a></p>
        <p><span className="font-semibold text-navy">Location:</span> Langebaan, Western Cape, 7357</p>
      </div>
    </div>
  )
}

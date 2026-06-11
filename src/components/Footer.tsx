export default function Footer() {
  return (
    <footer className="bg-navy text-white/80 mt-16 border-t-4 border-gold">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <h3 className="text-white font-semibold mb-2 text-base">Langebaan Business Chamber</h3>
          <p>Growing &middot; Community &middot; Sustainability &middot; Weskus</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2 text-base">Contact</h3>
          <p>Tel: 022 880 0456</p>
          <p>Email: info@langebaanbusinesschamber.co.za</p>
          <p>Langebaan, Western Cape, 7357</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2 text-base">Links</h3>
          <p><a href="/about" className="hover:text-gold transition-colors">About Us</a></p>
          <p><a href="/partners" className="hover:text-gold transition-colors">Our Partners</a></p>
          <p><a href="/signup" className="hover:text-gold transition-colors">Become a Member</a></p>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-white/10">
        &copy; {new Date().getFullYear()} Langebaan Business Chamber. All rights reserved.
      </div>
    </footer>
  )
}

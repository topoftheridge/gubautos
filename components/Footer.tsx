export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#FFC107] flex items-center justify-center bg-[#1a1a1a] shrink-0">
                <span className="text-[#FFC107] font-black text-sm">GA</span>
              </div>
              <div className="leading-none">
                <div className="text-[#FFC107] font-black text-lg">GUB</div>
                <div className="text-white font-black text-lg -mt-0.5">AUTOS</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Quality pre-owned vehicles with fast financing. Serving Freehold, NJ and surrounding areas.
            </p>
          </div>

          {/* Inventory */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#FFC107] pb-2">Inventory</h4>
            <ul className="space-y-2 text-sm">
              {["SUVs", "Sedans", "Trucks", "Luxury", "AWD / 4WD", "Under $15K"].map(item => (
                <li key={item}><a href="/inventory" className="hover:text-[#FFC107] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Financing */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#FFC107] pb-2">Financing</h4>
            <ul className="space-y-2 text-sm">
              {["Apply Online", "Bad Credit OK", "First-Time Buyers", "Trade-In Value", "Our Lenders"].map(item => (
                <li key={item}><a href="#financing" className="hover:text-[#FFC107] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#FFC107] pb-2">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>482 Rt-9 South, Freehold, NJ 07728</li>
              <li><a href="tel:+17325550192" className="hover:text-[#FFC107]">(732) 555-0192</a></li>
              <li>Mon–Sat 9AM–7PM &middot; Sun 11AM–4PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} GubAutos. All rights reserved. &middot; Used Car Dealer — Freehold, NJ
        </div>
      </div>
    </footer>
  );
}

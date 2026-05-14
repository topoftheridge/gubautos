export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gusmotorsheader.png" alt="Gub Motors" className="h-12 w-auto object-contain mb-4" />
            <p className="text-sm leading-relaxed">
              Quality pre-owned vehicles with fast financing. Serving Bucks County & Philadelphia area.
            </p>
          </div>

          {/* Inventory */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#1E3A8A] pb-2">Inventory</h4>
            <ul className="space-y-2 text-sm">
              {["SUVs", "Sedans", "Trucks", "Luxury", "AWD / 4WD", "Under $15K"].map(item => (
                <li key={item}><a href="/inventory" className="hover:text-[#1E3A8A] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Financing */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#1E3A8A] pb-2">Financing</h4>
            <ul className="space-y-2 text-sm">
              {["Apply Online", "Bad Credit OK", "First-Time Buyers", "Trade-In Value", "Our Lenders"].map(item => (
                <li key={item}><a href="#financing" className="hover:text-[#1E3A8A] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* About & Blog */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#1E3A8A] pb-2">About & Blog</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our History", href: "/about#history" },
                { label: "Blog", href: "/blog" },
              ].map(item => (
                <li key={item.label}><a href={item.href} className="hover:text-[#1E3A8A] transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-[#1E3A8A] pb-2">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Bucks County, PA</li>
              <li><a href="tel:+17325550192" className="hover:text-[#1E3A8A]">(732) 555-0192</a></li>
              <li>Mon–Sat 9AM–7PM &middot; Sun 11AM–4PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} GubMotors. All rights reserved. &middot; Used Car Dealer — Bucks County & Philadelphia
        </div>
      </div>
    </footer>
  );
}

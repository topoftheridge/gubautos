export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1 justify-center md:justify-start mb-1">
              <span className="text-red-500 text-2xl font-black">GUB</span>
              <span className="text-white text-2xl font-black">AUTOS</span>
            </div>
            <p className="text-sm">482 Rt-9 South, Freehold, NJ 07728</p>
            <p className="text-sm">(732) 555-0192</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm justify-center">
            <a href="#inventory" className="hover:text-white transition-colors">Inventory</a>
            <a href="#financing" className="hover:text-white transition-colors">Financing</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} GubAutos. All rights reserved. | Used Car Dealer — Freehold, NJ
        </div>
      </div>
    </footer>
  );
}

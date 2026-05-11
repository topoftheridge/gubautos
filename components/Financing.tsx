const items = [
  { icon: "💳", title: "Bad Credit? No Problem.", desc: "We work with all credit types. Bankruptcies, repossessions, late payments — we've seen it all and we still get you approved." },
  { icon: "🆕", title: "First-Time Buyers Welcome", desc: "No credit history? No stress. Our team specializes in getting first-time buyers into great vehicles with reasonable payments." },
  { icon: "⚡", title: "Fast Approval Process", desc: "Most customers get approved in under an hour. Come in, pick your car, drive home. That simple." },
  { icon: "🏦", title: "40+ Lenders Competing For You", desc: "We shop your application across dozens of banks and credit unions to get you the best possible rate." },
];

export default function Financing() {
  return (
    <section id="financing" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4">Financing</p>
            <h2 className="text-4xl font-black mb-6">
              All Credit Situations <span className="text-red-500">Welcome.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At GubAutos, we believe everyone deserves a reliable vehicle. Our finance team has
              helped hundreds of customers with challenged credit get into quality cars — and we
              can do the same for you.
            </p>
            <a
              href="#contact"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded text-lg transition-colors"
            >
              Apply Now — It&apos;s Free
            </a>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.title} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-red-600 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

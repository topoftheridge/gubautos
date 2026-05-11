const items = [
  { icon: "💳", title: "Bad Credit? No Problem.", desc: "We work with all credit types. Bankruptcies, repossessions, late payments — we still get you approved." },
  { icon: "🆕", title: "First-Time Buyers Welcome", desc: "No credit history? No stress. We specialize in getting first-time buyers into great vehicles." },
  { icon: "⚡", title: "Fast Approval Process", desc: "Most customers get approved in under an hour. Come in, pick your car, drive home today." },
  { icon: "🏦", title: "40+ Lenders Competing For You", desc: "We shop your application across dozens of banks and credit unions for the best possible rate." },
];

export default function Financing() {
  return (
    <section id="financing" className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Financing for Every Situation</h2>
            <div className="h-1 w-32 bg-[#FFC107] rounded mb-6" />
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At GubAutos, we believe everyone deserves a reliable vehicle. Our finance team has
              helped hundreds of customers with all credit backgrounds get into quality cars —
              and we can do the same for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-[#FFC107] hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded text-base text-center transition-colors uppercase tracking-wide"
              >
                Apply Now — It&apos;s Free
              </a>
              <a
                href="#contact"
                className="border border-white/30 hover:border-[#FFC107] hover:text-[#FFC107] text-white font-semibold px-8 py-4 rounded text-base text-center transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item) => (
              <div key={item.title} className="bg-[#222] rounded-xl p-6 border border-white/10 hover:border-[#FFC107]/60 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

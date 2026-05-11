const reasons = [
  { icon: "🔍", title: "Thoroughly Inspected", desc: "Every car goes through a multi-point inspection before it hits our lot. No surprises." },
  { icon: "📋", title: "Full Vehicle History", desc: "CarFax reports available on every vehicle. We want you to know exactly what you're buying." },
  { icon: "🚗", title: "Test Drive Anytime", desc: "Take it for a spin before you commit. No pressure, no rush — just get comfortable." },
  { icon: "🤝", title: "No-Pressure Sales", desc: "Our team is here to help, not push. Find the right car on your timeline." },
  { icon: "🔧", title: "On-Site Service Center", desc: "Oil changes, brakes, tires — we handle it all after the sale too." },
  { icon: "⭐", title: "500+ Happy Customers", desc: "Don't take our word for it. Check out our reviews and see why people keep coming back." },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Why GubAutos</p>
          <h2 className="text-4xl font-black text-black">The GubAutos Difference</h2>
          <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
            We&apos;re not your average car lot. Here&apos;s what sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex gap-4 items-start p-6 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all">
              <div className="text-4xl shrink-0">{reason.icon}</div>
              <div>
                <h3 className="font-bold text-black text-lg mb-1">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

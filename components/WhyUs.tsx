const reasons = [
  { title: "Multi-Point Inspection", desc: "Every car is thoroughly inspected before it hits our lot. No surprises after you buy." },
  { title: "Full Vehicle History", desc: "CarFax reports available on every vehicle. Know exactly what you're buying." },
  { title: "Test Drive Anytime", desc: "Take it for a spin before you commit. No pressure, no rush." },
  { title: "No-Pressure Sales", desc: "Our team is here to help, not push. Find the right car on your timeline." },
  { title: "On-Site Service Center", desc: "Oil changes, brakes, tires — we handle it all after the sale too." },
  { title: "500+ Five-Star Reviews", desc: "Don't take our word for it. Our customers keep coming back and sending friends." },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Why GubMotors?</h2>
          <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto">
            We&apos;re not your average car lot. Here&apos;s what sets us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="p-6 rounded-xl border border-gray-100 hover:border-[#1E3A8A] hover:shadow-md transition-all">
              <div className="w-8 h-1 bg-[#1E3A8A] rounded mb-4" />
              <h3 className="font-bold text-black text-base mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

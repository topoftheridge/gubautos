const stats = [
  { value: "200+", label: "Vehicles Available" },
  { value: "500+", label: "5-Star Reviews" },
  { value: "40-Mile", label: "Free Delivery Radius" },
  { value: "40+", label: "Financing Sources" },
];

export default function Stats() {
  return (
    <section className="bg-[#0f172a] text-white py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-6 py-2">
              <div className="text-4xl font-black text-blue-400 mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

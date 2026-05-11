const stats = [
  { value: "200+", label: "Vehicles Available" },
  { value: "500+", label: "5-Star Reviews" },
  { value: "Same Day", label: "Approval Possible" },
  { value: "40+", label: "Financing Sources" },
];

export default function Stats() {
  return (
    <section className="bg-red-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-red-500 last:border-0 px-4">
              <div className="text-4xl font-black mb-1">{stat.value}</div>
              <div className="text-red-100 text-sm font-semibold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

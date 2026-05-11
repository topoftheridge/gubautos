const styles = [
  { label: "SUVs", count: 48 },
  { label: "Sedans", count: 35 },
  { label: "Trucks", count: 22 },
  { label: "Luxury", count: 18 },
  { label: "AWD / 4WD", count: 31 },
  { label: "Under $15K", count: 27 },
  { label: "Vans & Minivans", count: 12 },
  { label: "Convertibles", count: 8 },
];

export default function BrowseByStyle() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">Browse by Style</h2>
          <div className="h-1 w-32 bg-[#1E3A8A] rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {styles.map((s) => (
            <a key={s.label} href="/inventory"
              className="flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-xl border border-gray-200 hover:border-[#1E3A8A] hover:shadow-md transition-all group text-center">
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[#1d4ed8]">{s.label}</span>
              <span className="text-xs text-gray-400">{s.count} vehicles</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

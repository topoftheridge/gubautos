import Link from "next/link";
import { getBodyStyleCounts } from "@/sanity/queries";

// Fixed category order/labels — only show if count > 0
const CATEGORIES = ["SUV", "Sedan", "Truck", "Luxury", "Van", "Minivan", "Coupe", "Convertible", "Wagon", "Hatchback"];

export default async function BrowseByStyle() {
  const counts = await getBodyStyleCounts();
  const countMap = Object.fromEntries(counts.map(c => [c.bodyStyle, c.count]));

  // Build display list: fixed categories that have inventory, plus any extras
  const known = CATEGORIES
    .filter(cat => countMap[cat])
    .map(cat => ({ label: cat, count: countMap[cat] }));

  const knownKeys = new Set(CATEGORIES);
  const extra = counts
    .filter(c => !knownKeys.has(c.bodyStyle) && c.bodyStyle !== "Other")
    .map(c => ({ label: c.bodyStyle, count: c.count }));

  const items = [...known, ...extra];

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-black mb-2">Browse by Style</h2>
          <div className="h-1 w-32 bg-[#1E3A8A] rounded" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map((s) => (
            <Link
              key={s.label}
              href={`/inventory?style=${encodeURIComponent(s.label)}`}
              className="flex flex-col items-center justify-center gap-2 py-6 px-3 rounded-xl border border-gray-200 hover:border-[#1E3A8A] hover:shadow-md transition-all group text-center"
            >
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[#1E3A8A]">{s.label}s</span>
              <span className="text-xs text-gray-400">{s.count} vehicle{s.count !== 1 ? "s" : ""}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

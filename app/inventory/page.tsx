import Link from "next/link";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { getVehiclesByFilter, getBodyStyleCounts, type Vehicle } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

function formatPrice(n: number) { return "$" + n.toLocaleString(); }
function formatMileage(n: number) { return n.toLocaleString(); }
function estimateMonthly(price: number) {
  const r = 0.079 / 12; const n = 72;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -n)));
}

function VehicleCard({ car }: { car: Vehicle }) {
  const imgSrc = car.images && car.images.length > 0
    ? urlBuilder.image(car.images[0]).width(600).height(400).url()
    : `https://placehold.co/600x400/0f172a/1e3a8a?text=${car.year}+${encodeURIComponent(car.make)}`;
  const slug = car.slug?.current || car._id;

  return (
    <Link href={`/inventory/${slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
        <div className="relative overflow-hidden bg-[#0f172a]" style={{ aspectRatio: "16/10" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {car.status === "Pending" && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Sale Pending</div>
          )}
          {car.status === "Sold" && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Sold</div>
          )}
          {car.featured && car.status === "Available" && (
            <div className="absolute top-2 left-2 bg-[#1E3A8A] text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Featured</div>
          )}
          {car.images && car.images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              {car.images.length} photos
            </div>
          )}
        </div>
        <div className="p-4">
          {car.stockNumber && <p className="text-xs text-gray-400 mb-1">Stock # {car.stockNumber}</p>}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-base text-black leading-snug">
              {car.year} {car.make} {car.model}
            </h3>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{car.trim || car.bodyStyle || "—"}</span>
            <span>{formatMileage(car.mileage)} mi</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Amount financed</p>
              <p className="text-xl font-black text-black">
                {formatPrice(car.cashDiscount ? car.price - car.cashDiscount : car.price)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                ~${estimateMonthly(car.cashDiscount ? car.price - car.cashDiscount : car.price)}/mo est.
              </p>
            </div>
            <span className="bg-[#1E3A8A] text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wide transition-colors hover:bg-blue-700">
              Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const SORT_OPTIONS = [
  { value: "default", label: "Best Match" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "mileage-asc", label: "Mileage: Low to High" },
  { value: "year-desc", label: "Year: Newest First" },
];

function sortVehicles(cars: Vehicle[], sort: string): Vehicle[] {
  const c = [...cars];
  switch (sort) {
    case "price-asc": return c.sort((a, b) => a.price - b.price);
    case "price-desc": return c.sort((a, b) => b.price - a.price);
    case "mileage-asc": return c.sort((a, b) => a.mileage - b.mileage);
    case "year-desc": return c.sort((a, b) => b.year - a.year);
    default: return c;
  }
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ style?: string; sort?: string }>;
}) {
  const { style, sort = "default" } = await searchParams;

  const [allCars, styleCounts] = await Promise.all([
    getVehiclesByFilter(style),
    getBodyStyleCounts(),
  ]);

  const cars = sortVehicles(allCars, sort);
  const totalAll = styleCounts.reduce((sum, s) => sum + s.count, 0);

  return (
    <>
      <Navbar />
      <PromoBanner />
      <div className="bg-[#F5F5F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-400">
            <Link href="/" className="text-[#1d4ed8] hover:underline">GubMotors</Link>
            {" / "}
            <span>Inventory{style ? ` / ${style}s` : ""}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Filter tabs by body style */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/inventory"
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                !style
                  ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
              }`}
            >
              All ({totalAll})
            </Link>
            {styleCounts.map(({ bodyStyle, count }) => (
              <Link
                key={bodyStyle}
                href={`/inventory?style=${encodeURIComponent(bodyStyle)}${sort !== "default" ? `&sort=${sort}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  style === bodyStyle
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                }`}
              >
                {bodyStyle}s ({count})
              </Link>
            ))}
          </div>

          {/* Top bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl font-bold text-black">
              {cars.length} {style ? `${style}s` : "vehicles"} available{style ? "" : " in Bucks County & Philadelphia"}
            </h1>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-600">
              <span>Sort:</span>
              <select
                className="bg-transparent font-semibold focus:outline-none"
                defaultValue={sort}
                onChange={undefined}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-3xl mb-4">🚗</p>
              <p className="text-xl font-semibold">No {style ? `${style}s` : "vehicles"} in inventory yet.</p>
              <Link href="/inventory" className="inline-block mt-4 text-[#1d4ed8] hover:underline text-sm">
                View all inventory →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cars.map((car) => <VehicleCard key={car._id} car={car} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

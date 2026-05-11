import Link from "next/link";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { getAllVehicles, type Vehicle } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

function formatPrice(n: number) { return "$" + n.toLocaleString(); }
function formatMileage(n: number) { return n.toLocaleString(); }
function estimateMonthly(price: number) {
  // 72 months @ 7.9% APR rough estimate
  const r = 0.079 / 12;
  const n = 72;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -n)));
}

function VehicleCard({ car }: { car: Vehicle }) {
  const imgSrc =
    car.images && car.images.length > 0
      ? urlBuilder.image(car.images[0]).width(600).height(400).url()
      : `https://placehold.co/600x400/1a1a1a/444?text=${car.year}+${encodeURIComponent(car.make)}`;

  const slug = car.slug?.current || car._id;

  return (
    <Link href={`/inventory/${slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
        {/* Photo */}
        <div className="relative overflow-hidden bg-[#1a1a1a]" style={{ aspectRatio: "16/10" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {car.status === "Pending" && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Sale Pending</div>
          )}
          {car.status === "Sold" && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Sold</div>
          )}
          {car.featured && car.status === "Available" && (
            <div className="absolute top-2 left-2 bg-[#FFC107] text-black text-xs font-bold px-2 py-0.5 rounded uppercase">Featured</div>
          )}
          {/* Photo count */}
          {car.images && car.images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
              📷 {car.images.length} photos
            </div>
          )}
          {/* Favorite placeholder */}
          <div className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-sm">♡</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          {car.stockNumber && (
            <p className="text-xs text-gray-400 mb-1">Stock # {car.stockNumber}</p>
          )}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-base text-black leading-snug">
              {car.year} {car.make} {car.model}
            </h3>
            <span className="text-gray-300 text-sm ml-2">♡</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{car.trim || car.bodyStyle || "—"}</span>
            <span>{formatMileage(car.mileage)} mi</span>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Amount financed</p>
              <p className="text-xl font-black text-black">{formatPrice(car.price)}</p>
              <p className="text-xs text-gray-400 mt-0.5">~${estimateMonthly(car.price)}/mo est.</p>
            </div>
            <span className="bg-[#FFC107] hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded uppercase tracking-wide transition-colors">
              Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function InventoryPage() {
  const cars = await getAllVehicles();

  return (
    <>
      <Navbar />
      <PromoBanner />
      <div className="bg-[#F5F5F5] min-h-screen">
        {/* Page header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <p className="text-sm text-gray-400">
              <Link href="/" className="text-[#c9a000] hover:underline">GubAutos</Link>
              {" / "}
              <span>Inventory</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black">{cars.length} vehicles available in Freehold, NJ</h1>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="bg-transparent font-semibold focus:outline-none">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Mileage: Low to High</option>
                <option>Year: Newest First</option>
              </select>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">🚗</p>
              <p className="text-xl font-semibold">Inventory coming soon!</p>
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

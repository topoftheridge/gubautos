import { getAllVehicles, type Vehicle } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}
function formatMileage(n: number) {
  return n.toLocaleString();
}

function CarCard({ car }: { car: Vehicle }) {
  const imgSrc =
    car.images && car.images.length > 0
      ? urlBuilder.image(car.images[0]).width(600).height(380).url()
      : `https://placehold.co/600x380/222/444?text=${car.year}+${encodeURIComponent(car.make)}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group cursor-pointer">
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {car.drivetrain && (
          <div className="absolute top-2 left-2 bg-[#FFC107] text-black text-xs font-bold px-2 py-0.5 rounded">
            {car.drivetrain}
          </div>
        )}
        {car.featured && (
          <div className="absolute top-2 right-2 bg-black text-[#FFC107] text-xs font-bold px-2 py-0.5 rounded">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{car.year}</p>
        <h3 className="font-bold text-base text-black leading-snug mb-1">
          {car.make} {car.model}{car.trim ? ` ${car.trim}` : ""}
        </h3>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>🏎 {formatMileage(car.mileage)} mi</span>
          {car.mpgCity && car.mpgHwy && <span>⛽ {car.mpgCity}/{car.mpgHwy} MPG</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xl font-black text-black">{formatPrice(car.price)}</div>
          <button className="bg-[#FFC107] hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded transition-colors uppercase tracking-wide">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function FeaturedInventory() {
  const cars = await getAllVehicles();

  if (cars.length === 0) {
    return (
      <section id="inventory" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 py-20">
          <p className="text-4xl mb-4">🚗</p>
          <p className="text-xl font-semibold">Inventory coming soon — check back shortly!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inventory" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Our Inventory</h2>
            <div className="h-1 w-32 bg-[#FFC107] rounded" />
          </div>
          <span className="text-sm text-gray-400 hidden md:block">{cars.length} vehicle{cars.length !== 1 ? "s" : ""} available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}

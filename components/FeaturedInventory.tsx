import { getFeaturedVehicles, type Vehicle } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

// Fallback placeholder cars shown when Sanity has no featured vehicles yet
const PLACEHOLDER_CARS = [
  { _id: "p1", year: 2021, make: "Toyota", model: "Camry SE", price: 18995, mileage: 34200, drivetrain: "FWD", mpgCity: 28, mpgHwy: 39, images: null },
  { _id: "p2", year: 2020, make: "Honda", model: "CR-V AWD EX", price: 22500, mileage: 41800, drivetrain: "AWD", mpgCity: 27, mpgHwy: 32, images: null },
  { _id: "p3", year: 2019, make: "Ford", model: "F-150 XLT", price: 27800, mileage: 58100, drivetrain: "4WD", mpgCity: 18, mpgHwy: 24, images: null },
  { _id: "p4", year: 2022, make: "Chevrolet", model: "Malibu LT", price: 17200, mileage: 22400, drivetrain: "FWD", mpgCity: 29, mpgHwy: 36, images: null },
  { _id: "p5", year: 2020, make: "Jeep", model: "Grand Cherokee", price: 26900, mileage: 47600, drivetrain: "4WD", mpgCity: 18, mpgHwy: 25, images: null },
  { _id: "p6", year: 2021, make: "Nissan", model: "Altima SR", price: 16750, mileage: 29900, drivetrain: "FWD", mpgCity: 27, mpgHwy: 38, images: null },
  { _id: "p7", year: 2019, make: "BMW", model: "X5 xDrive40i", price: 34500, mileage: 52300, drivetrain: "AWD", mpgCity: 20, mpgHwy: 26, images: null },
  { _id: "p8", year: 2020, make: "Hyundai", model: "Tucson SEL", price: 19400, mileage: 38700, drivetrain: "AWD", mpgCity: 23, mpgHwy: 28, images: null },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}
function formatMileage(n: number) {
  return n.toLocaleString();
}

function CarCard({ car }: { car: Vehicle | typeof PLACEHOLDER_CARS[0] }) {
  const imgSrc =
    "images" in car && car.images && car.images.length > 0
      ? urlBuilder.image(car.images[0]).width(600).height(380).url()
      : `https://placehold.co/600x380/222/444?text=${car.year}+${car.make}`;

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
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{car.year}</p>
        <h3 className="font-bold text-base text-black leading-snug mb-1">
          {car.make} {car.model}{"trim" in car && car.trim ? ` ${car.trim}` : ""}
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
  let cars: (Vehicle | typeof PLACEHOLDER_CARS[0])[] = [];

  try {
    const live = await getFeaturedVehicles();
    cars = live.length > 0 ? live : PLACEHOLDER_CARS;
  } catch {
    cars = PLACEHOLDER_CARS;
  }

  return (
    <section id="inventory" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">Featured Inventory</h2>
            <div className="h-1 w-32 bg-[#FFC107] rounded" />
          </div>
          <a href="#inventory" className="text-sm font-semibold text-[#c9a000] hover:underline hidden md:block">
            View All Vehicles →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <a href="#" className="inline-block border-2 border-[#FFC107] text-[#c9a000] font-bold px-10 py-3 rounded-lg hover:bg-[#FFC107] hover:text-black transition-colors">
            View All Inventory →
          </a>
        </div>
      </div>
    </section>
  );
}

const cars = [
  { year: 2021, make: "Toyota", model: "Camry SE", price: "$18,995", mileage: "34,200", mpg: "32 MPG", drive: "FWD", img: "https://placehold.co/600x380/222/444?text=2021+Toyota+Camry" },
  { year: 2020, make: "Honda", model: "CR-V AWD EX", price: "$22,500", mileage: "41,800", mpg: "30 MPG", drive: "AWD", img: "https://placehold.co/600x380/222/444?text=2020+Honda+CR-V" },
  { year: 2019, make: "Ford", model: "F-150 XLT", price: "$27,800", mileage: "58,100", mpg: "20 MPG", drive: "4WD", img: "https://placehold.co/600x380/222/444?text=2019+Ford+F-150" },
  { year: 2022, make: "Chevrolet", model: "Malibu LT", price: "$17,200", mileage: "22,400", mpg: "35 MPG", drive: "FWD", img: "https://placehold.co/600x380/222/444?text=2022+Chevy+Malibu" },
  { year: 2020, make: "Jeep", model: "Grand Cherokee", price: "$26,900", mileage: "47,600", mpg: "22 MPG", drive: "4WD", img: "https://placehold.co/600x380/222/444?text=2020+Jeep+Grand+Cherokee" },
  { year: 2021, make: "Nissan", model: "Altima SR", price: "$16,750", mileage: "29,900", mpg: "34 MPG", drive: "FWD", img: "https://placehold.co/600x380/222/444?text=2021+Nissan+Altima" },
  { year: 2019, make: "BMW", model: "X5 xDrive40i", price: "$34,500", mileage: "52,300", mpg: "24 MPG", drive: "AWD", img: "https://placehold.co/600x380/222/444?text=2019+BMW+X5" },
  { year: 2020, make: "Hyundai", model: "Tucson SEL", price: "$19,400", mileage: "38,700", mpg: "28 MPG", drive: "AWD", img: "https://placehold.co/600x380/222/444?text=2020+Hyundai+Tucson" },
];

export default function FeaturedInventory() {
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
            <div
              key={`${car.year}-${car.make}-${car.model}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.img}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#FFC107] text-black text-xs font-bold px-2 py-0.5 rounded">
                  {car.drive}
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{car.year}</p>
                <h3 className="font-bold text-base text-black leading-snug mb-1">
                  {car.make} {car.model}
                </h3>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>🏎 {car.mileage} mi</span>
                  <span>⛽ {car.mpg}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-xl font-black text-black">{car.price}</div>
                  <button className="bg-[#FFC107] hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded transition-colors uppercase tracking-wide">
                    View
                  </button>
                </div>
              </div>
            </div>
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

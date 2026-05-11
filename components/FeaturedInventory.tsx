const cars = [
  {
    year: 2021,
    make: "Toyota",
    model: "Camry SE",
    price: "$18,995",
    mileage: "34,200",
    transmission: "Automatic",
    color: "Midnight Black",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2021+Toyota+Camry",
  },
  {
    year: 2020,
    make: "Honda",
    model: "CR-V AWD",
    price: "$22,500",
    mileage: "41,800",
    transmission: "CVT",
    color: "Platinum White",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2020+Honda+CR-V",
  },
  {
    year: 2019,
    make: "Ford",
    model: "F-150 XLT",
    price: "$27,800",
    mileage: "58,100",
    transmission: "Automatic",
    color: "Race Red",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2019+Ford+F-150",
  },
  {
    year: 2022,
    make: "Chevrolet",
    model: "Malibu LT",
    price: "$17,200",
    mileage: "22,400",
    transmission: "Automatic",
    color: "Summit White",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2022+Chevy+Malibu",
  },
  {
    year: 2020,
    make: "Jeep",
    model: "Grand Cherokee 4WD",
    price: "$26,900",
    mileage: "47,600",
    transmission: "Automatic",
    color: "Granite Crystal",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2020+Jeep+Grand+Cherokee",
  },
  {
    year: 2021,
    make: "Nissan",
    model: "Altima SR",
    price: "$16,750",
    mileage: "29,900",
    transmission: "CVT",
    color: "Gun Metallic",
    img: "https://placehold.co/600x400/1a1a1a/cc0000?text=2021+Nissan+Altima",
  },
];

export default function FeaturedInventory() {
  return (
    <section id="inventory" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">Browse Our Lot</p>
          <h2 className="text-4xl font-black text-black">Featured Inventory</h2>
          <p className="text-gray-500 mt-3 text-lg">Every vehicle inspected and ready to roll.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={`${car.year}-${car.make}-${car.model}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.img}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  FOR SALE
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-lg text-black">{car.year} {car.make} {car.model}</h3>
                    <p className="text-gray-500 text-sm">{car.color}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-600 font-black text-xl">{car.price}</div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mt-3 border-t pt-3">
                  <span>🏎 {car.mileage} mi</span>
                  <span>⚙️ {car.transmission}</span>
                </div>
                <button className="mt-4 w-full bg-black hover:bg-red-600 text-white font-bold py-2 rounded transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold px-10 py-3 rounded text-lg transition-colors">
            View All Inventory →
          </button>
        </div>
      </div>
    </section>
  );
}

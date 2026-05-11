export default function Hero() {
  return (
    <section
      className="relative bg-black text-white min-h-[90vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.4)), url('https://placehold.co/1600x900/1a1a1a/333333?text=GubAutos')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-4">
            New Jersey&apos;s Trusted Used Car Dealer
          </p>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Drive Home <span className="text-red-500">Today.</span>
            <br />No Hassle. No Stress.
          </h1>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            GubAutos has 200+ quality pre-owned vehicles ready for you. Fast approvals,
            flexible financing, and zero runaround — regardless of your credit history.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#inventory"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded text-lg text-center transition-colors"
            >
              Browse Inventory
            </a>
            <a
              href="#financing"
              className="border-2 border-white hover:border-red-500 hover:text-red-500 text-white font-bold px-8 py-4 rounded text-lg text-center transition-colors"
            >
              Get Pre-Approved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-white"
      style={{
        minHeight: "560px",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.48), rgba(0,0,0,0.48)), url('https://placehold.co/1600x700/1a1a1a/333?text=Quality+Used+Cars')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold italic leading-tight mb-5" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          Your trusted source for quality used cars in Freehold, NJ
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-10 text-white/90">
          Explore a diverse range of pre-owned vehicles
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            placeholder="Search by make, model, or feature..."
            className="w-full h-14 pl-12 pr-36 rounded-lg text-gray-800 text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFC107] hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded text-sm uppercase tracking-wide transition-colors">
            Search
          </button>
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["SUVs", "Sedans", "Trucks", "Under $15K", "AWD/4WD", "Luxury"].map((tag) => (
            <button
              key={tag}
              className="bg-white/15 hover:bg-[#FFC107] hover:text-black text-white border border-white/30 hover:border-[#FFC107] text-sm px-4 py-1.5 rounded-full transition-all font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

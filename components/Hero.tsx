export default function Hero() {
  return (
    <section
      className="relative flex items-center justify-center text-white"
      style={{
        minHeight: "560px",
        backgroundImage: `linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.65)), url('https://placehold.co/1600x700/0f172a/1e3a8a?text=GubMotors')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-bold italic leading-tight mb-5" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
          Your trusted source for quality used cars in Freehold, NJ
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-10 text-white/80">
          Explore a diverse range of pre-owned vehicles
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by make, model, or feature..."
            className="w-full h-14 pl-12 pr-36 rounded-lg text-gray-800 text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded text-sm uppercase tracking-wide transition-colors">
            Search
          </button>
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["SUVs", "Sedans", "Trucks", "Under $15K", "AWD / 4WD", "Luxury"].map((tag) => (
            <a key={tag} href="/inventory"
              className="bg-white/10 hover:bg-[#1E3A8A] text-white border border-white/30 hover:border-[#1E3A8A] text-sm px-4 py-1.5 rounded-full transition-all font-medium">
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

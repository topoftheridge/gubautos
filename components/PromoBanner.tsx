export default function PromoBanner() {
  return (
    <div className="bg-[#FFC107] py-3">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4">
        <span className="text-2xl">🏅</span>
        <p className="text-black font-bold uppercase text-sm tracking-wide">
          Get Pre-Approved With No Impact To Your Credit Score!
        </p>
        <a
          href="#financing"
          className="bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-2 rounded hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

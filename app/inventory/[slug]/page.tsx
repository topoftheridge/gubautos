import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

function formatPrice(n: number) { return "$" + n.toLocaleString(); }
function formatMileage(n: number) { return n.toLocaleString(); }
function estimateMonthly(price: number) {
  const r = 0.079 / 12;
  const n = 72;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -n)));
}

export async function generateStaticParams() {
  const slugs = await getAllVehicleSlugs();
  return slugs.filter(s => s.slug?.current).map(s => ({ slug: s.slug.current }));
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getVehicleBySlug(slug);
  if (!car) notFound();

  const images = car.images && car.images.length > 0 ? car.images : null;
  const mainImg = images
    ? urlBuilder.image(images[0]).width(1200).height(750).url()
    : `https://placehold.co/1200x750/1a1a1a/444?text=${car.year}+${encodeURIComponent(car.make)}`;

  const thumbs = images ? images.map(img => urlBuilder.image(img).width(160).height(120).url()) : [];
  const monthly = estimateMonthly(car.price);

  const specs = [
    { label: "Mileage", value: car.mileage ? formatMileage(car.mileage) + " mi" : null },
    { label: "Transmission", value: car.transmission },
    { label: "Drivetrain", value: car.drivetrain },
    { label: "Engine", value: car.engine },
    { label: "Fuel Type", value: car.fuelType },
    { label: "MPG", value: car.mpgCity && car.mpgHwy ? `${car.mpgCity} City / ${car.mpgHwy} Hwy` : null },
  ].filter(s => s.value);

  const details = [
    { label: "Body Style", value: car.bodyStyle },
    { label: "Exterior Color", value: car.exteriorColor },
    { label: "Interior Color", value: car.interiorColor },
    { label: "Engine", value: car.engine },
    { label: "Cylinders", value: car.cylinders?.toString() },
    { label: "Transmission", value: car.transmission },
    { label: "Drivetrain", value: car.drivetrain },
    { label: "Fuel Type", value: car.fuelType },
    { label: "MPG City", value: car.mpgCity?.toString() },
    { label: "MPG Highway", value: car.mpgHwy?.toString() },
    { label: "Doors", value: car.doors?.toString() },
    { label: "Mileage", value: car.mileage ? formatMileage(car.mileage) + " mi" : null },
    { label: "VIN", value: car.vin },
    { label: "Stock #", value: car.stockNumber },
    { label: "Status", value: car.status },
  ].filter(d => d.value);

  return (
    <>
      <Navbar />
      <PromoBanner />

      <div className="bg-[#F5F5F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-400">
            <Link href="/" className="text-[#c9a000] hover:underline">GubAutos</Link>
            {" / "}
            <Link href="/inventory" className="text-[#c9a000] hover:underline">Inventory</Link>
            {" / "}
            <span>{car.year} {car.make} {car.model}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 min-w-0">

              {/* Gallery */}
              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mainImg} alt={`${car.year} ${car.make} ${car.model}`} className="w-full object-cover" style={{ maxHeight: 480 }} />
              </div>

              {/* Thumbnails */}
              {thumbs.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {thumbs.map((t, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={t} alt={`Photo ${i + 1}`}
                      className="w-20 h-14 object-cover rounded border-2 border-transparent hover:border-[#FFC107] cursor-pointer shrink-0 transition-colors" />
                  ))}
                </div>
              )}

              {/* Title */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-[#FFC107] text-black text-xs font-bold px-2 py-0.5 rounded uppercase">
                    {car.status === "Available" ? "Pre-Owned" : car.status}
                  </span>
                  {car.stockNumber && <span className="text-sm text-gray-400">Stock # {car.stockNumber}</span>}
                </div>
                <h1 className="text-3xl font-black text-black leading-tight">
                  {car.year} {car.make} {car.model} {car.trim}
                </h1>

                {/* Key specs pills */}
                {specs.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {specs.map(s => (
                      <div key={s.label} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">{s.label}</span>
                        <span className="text-black font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle Details Table */}
              {details.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Vehicle Information</h2>
                  <div className="h-1 w-16 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {details.map((d, i) => (
                      <div key={d.label} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100 last:border-0`}>
                        <span className="font-semibold text-gray-600">{d.label}</span>
                        <span className="text-black font-medium">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Features & Options</h2>
                  <div className="h-1 w-16 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {car.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-[#FFC107] font-bold">✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {car.description && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Description</h2>
                  <div className="h-1 w-16 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* Price Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Amount Financed</p>
                  <p className="text-4xl font-black text-black mb-1">{formatPrice(car.price)}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Est. <span className="font-bold text-black">${monthly}/mo</span> · 72 mo @ 7.9% APR
                    <br /><span className="text-xs">Estimate only — actual terms may vary</span>
                  </p>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <a
                      href="tel:+17325550192"
                      className="flex items-center justify-center gap-2 w-full bg-[#FFC107] hover:bg-yellow-400 text-black font-bold py-3.5 rounded-lg text-base transition-colors"
                    >
                      📞 Call (732) 555-0192
                    </a>
                    <a
                      href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 rounded-lg text-base transition-colors"
                    >
                      ✉️ Send a Message
                    </a>
                    <a
                      href="#financing"
                      className="flex items-center justify-center gap-2 w-full border-2 border-black hover:bg-gray-50 text-black font-bold py-3.5 rounded-lg text-base transition-colors"
                    >
                      💳 Apply for Financing
                    </a>
                  </div>
                </div>

                {/* Financing calculator teaser */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 text-white">
                  <h3 className="font-bold text-base mb-1">All Credit Welcome</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Bad credit, no credit, first-time buyer — we work with 40+ lenders to get you approved.
                  </p>
                  <a href="#financing" className="block text-center bg-[#FFC107] hover:bg-yellow-400 text-black font-bold py-2.5 rounded-lg text-sm transition-colors">
                    Pre-Qualify Now — Free
                  </a>
                </div>

                {/* Dealer info */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#FFC107] bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <span className="text-[#FFC107] font-black text-xs">GA</span>
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">GubAutos</p>
                      <p className="text-gray-400 text-xs">Freehold, NJ</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-gray-600 text-xs">
                    <p>📍 482 Rt-9 South, Freehold, NJ 07728</p>
                    <p>🕐 Mon–Fri 9AM–7PM · Sat 9AM–6PM · Sun 11AM–4PM</p>
                    <p>⭐⭐⭐⭐⭐ 500+ Reviews</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Contact form section */}
        <div id="contact-form" className="bg-[#1a1a1a] py-16 mt-8">
          <div className="max-w-2xl mx-auto px-6 text-white text-center">
            <h2 className="text-3xl font-black mb-2">Interested in this vehicle?</h2>
            <div className="h-1 w-16 bg-[#FFC107] rounded mx-auto mb-6" />
            <p className="text-gray-400 mb-8">Fill out the form and we&apos;ll be in touch within the hour.</p>
            <form className="space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">First Name</label>
                  <input type="text" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Last Name</label>
                  <input type="text" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Phone</label>
                <input type="tel" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Email</label>
                <input type="email" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Message</label>
                <textarea rows={3} className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107] resize-none" defaultValue={`I'm interested in the ${car.year} ${car.make} ${car.model}. Please contact me.`} />
              </div>
              <button type="submit" className="w-full bg-[#FFC107] hover:bg-yellow-400 text-black font-black py-4 rounded-lg text-base transition-colors uppercase tracking-wide">
                Send Message
              </button>
              <p className="text-center text-xs text-gray-500">By submitting you agree to be contacted by GubAutos regarding this vehicle.</p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

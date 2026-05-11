"use client";
import { use } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";
import type { Vehicle } from "@/sanity/queries";

function formatPrice(n: number) { return "$" + n.toLocaleString(); }
function formatMileage(n: number) { return n.toLocaleString(); }
function estimateMonthly(price: number) {
  const r = 0.079 / 12;
  const n = 72;
  return Math.round((price * r) / (1 - Math.pow(1 + r, -n)));
}

function VehicleDetail({ car }: { car: Vehicle }) {
  const images = car.images && car.images.length > 0 ? car.images : null;
  const allImgUrls = images
    ? images.map(img => urlBuilder.image(img).width(1200).height(800).url())
    : [`https://placehold.co/1200x800/1a1a1a/444?text=${car.year}+${encodeURIComponent(car.make)}`];
  const thumbUrls = images
    ? images.map(img => urlBuilder.image(img).width(160).height(120).url())
    : [allImgUrls[0]];

  const [activeIdx, setActiveIdx] = useState(0);

  const amountFinanced = car.cashDiscount ? car.price - car.cashDiscount : car.price;
  const monthly = estimateMonthly(amountFinanced);

  const specs = [
    { icon: "🏎", label: "Mileage", value: car.mileage ? formatMileage(car.mileage) + " mi" : null },
    { icon: "⛽", label: "Fuel", value: car.fuelType },
    { icon: "⚙️", label: "Transmission", value: car.transmission },
    { icon: "🛞", label: "Drivetrain", value: car.drivetrain },
    { icon: "🔧", label: "Engine", value: car.engine },
    { icon: "📍", label: "MPG", value: car.mpgCity && car.mpgHwy ? `${car.mpgCity} City / ${car.mpgHwy} Hwy` : null },
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
            <span>Used {car.year} {car.make} {car.model}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 min-w-0">

              {/* Photo Gallery: main image + vertical thumbnail strip */}
              <div className="flex gap-3">
                {/* Main image */}
                <div className="flex-1 bg-[#1a1a1a] rounded-xl overflow-hidden relative" style={{ minHeight: 380 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={allImgUrls[activeIdx]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: 480 }}
                  />
                  {/* Arrow prev */}
                  {allImgUrls.length > 1 && (
                    <>
                      <button onClick={() => setActiveIdx(i => (i - 1 + allImgUrls.length) % allImgUrls.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors">
                        ‹
                      </button>
                      <button onClick={() => setActiveIdx(i => (i + 1) % allImgUrls.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg transition-colors">
                        ›
                      </button>
                    </>
                  )}
                  {/* Photo count */}
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                    📷 {activeIdx + 1} / {allImgUrls.length}
                  </div>
                </div>

                {/* Vertical thumbnail strip */}
                {thumbUrls.length > 1 && (
                  <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 480, width: 100 }}>
                    {thumbUrls.map((t, i) => (
                      <div key={i} onClick={() => setActiveIdx(i)} className="relative shrink-0 cursor-pointer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t} alt={`Photo ${i + 1}`}
                          className={`w-full h-16 object-cover rounded-lg border-2 transition-all ${activeIdx === i ? "border-[#FFC107]" : "border-transparent opacity-60 hover:opacity-90"}`} />
                        {/* +N more overlay on last visible thumb if there are many */}
                        {i === 3 && thumbUrls.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            +{thumbUrls.length - 4} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle title */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#FFC107] text-black text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">Used</span>
                  {car.stockNumber && <span className="text-sm text-gray-400">Stock # {car.stockNumber}</span>}
                  {car.vin && <span className="text-sm text-gray-400 hidden sm:inline">VIN: {car.vin}</span>}
                </div>
                <h1 className="text-3xl font-black text-black leading-tight">
                  {car.year} {car.make} {car.model}{car.trim ? ` ${car.trim}` : ""}
                </h1>
              </div>

              {/* Key specs row */}
              {specs.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-5 py-4 border-y border-gray-200">
                  {specs.map(s => (
                    <div key={s.label} className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{s.icon}</span>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide leading-none">{s.label}</p>
                        <p className="font-bold text-black">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Vehicle Details Table */}
              {details.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Vehicle Information</h2>
                  <div className="h-1 w-14 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {details.map((d, i) => (
                        <div key={d.label} className={`flex justify-between px-5 py-3 text-sm border-b border-gray-100 ${i % 4 < 2 ? "bg-white" : "bg-gray-50"}`}>
                          <span className="font-semibold text-gray-500">{d.label}</span>
                          <span className="text-black font-medium text-right ml-4">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Features & Options</h2>
                  <div className="h-1 w-14 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      {car.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-[#FFC107] font-black">✓</span>
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
                  <div className="h-1 w-14 bg-[#FFC107] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <div id="contact-form" className="mt-8 bg-[#1a1a1a] rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-black mb-1">Interested in this vehicle?</h2>
                <div className="h-1 w-14 bg-[#FFC107] rounded mb-5" />
                <p className="text-gray-400 text-sm mb-6">Fill out the form and we&apos;ll get back to you within the hour.</p>
                <form className="space-y-4">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Phone</label>
                      <input type="tel" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="(555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Email</label>
                      <input type="email" className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107]" placeholder="john@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Message</label>
                    <textarea rows={3} className="w-full bg-[#222] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFC107] resize-none"
                      defaultValue={`I'm interested in the ${car.year} ${car.make} ${car.model}. Please contact me.`} />
                  </div>
                  <button type="submit" className="w-full bg-[#FFC107] hover:bg-yellow-400 text-black font-black py-4 rounded-lg text-base transition-colors uppercase tracking-wide">
                    Send Message
                  </button>
                  <p className="text-center text-xs text-gray-500">By submitting you agree to be contacted by GubAutos.</p>
                </form>
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* Price Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Amount Financed</p>
                  <p className="text-4xl font-black text-black mb-1">{formatPrice(amountFinanced)}</p>

                  {/* Estimated payment */}
                  <div className="flex items-center justify-between bg-black text-white rounded-lg px-4 py-2.5 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wide">Estimated Payment</span>
                    <span className="font-black text-lg">${monthly}<span className="text-sm font-normal">/mo.</span></span>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price</span>
                      <span className="font-semibold text-black">{formatPrice(car.price)}</span>
                    </div>
                    {car.cashDiscount && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">ℹ️ Cash / trade-in credit</span>
                        <span className="font-semibold text-red-500">-{formatPrice(car.cashDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-gray-100 pt-2">
                      <span className="font-bold text-black">ℹ️ Amount financed</span>
                      <span className="font-black text-black">{formatPrice(amountFinanced)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">72 mo @ 7.9% APR · Estimate only</p>
                  </div>

                  {/* Dealer location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-5 pb-4 border-b border-gray-100">
                    <span className="text-[#FFC107]">📍</span>
                    <span>482 Rt-9 South, Freehold, NJ</span>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <a href="tel:+17325550192"
                      className="flex items-center justify-center gap-2 w-full bg-[#FFC107] hover:bg-yellow-400 text-black font-bold py-3.5 rounded-lg text-sm transition-colors uppercase tracking-wide">
                      🔓 Unlock Manager&apos;s Special
                    </a>
                    <a href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-[#FFC107] bg-white text-black font-bold py-3.5 rounded-lg text-sm transition-colors">
                      ✅ Get Approved
                    </a>
                    <a href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-[#FFC107] bg-white text-black font-bold py-3.5 rounded-lg text-sm transition-colors">
                      🚗 Schedule a Test Drive
                    </a>
                  </div>
                </div>

                {/* Financing teaser */}
                <div className="bg-[#1a1a1a] rounded-xl p-5 text-white">
                  <h3 className="font-bold text-sm mb-2">All Credit Welcome</h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                    Bad credit, no credit, first-time buyer — 40+ lenders competing for your business.
                  </p>
                  <a href="#contact-form" className="block text-center bg-[#FFC107] hover:bg-yellow-400 text-black font-bold py-2.5 rounded-lg text-sm transition-colors">
                    Pre-Qualify — It&apos;s Free
                  </a>
                </div>

                {/* Dealer card */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full border-2 border-[#FFC107] bg-[#1a1a1a] flex items-center justify-center shrink-0">
                      <span className="text-[#FFC107] font-black text-xs">GA</span>
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">GubAutos</p>
                      <p className="text-gray-400 text-xs">Freehold, NJ · ⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-gray-600 text-xs">
                    <p>📍 482 Rt-9 South, Freehold, NJ 07728</p>
                    <p>📞 <a href="tel:+17325550192" className="hover:text-[#c9a000]">(732) 555-0192</a></p>
                    <p>🕐 Mon–Fri 9AM–7PM · Sat 9AM–6PM · Sun 11AM–4PM</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [car, setCar] = useState<Vehicle | null | undefined>(undefined);

  useEffect(() => {
    getVehicleBySlug(slug).then(setCar);
  }, [slug]);

  if (car === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center text-gray-400">
          <div className="text-5xl mb-4 animate-pulse">🚗</div>
          <p className="font-semibold">Loading vehicle...</p>
        </div>
      </div>
    );
  }

  if (car === null) {
    notFound();
  }

  return <VehicleDetail car={car} />;
}

"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { getVehicleBySlug } from "@/sanity/queries";
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

  // Key specs row
  const specs = [
    { label: "Mileage", value: car.mileage ? formatMileage(car.mileage) + " mi" : null },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Transmission", value: car.transmission },
    { label: "Drivetrain", value: car.drivetrain },
    { label: "Engine", value: car.engine },
    { label: "MPG", value: car.mpgCity && car.mpgHwy ? `${car.mpgCity} City / ${car.mpgHwy} Hwy` : null },
  ].filter(s => s.value);

  // Full details table — all fields
  const details = [
    { label: "Condition", value: car.condition },
    { label: "Body Type", value: car.bodyStyle },
    { label: "Trim", value: car.trim },
    { label: "Stock #", value: car.stockNumber },
    { label: "VIN", value: car.vin },
    { label: "Exterior Color", value: car.exteriorColor },
    { label: "Interior Color", value: car.interiorColor },
    { label: "Passengers", value: car.passengers?.toString() },
    { label: "Drivetrain", value: car.drivetrain },
    { label: "Engine", value: car.engine },
    { label: "Horsepower", value: car.horsepower },
    { label: "Torque", value: car.torque },
    { label: "Cylinders", value: car.cylinders?.toString() },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Fuel Capacity", value: car.fuelCapacity },
    { label: "Fuel Economy", value: car.mpgCity && car.mpgHwy ? `${car.mpgCity} City / ${car.mpgHwy} Hwy` : null },
    { label: "Mileage", value: car.mileage ? formatMileage(car.mileage) + " mi" : null },
    { label: "Doors", value: car.doors?.toString() },
    { label: "GVWR", value: car.gvwr },
    { label: "Dimensions", value: car.dimensions },
    { label: "Wheelbase", value: car.wheelbase },
    { label: "Front Wheel", value: car.frontWheel },
    { label: "Rear Wheel", value: car.rearWheel },
    { label: "Front Tire", value: car.frontTire },
    { label: "Rear Tire", value: car.rearTire },
  ].filter(d => d.value);

  return (
    <>
      <Navbar />
      <PromoBanner />

      <div className="bg-[#F5F5F5] min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-400">
            <Link href="/" className="text-[#1d4ed8] hover:underline">GubMotors</Link>
            {" / "}
            <Link href="/inventory" className="text-[#1d4ed8] hover:underline">Inventory</Link>
            {" / "}
            <span>Used {car.year} {car.make} {car.model}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT COLUMN */}
            <div className="flex-1 min-w-0">

              {/* Gallery: main image + vertical strip */}
              <div className="flex gap-3">
                <div className="flex-1 bg-[#0f172a] rounded-xl overflow-hidden relative" style={{ minHeight: 380 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={allImgUrls[activeIdx]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: 480 }}
                  />
                  {allImgUrls.length > 1 && (
                    <>
                      <button onClick={() => setActiveIdx(i => (i - 1 + allImgUrls.length) % allImgUrls.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl transition-colors">
                        ‹
                      </button>
                      <button onClick={() => setActiveIdx(i => (i + 1) % allImgUrls.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl transition-colors">
                        ›
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
                    {activeIdx + 1} / {allImgUrls.length} photos
                  </div>
                </div>

                {/* Vertical thumbnails */}
                {thumbUrls.length > 1 && (
                  <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 480, width: 96 }}>
                    {thumbUrls.map((t, i) => (
                      <div key={i} onClick={() => setActiveIdx(i)} className="relative shrink-0 cursor-pointer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t} alt={`Photo ${i + 1}`}
                          className={`w-full h-16 object-cover rounded-lg border-2 transition-all ${activeIdx === i ? "border-[#1E3A8A] opacity-100" : "border-transparent opacity-55 hover:opacity-80"}`} />
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

              {/* Title */}
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-[#1E3A8A] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                    {car.condition || "Pre-Owned"}
                  </span>
                  {car.stockNumber && <span className="text-sm text-gray-400">Stock # {car.stockNumber}</span>}
                </div>
                <h1 className="text-3xl font-black text-black leading-tight">
                  {car.year} {car.make} {car.model}{car.trim ? ` ${car.trim}` : ""}
                </h1>
              </div>

              {/* Key specs row */}
              {specs.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-5 py-4 border-y border-gray-200">
                  {specs.map(s => (
                    <div key={s.label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</p>
                      <p className="font-bold text-black text-sm">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Vehicle Information Table */}
              {details.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-black mb-1">Vehicle Information</h2>
                  <div className="h-1 w-14 bg-[#1E3A8A] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {details.map((d, i) => (
                        <div key={d.label}
                          className={`flex justify-between px-5 py-3 text-sm border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                          <span className="font-semibold text-gray-500 shrink-0 mr-4">{d.label}</span>
                          <span className="text-black font-medium text-right">{d.value}</span>
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
                  <div className="h-1 w-14 bg-[#1E3A8A] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      {car.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-[#1E3A8A] font-black text-base">&#10003;</span>
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
                  <div className="h-1 w-14 bg-[#1E3A8A] rounded mb-4" />
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{car.description}</p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <div id="contact-form" className="mt-8 bg-[#0f172a] rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-black mb-1">Interested in this vehicle?</h2>
                <div className="h-1 w-14 bg-[#1E3A8A] rounded mb-5" />
                <p className="text-gray-400 text-sm mb-6">Fill out the form and we&apos;ll get back to you within the hour.</p>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">First Name</label>
                      <input type="text" className="w-full bg-[#1e3a5f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1E3A8A]" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Last Name</label>
                      <input type="text" className="w-full bg-[#1e3a5f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1E3A8A]" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Phone</label>
                      <input type="tel" className="w-full bg-[#1e3a5f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1E3A8A]" placeholder="(555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Email</label>
                      <input type="email" className="w-full bg-[#1e3a5f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1E3A8A]" placeholder="john@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Message</label>
                    <textarea rows={3} className="w-full bg-[#1e3a5f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#1E3A8A] resize-none"
                      defaultValue={`I'm interested in the ${car.year} ${car.make} ${car.model}. Please contact me.`} />
                  </div>
                  <button type="submit" className="w-full bg-[#1E3A8A] hover:bg-blue-700 text-white font-black py-4 rounded-lg text-base transition-colors uppercase tracking-wide">
                    Send Message
                  </button>
                  <p className="text-center text-xs text-gray-500">By submitting you agree to be contacted by GubMotors.</p>
                </form>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* Price Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Amount Financed</p>
                  <p className="text-4xl font-black text-black mb-3">{formatPrice(amountFinanced)}</p>

                  {/* Estimated payment */}
                  <div className="flex items-center justify-between bg-black text-white rounded-lg px-4 py-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wide">Estimated Payment</span>
                    <span className="font-black text-lg">${monthly}<span className="text-sm font-normal">/mo.</span></span>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price</span>
                      <span className="font-semibold">{formatPrice(car.price)}</span>
                    </div>
                    {car.cashDiscount && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Cash / trade-in credit</span>
                        <span className="font-semibold text-red-500">-{formatPrice(car.cashDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-100 font-bold">
                      <span>Amount financed</span>
                      <span>{formatPrice(amountFinanced)}</span>
                    </div>
                    <p className="text-xs text-gray-400">72 mo @ 7.9% APR · Estimate only</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 pb-4 border-b border-gray-100">
                    <svg className="w-4 h-4 text-[#1E3A8A] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Bucks County, PA</span>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <a href="tel:+17325550192"
                      className="flex items-center justify-center gap-2 w-full bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg text-sm transition-colors uppercase tracking-wide">
                      Call For Details
                    </a>
                    <a href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full border border-gray-300 hover:border-[#1E3A8A] bg-white text-black font-bold py-3.5 rounded-lg text-sm transition-colors">
                      Get Approved
                    </a>
                    <a href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full border border-gray-300 hover:border-[#1E3A8A] bg-white text-black font-bold py-3.5 rounded-lg text-sm transition-colors">
                      Schedule a Test Drive
                    </a>
                  </div>
                </div>

                {/* Financing teaser */}
                <div className="bg-[#0f172a] rounded-xl p-5 text-white">
                  <h3 className="font-bold text-sm mb-2">All Credit Welcome</h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                    Bad credit, no credit, first-time buyer — 40+ lenders competing for your business.
                  </p>
                  <a href="#contact-form" className="block text-center bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                    Pre-Qualify — It&apos;s Free
                  </a>
                </div>

                {/* Dealer card */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#1E3A8A] bg-[#0f172a] flex items-center justify-center shrink-0">
                      <span className="text-[#1E3A8A] font-black text-xs">GM</span>
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm">GubMotors</p>
                      <p className="text-gray-400 text-xs">Bucks County, PA · 5.0 ★★★★★</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-gray-600 text-xs">
                    <p>Bucks County, PA</p>
                    <p><a href="tel:+17325550192" className="hover:text-[#1d4ed8]">(732) 555-0192</a></p>
                    <p>Mon–Fri 9AM–7PM &middot; Sat 9AM–6PM &middot; Sun 11AM–4PM</p>
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
          <div className="text-3xl mb-3 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (car === null) notFound();

  return <VehicleDetail car={car} />;
}

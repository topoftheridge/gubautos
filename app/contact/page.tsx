"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormState = "idle" | "submitting" | "success" | "error";

const INQUIRY_TYPES = [
  "General Question",
  "Vehicle Inquiry",
  "Financing / Credit",
  "Trade-In Appraisal",
  "Schedule a Test Drive",
  "Service / Parts",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    vehicle: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire up to real endpoint (email, CRM, etc.)
    // For now simulate a successful submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0f172a] text-white py-14 sm:py-20 px-6 text-center">
        <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-3">GubMotors</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Get in Touch
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
          Questions about a vehicle, financing, or a trade-in? We&apos;re here. Real people, real answers.
        </p>
      </section>

      {/* Main Content */}
      <div className="bg-gray-50 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Contact Form ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold text-black mb-1">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">We&apos;ll get back to you within a few hours during business hours.</p>

            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We&apos;ll reach out to you shortly. In the meantime, feel free to browse our inventory.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/inventory" className="bg-[#1E3A8A] text-white font-bold px-6 py-2.5 rounded hover:bg-blue-900 transition-all text-sm">
                    Browse Inventory
                  </Link>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", inquiryType: "", vehicle: "", message: "" }); }}
                    className="border border-gray-200 text-gray-600 font-semibold px-6 py-2.5 rounded hover:border-gray-400 transition-all text-sm"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-black mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-black mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(215) 555-0100"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-black mb-1.5">
                    What can we help with?
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all bg-white"
                  >
                    <option value="">Select a topic...</option>
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Vehicle of Interest */}
                <div>
                  <label htmlFor="vehicle" className="block text-sm font-semibold text-black mb-1.5">
                    Vehicle of Interest <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="vehicle"
                    name="vehicle"
                    type="text"
                    value={form.vehicle}
                    onChange={handleChange}
                    placeholder="e.g. 2021 Honda CR-V, Stock #1234..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for, questions about financing, trade-in details — anything helps."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or call us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#1E3A8A] text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you agree to be contacted by GubMotors regarding your inquiry.
                </p>
              </form>
            )}
          </div>

          {/* ── Info Sidebar ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Call */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-black">Call or Text</h3>
              </div>
              <a href="tel:+17325550192" className="text-2xl font-black text-black hover:text-[#1E3A8A] transition-colors block mb-1">
                (732) 555-0192
              </a>
              <p className="text-gray-500 text-sm">Talk to a real person. No phone trees.</p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-black">Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
                  { day: "Sunday", hours: "11:00 AM – 4:00 PM" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-600">{day}</span>
                    <span className="font-semibold text-black">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-black">Location</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Bucks County, PA<br />Serving Philadelphia & surrounding areas</p>
              <a
                href="https://maps.google.com/?q=Bucks+County+PA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1E3A8A] text-sm font-semibold hover:underline"
              >
                Get Directions
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Quick Links */}
            <div className="bg-[#0f172a] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-gray-400">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Inventory", href: "/inventory" },
                  { label: "Apply for Financing", href: "/#financing" },
                  { label: "Get a Trade-In Quote", href: "/#contact" },
                  { label: "Read Our Blog", href: "/blog" },
                  { label: "About GubMotors", href: "/about" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between group py-2 border-b border-white/10 last:border-0"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
                    <svg className="w-3.5 h-3.5 text-[#1E3A8A] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps embed — Bucks County, PA */}
      <div className="relative w-full" style={{ height: 420 }}>
        <iframe
          title="GubMotors — Bucks County, PA"
          src="https://maps.google.com/maps?q=Bucks+County,+Pennsylvania&t=&z=10&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Overlay badge */}
        <a
          href="https://maps.google.com/?q=Bucks+County,+Pennsylvania"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#1E3A8A] transition-colors"
        >
          <svg className="w-4 h-4 text-[#1E3A8A]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Open in Google Maps
        </a>
      </div>

      <Footer />
    </>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Utility Bar */}
      <div className="bg-[#1a1a1a] text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FFC107] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              482 Rt-9 South, Freehold, NJ 07728
            </a>
            <a href="tel:+17325550192" className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FFC107] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (732) 555-0192
            </a>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <span>Mon–Sat 9AM–7PM &middot; Sun 11AM–4PM</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-[#222222] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#FFC107] flex items-center justify-center bg-[#1a1a1a] shrink-0">
                <span className="text-[#FFC107] font-black text-base">GA</span>
              </div>
              <div className="leading-none">
                <div className="text-[#FFC107] font-black text-xl tracking-wide">GUB</div>
                <div className="text-white font-black text-xl tracking-wide -mt-0.5">AUTOS</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium">
              <Link href="/inventory"
                className="flex items-center gap-1.5 border border-white/30 rounded px-4 py-2 hover:border-[#FFC107] hover:text-[#FFC107] transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Inventory
              </Link>
              <Link href="/inventory" className="hover:text-[#FFC107] transition-colors">Inventory</Link>
              <Link href="#financing" className="hover:text-[#FFC107] transition-colors">Financing</Link>
              <Link href="#contact" className="hover:text-[#FFC107] transition-colors">Trade-In</Link>
              <Link href="#why-us" className="hover:text-[#FFC107] transition-colors">About Us</Link>
              <Link href="#contact" className="hover:text-[#FFC107] transition-colors">Contact</Link>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[#1a1a1a] px-6 pb-4 space-y-1 text-sm font-medium">
            <p className="text-gray-500 text-xs pt-2 pb-1">482 Rt-9 South, Freehold, NJ · (732) 555-0192</p>
            <Link href="/inventory" className="block py-2.5 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Search Inventory</Link>
            <Link href="/inventory" className="block py-2.5 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Inventory</Link>
            <Link href="#financing" className="block py-2.5 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Financing</Link>
            <Link href="#contact" className="block py-2.5 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Trade-In</Link>
            <Link href="#why-us" className="block py-2.5 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="#contact" className="block py-2.5 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>
    </>
  );
}

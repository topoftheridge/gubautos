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
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors">
              <span className="text-[#FFC107]">📍</span> 482 Rt-9 South, Freehold, NJ 07728
            </a>
            <a href="tel:+17325550192" className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors">
              <span className="text-[#FFC107]">📞</span> (732) 555-0192
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-[#FFC107]">🕐</span> Mon–Sat 9AM–7PM · Sun 11AM–4PM
            </span>
            <Link href="#inventory" className="flex items-center gap-1.5 hover:text-[#FFC107] transition-colors">
              <span className="text-[#FFC107]">❤️</span> Favorites
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-[#222222] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-[#FFC107] flex items-center justify-center bg-[#1a1a1a]">
                <span className="text-[#FFC107] font-black text-lg leading-none">GA</span>
              </div>
              <div className="leading-tight">
                <div className="text-[#FFC107] font-black text-xl tracking-wide">GUB</div>
                <div className="text-white font-black text-xl tracking-wide -mt-1">AUTOS</div>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="#inventory" className="flex items-center gap-1 border border-white/40 rounded px-4 py-2 hover:border-[#FFC107] hover:text-[#FFC107] transition-all">
                🔍 Search Inventory
              </Link>
              <Link href="#inventory" className="hover:text-[#FFC107] transition-colors">Inventory ▾</Link>
              <Link href="#financing" className="hover:text-[#FFC107] transition-colors">Financing ▾</Link>
              <Link href="#contact" className="hover:text-[#FFC107] transition-colors">Trade-In</Link>
              <Link href="#why-us" className="hover:text-[#FFC107] transition-colors">About Us ▾</Link>
              <Link href="#contact" className="hover:text-[#FFC107] transition-colors">Contact</Link>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
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
          <div className="md:hidden bg-[#1a1a1a] px-6 pb-4 space-y-3 text-sm font-medium">
            <div className="text-[#FFC107] text-xs pt-2">📍 482 Rt-9 South, Freehold, NJ · (732) 555-0192</div>
            <Link href="#inventory" className="block py-2 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Search Inventory</Link>
            <Link href="#inventory" className="block py-2 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Inventory</Link>
            <Link href="#financing" className="block py-2 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Financing</Link>
            <Link href="#contact" className="block py-2 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Trade-In</Link>
            <Link href="#why-us" className="block py-2 border-b border-white/10 hover:text-[#FFC107]" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="#contact" className="block py-2 hover:text-[#FFC107]" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>
    </>
  );
}

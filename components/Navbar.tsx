"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-3xl font-black tracking-tight">GUB</span>
            <span className="text-white text-3xl font-black tracking-tight">AUTOS</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
            <Link href="#inventory" className="hover:text-red-500 transition-colors">Inventory</Link>
            <Link href="#financing" className="hover:text-red-500 transition-colors">Financing</Link>
            <Link href="#why-us" className="hover:text-red-500 transition-colors">Why Us</Link>
            <Link href="#contact" className="hover:text-red-500 transition-colors">Contact</Link>
            <a
              href="tel:+17325550192"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-bold transition-colors"
            >
              (732) 555-0192
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 px-4 pb-4 space-y-3 text-sm font-semibold uppercase">
          <Link href="#inventory" className="block py-2 hover:text-red-500" onClick={() => setOpen(false)}>Inventory</Link>
          <Link href="#financing" className="block py-2 hover:text-red-500" onClick={() => setOpen(false)}>Financing</Link>
          <Link href="#why-us" className="block py-2 hover:text-red-500" onClick={() => setOpen(false)}>Why Us</Link>
          <Link href="#contact" className="block py-2 hover:text-red-500" onClick={() => setOpen(false)}>Contact</Link>
          <a href="tel:+17325550192" className="block bg-red-600 text-center py-2 rounded font-bold">(732) 555-0192</a>
        </div>
      )}
    </nav>
  );
}

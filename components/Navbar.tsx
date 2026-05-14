"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const INVENTORY_LINKS = [
  { label: "All Inventory", href: "/inventory", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  { label: "SUVs", href: "/inventory?bodyStyle=SUV" },
  { label: "Sedans", href: "/inventory?bodyStyle=Sedan" },
  { label: "Trucks", href: "/inventory?bodyStyle=Truck" },
  { label: "Vans & Minivans", href: "/inventory?bodyStyle=Van" },
  { label: "Under $15K", href: "/inventory?maxPrice=15000" },
];

const ABOUT_LINKS = [
  { label: "About GubMotors", href: "/about" },
  { label: "Our History", href: "/about#history" },
  { label: "Meet the Team", href: "/about#team" },
  { label: "Why GubMotors?", href: "/about#why" },
];

function ChevronDown() {
  return (
    <svg className="w-3.5 h-3.5 ml-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileInventoryOpen, setMobileInventoryOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  // Hover delay refs so dropdown doesn't flicker
  const invTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [invOpen, setInvOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  function openInv() {
    if (invTimeout.current) clearTimeout(invTimeout.current);
    setInvOpen(true);
  }
  function closeInv() {
    invTimeout.current = setTimeout(() => setInvOpen(false), 120);
  }
  function openAbout() {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    setAboutOpen(true);
  }
  function closeAbout() {
    aboutTimeout.current = setTimeout(() => setAboutOpen(false), 120);
  }

  return (
    <>
      {/* Utility Bar */}
      <div className="bg-[#0f172a] text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#1E3A8A] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Bucks County, PA
            </a>
            <a href="tel:+17325550192" className="flex items-center gap-1.5 hover:text-[#1E3A8A] transition-colors">
              <svg className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
      <nav className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gusmotorsheader.png" alt="Gub Motors" className="h-14 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7 text-sm font-medium">

              {/* Search button */}
              <Link href="/inventory"
                className="flex items-center gap-1.5 border border-white/30 rounded px-4 py-2 hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Inventory
              </Link>

              {/* Inventory dropdown */}
              <div className="relative" onMouseEnter={openInv} onMouseLeave={closeInv}>
                <button className="flex items-center gap-1 hover:text-[#1E3A8A] transition-colors">
                  Inventory <ChevronDown />
                </button>
                {invOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1">
                      {INVENTORY_LINKS.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setInvOpen(false)}
                          className={`block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1E3A8A] hover:text-white transition-colors ${item.label === "All Inventory" ? "border-b border-gray-100 font-semibold" : ""}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/#financing" className="hover:text-[#1E3A8A] transition-colors">Financing</Link>
              <Link href="/#contact" className="hover:text-[#1E3A8A] transition-colors">Trade-In</Link>

              {/* About dropdown */}
              <div className="relative" onMouseEnter={openAbout} onMouseLeave={closeAbout}>
                <button className="flex items-center gap-1 hover:text-[#1E3A8A] transition-colors">
                  About Us <ChevronDown />
                </button>
                {aboutOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1">
                      {ABOUT_LINKS.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setAboutOpen(false)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1E3A8A] hover:text-white transition-colors first:font-semibold first:border-b first:border-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/blog" className="hover:text-[#1E3A8A] transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-[#1E3A8A] transition-colors">Contact</Link>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0f172a] px-6 pb-5 text-sm font-medium">
            <p className="text-gray-500 text-xs pt-2 pb-2">Bucks County, PA · (732) 555-0192</p>

            <Link href="/inventory" className="block py-2.5 border-b border-white/10 hover:text-[#1E3A8A]" onClick={() => setMobileOpen(false)}>
              Search Inventory
            </Link>

            {/* Mobile Inventory accordion */}
            <div className="border-b border-white/10">
              <button
                className="flex items-center justify-between w-full py-2.5 hover:text-[#1E3A8A] transition-colors"
                onClick={() => setMobileInventoryOpen(!mobileInventoryOpen)}
              >
                Inventory
                <svg className={`w-4 h-4 transition-transform ${mobileInventoryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileInventoryOpen && (
                <div className="pb-2 pl-3 space-y-0.5">
                  {INVENTORY_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => { setMobileOpen(false); setMobileInventoryOpen(false); }}
                      className="block py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#financing" className="block py-2.5 border-b border-white/10 hover:text-[#1E3A8A]" onClick={() => setMobileOpen(false)}>Financing</Link>
            <Link href="/#contact" className="block py-2.5 border-b border-white/10 hover:text-[#1E3A8A]" onClick={() => setMobileOpen(false)}>Trade-In</Link>

            {/* Mobile About accordion */}
            <div className="border-b border-white/10">
              <button
                className="flex items-center justify-between w-full py-2.5 hover:text-[#1E3A8A] transition-colors"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              >
                About Us
                <svg className={`w-4 h-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileAboutOpen && (
                <div className="pb-2 pl-3 space-y-0.5">
                  {ABOUT_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => { setMobileOpen(false); setMobileAboutOpen(false); }}
                      className="block py-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" className="block py-2.5 border-b border-white/10 hover:text-[#1E3A8A]" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/contact" className="block py-2.5 hover:text-[#1E3A8A]" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>
    </>
  );
}

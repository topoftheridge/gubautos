import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestPosts, type Post } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

export const metadata: Metadata = {
  title: "About GubMotors | Gub's Motors History — Bucks County Used Car Dealer",
  description:
    "Learn the story of GubMotors — founded in Bristol, PA in 2008 by Gus 'Gub' Bubola. Serving Bucks County & Philadelphia with quality pre-owned vehicles, in-house financing, and 500+ five-star reviews.",
  keywords: [
    "about GubMotors",
    "Gub's Motors history",
    "used car dealer Bucks County",
    "Bristol PA car dealership",
    "GubMotors team",
    "used cars Philadelphia",
  ],
  openGraph: {
    title: "About GubMotors | Bucks County Used Car Dealer Since 2008",
    description:
      "Started with 12 cars and a dream in 2008. Today GubMotors is trusted by thousands of Bucks County & Philadelphia families.",
    url: "https://gubmotors.com/about",
    siteName: "GubMotors",
    type: "website",
  },
  alternates: { canonical: "https://gubmotors.com/about" },
};

const timeline = [
  {
    year: "2008",
    title: "The Beginning",
    desc: "Gus \"Gub\" Bubola opens a small lot in Bristol, PA with 12 hand-picked vehicles and a simple promise: honest deals, no pressure.",
  },
  {
    year: "2011",
    title: "Growing the Lot",
    desc: "Demand takes off. GubMotors expands to a full-service location with 50+ vehicles and adds an on-site service bay.",
  },
  {
    year: "2014",
    title: "1,000 Cars Sold",
    desc: "A major milestone — 1,000 vehicles sold. We launch financing partnerships with 12 lenders to help more families get approved.",
  },
  {
    year: "2017",
    title: "New Flagship Location",
    desc: "GubMotors moves to its current Bucks County home — a 200+ vehicle lot built for the community that made us.",
  },
  {
    year: "2020",
    title: "Staying Open for Families",
    desc: "When COVID hit, we pivoted fast — contactless buying, virtual tours, and home delivery. 300+ families got into vehicles that year.",
  },
  {
    year: "2023",
    title: "500+ Five-Star Reviews",
    desc: "Launched online inventory and hit 500+ five-star reviews across Google and Facebook. The reviews write themselves when you treat people right.",
  },
  {
    year: "Today",
    title: "Trusted by Thousands",
    desc: "Thousands of Bucks County and Philadelphia families drive GubMotors vehicles. We're just getting started.",
  },
];

const team = [
  { initials: "GB", name: 'Gus "Gub" Bubola', role: "Founder & Owner", bio: "Gus started GubMotors with $40k, a handshake philosophy, and zero days off. He still walks the lot every morning." },
  { initials: "MR", name: "Mike Rossi", role: "Sales Manager", bio: "15 years in the business. Mike's job is making sure you leave in the right car, not just any car." },
  { initials: "DT", name: "Diane Torres", role: "Finance Director", bio: "Diane has helped over 2,000 customers find financing. Good credit, bad credit — she's seen it all and found a way." },
];

const whyReasons = [
  { title: "Multi-Point Inspection", desc: "Every car is thoroughly inspected before it hits our lot. No surprises after you buy." },
  { title: "Full Vehicle History", desc: "CarFax reports available on every vehicle. Know exactly what you're buying." },
  { title: "Test Drive Anytime", desc: "Take it for a spin before you commit. No pressure, no rush." },
  { title: "No-Pressure Sales", desc: "Our team is here to help, not push. Find the right car on your timeline." },
  { title: "On-Site Service Center", desc: "Oil changes, brakes, tires — we handle it all after the sale too." },
  { title: "500+ Five-Star Reviews", desc: "Don't take our word for it. Our customers keep coming back and sending friends." },
];

const PLACEHOLDER_POSTS = [
  { title: "How to Get Approved for Auto Financing with Bad Credit", excerpt: "Bad credit doesn't mean no car. Here's exactly how GubMotors helps customers with all credit types get on the road.", slug: "#", date: null },
  { title: "Top 5 Things to Check Before Buying a Used Car", excerpt: "Don't skip these five checks before you sign anything. A little due diligence goes a long way on a pre-owned purchase.", slug: "#", date: null },
  { title: "SUV vs Sedan: Which Is Right for Your Family?", excerpt: "Fuel economy, cargo space, seating — we break down the real differences so you can pick the right body style with confidence.", slug: "#", date: null },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AboutPage() {
  let posts: Post[] = [];
  try {
    posts = await getLatestPosts(3);
  } catch {
    posts = [];
  }

  const blogCards =
    posts.length > 0
      ? posts.map((p) => ({
          title: p.title,
          excerpt: p.excerpt ?? "",
          slug: `/blog/${p.slug.current}`,
          date: p.publishedAt ?? null,
          image: p.mainImage ? urlBuilder.image(p.mainImage).width(800).height(450).quality(85).url() : null,
        }))
      : PLACEHOLDER_POSTS.map((p) => ({ ...p, image: null }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "GubMotors",
    url: "https://gubmotors.com",
    description: "Quality pre-owned vehicles in Bucks County & Philadelphia. Founded 2008.",
    address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
    foundingDate: "2008",
    founder: { "@type": "Person", name: 'Gus "Gub" Bubola' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Built on Trust.<br />Driven by Community.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Since 2008, GubMotors has been putting Bucks County & Philadelphia families behind the wheel of quality pre-owned vehicles — no games, no pressure, just good cars and honest deals.
          </p>
        </div>
      </section>

      {/* ── History Timeline ── */}
      <section id="history" className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">Our History</h2>
            <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">From a 12-car lot in Bristol to one of Bucks County&apos;s most trusted dealerships — here&apos;s how we got here.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 hidden md:block" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 w-16 text-right md:text-center">
                    <span className="inline-block bg-[#1E3A8A] text-white text-xs font-bold px-2 py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  <div className="pb-2">
                    <h3 className="font-bold text-black text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">Meet the Team</h2>
            <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">The people behind the lot. We&apos;re real humans, not salesbots.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:border-[#1E3A8A] hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-bold text-black text-base">{member.name}</h3>
                <p className="text-[#1E3A8A] text-xs font-semibold uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why GubMotors ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">Why GubMotors?</h2>
            <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">We&apos;re not your average car lot. Here&apos;s what sets us apart.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyReasons.map((r) => (
              <div key={r.title} className="p-6 rounded-xl border border-gray-100 hover:border-[#1E3A8A] hover:shadow-md transition-all">
                <div className="w-8 h-1 bg-[#1E3A8A] rounded mb-4" />
                <h3 className="font-bold text-black text-base mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-2">From Our Blog</h2>
            <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">Car buying tips, financing guides, and local dealer news — straight from the GubMotors team.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {blogCards.map((post, i) => (
              <Link key={i} href={post.slug} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#1E3A8A] hover:shadow-md transition-all flex flex-col">
                <div className="h-44 bg-[#1e293b] overflow-hidden flex items-center justify-center">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <svg className="w-12 h-12 text-[#1E3A8A] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
                    </svg>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {post.date && <p className="text-xs text-gray-400 mb-2">{formatDate(post.date)}</p>}
                  <h3 className="font-bold text-black text-sm mb-2 leading-snug group-hover:text-[#1E3A8A] transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <span className="mt-4 text-[#1E3A8A] text-xs font-semibold uppercase tracking-wide">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-block border border-[#1E3A8A] text-[#1E3A8A] font-semibold text-sm px-8 py-3 rounded hover:bg-[#1E3A8A] hover:text-white transition-all">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1E3A8A] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-blue-200 mb-8">Browse 200+ vehicles in our Bucks County inventory. All credit welcome, financing on-site.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory" className="bg-white text-[#1E3A8A] font-bold px-8 py-3 rounded hover:bg-gray-100 transition-all">
              Browse Inventory
            </Link>
            <Link href="/#contact" className="border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

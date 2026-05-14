import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLatestPosts, type Post } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

export const metadata: Metadata = {
  title: "About GubMotors | Bucks County Used Car Dealer",
  description:
    "GubMotors is a trusted used car dealership in Bucks County & Philadelphia. Quality pre-owned vehicles, in-house financing, and no-pressure sales.",
  keywords: [
    "about GubMotors",
    "used car dealer Bucks County",
    "GubMotors dealership",
    "used cars Philadelphia",
  ],
  openGraph: {
    title: "About GubMotors | Bucks County Used Car Dealer",
    description:
      "Trusted by Bucks County & Philadelphia families. Quality pre-owned vehicles, fast financing, and honest deals.",
    url: "https://gubmotors.com/about",
    siteName: "GubMotors",
    type: "website",
  },
  alternates: { canonical: "https://gubmotors.com/about" },
};

const whyReasons = [
  { title: "Multi-Point Inspection", desc: "Every car is thoroughly inspected before it hits our lot. No surprises after you buy." },
  { title: "Full Vehicle History", desc: "CarFax reports available on every vehicle. Know exactly what you're buying." },
  { title: "Test Drive Anytime", desc: "Take it for a spin before you commit. No pressure, no rush." },
  { title: "No-Pressure Sales", desc: "Our team is here to help, not push. Find the right car on your timeline." },
  { title: "On-Site Service Center", desc: "Oil changes, brakes, tires — we handle it all after the sale too." },
  { title: "500+ Five-Star Reviews", desc: "Don't take our word for it. Our customers keep coming back and sending friends." },
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

  const blogCards = posts.map((p) => ({
    title: p.title,
    excerpt: p.excerpt ?? "",
    slug: `/blog/${p.slug.current}`,
    date: p.publishedAt ?? null,
    image: p.mainImage ? urlBuilder.image(p.mainImage).width(800).height(450).quality(85).url() : null,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "GubMotors",
    url: "https://gubmotors.com",
    description: "Quality pre-owned vehicles in Bucks County & Philadelphia.",
    address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0f172a] text-white py-16 sm:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Trusted Used Cars in Bucks County & Philadelphia
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            GubMotors is committed to making the car buying experience straightforward and stress-free. Quality vehicles, honest pricing, and financing for all credit types.
          </p>
        </div>
      </section>

      {/* Why GubMotors */}
      <section id="why" className="bg-white py-16 px-6">
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

      {/* From Our Blog */}
      {blogCards.length > 0 && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-2">From Our Blog</h2>
              <div className="h-1 w-32 bg-[#1E3A8A] rounded mx-auto mb-4" />
              <p className="text-gray-500 max-w-xl mx-auto">Car buying tips, financing guides, and local dealer news.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}

      {/* CTA */}
      <section className="bg-[#1E3A8A] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-blue-200 mb-8">Browse 200+ vehicles in our Bucks County inventory. All credit welcome, financing on-site.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory" className="bg-white text-[#1E3A8A] font-bold px-8 py-3 rounded hover:bg-gray-100 transition-all">
              Browse Inventory
            </Link>
            <Link href="/contact" className="border border-white text-white font-semibold px-8 py-3 rounded hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

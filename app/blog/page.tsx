import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, type Post } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

export const metadata: Metadata = {
  title: "Car Buying Tips & News | GubMotors Blog — Bucks County Used Cars",
  description:
    "The GubMotors blog — expert tips on buying a used car, getting auto financing with bad credit, and navigating the Bucks County & Philadelphia car market. Updated regularly.",
  keywords: [
    "used car buying tips",
    "auto financing bad credit",
    "Bucks County used cars",
    "car dealer blog",
    "GubMotors news",
    "pre-owned vehicle guide",
  ],
  openGraph: {
    title: "Car Buying Tips & News | GubMotors Blog",
    description: "Expert advice on used cars, financing, and local dealer news from GubMotors in Bucks County, PA.",
    url: "https://gubmotors.com/blog",
    siteName: "GubMotors",
    type: "website",
  },
  alternates: { canonical: "https://gubmotors.com/blog" },
};

const PLACEHOLDER_POSTS = [
  {
    title: "How to Get Approved for Auto Financing with Bad Credit",
    excerpt: "Bad credit doesn't mean no car. Here's exactly how GubMotors helps customers with all credit types get on the road — and what you can do to improve your chances before you apply.",
    slug: "#",
    date: null,
    image: null,
  },
  {
    title: "Top 5 Things to Check Before Buying a Used Car",
    excerpt: "Don't skip these five checks before you sign anything. A little due diligence goes a long way on a pre-owned purchase and can save you thousands down the line.",
    slug: "#",
    date: null,
    image: null,
  },
  {
    title: "SUV vs Sedan: Which Is Right for Your Family?",
    excerpt: "Fuel economy, cargo space, third-row seating, ground clearance — we break down the real differences so you can pick the right body style with confidence.",
    slug: "#",
    date: null,
    image: null,
  },
  {
    title: "What Is a CarFax Report and Why Does It Matter?",
    excerpt: "A vehicle history report can reveal accidents, title problems, odometer fraud, and more. We explain what to look for and why GubMotors includes CarFax on every vehicle.",
    slug: "#",
    date: null,
    image: null,
  },
  {
    title: "Trade-In Tips: How to Get the Most for Your Current Car",
    excerpt: "Timing, condition, and negotiation all affect your trade-in value. Here's how to walk in prepared and walk out with the best deal on your current vehicle.",
    slug: "#",
    date: null,
    image: null,
  },
  {
    title: "AWD vs 4WD vs FWD: Which Drivetrain Do You Need in Pennsylvania?",
    excerpt: "Pennsylvania winters are no joke. We break down the drivetrain options and which one makes sense for Bucks County roads, suburbs, and highway commutes.",
    slug: "#",
    date: null,
    image: null,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await getAllPosts();
  } catch {
    posts = [];
  }

  const cards =
    posts.length > 0
      ? posts.map((p) => ({
          title: p.title,
          excerpt: p.excerpt ?? "",
          slug: `/blog/${p.slug.current}`,
          date: p.publishedAt ?? null,
          image: p.mainImage ? urlBuilder.image(p.mainImage).width(600).height(340).url() : null,
        }))
      : PLACEHOLDER_POSTS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "GubMotors Blog",
    url: "https://gubmotors.com/blog",
    description: "Car buying tips, financing advice, and local dealer news from GubMotors in Bucks County, PA.",
    publisher: {
      "@type": "AutoDealer",
      name: "GubMotors",
      url: "https://gubmotors.com",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      {/* Header */}
      <section className="bg-[#0f172a] text-white py-16 px-6 text-center">
        <p className="text-[#1E3A8A] text-sm font-semibold uppercase tracking-widest mb-3">GubMotors</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The Blog</h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Car buying guides, financing tips, and dealership news — written for real people in Bucks County & Philadelphia.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 && (
            <p className="text-center text-xs text-gray-400 mb-10 italic">Sample posts shown — publish your first article in Sanity Studio to see live content.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <Link key={i} href={card.slug} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#1E3A8A] hover:shadow-md transition-all flex flex-col">
                <div className="h-48 bg-[#1e293b] overflow-hidden flex items-center justify-center">
                  {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <svg className="w-12 h-12 text-[#1E3A8A] opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
                    </svg>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {card.date && <p className="text-xs text-gray-400 mb-2">{formatDate(card.date)}</p>}
                  <h2 className="font-bold text-black text-base mb-2 leading-snug group-hover:text-[#1E3A8A] transition-colors">{card.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{card.excerpt}</p>
                  <span className="mt-4 text-[#1E3A8A] text-xs font-semibold uppercase tracking-wide">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12 px-6 text-center border-t border-gray-100">
        <p className="text-gray-500 mb-4">Ready to put what you learned into action?</p>
        <Link href="/inventory" className="inline-block bg-[#1E3A8A] text-white font-bold px-8 py-3 rounded hover:bg-blue-900 transition-all">
          Browse Our Inventory
        </Link>
      </section>

      <Footer />
    </>
  );
}

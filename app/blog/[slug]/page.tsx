import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPostSlugs, getAllPosts, type Post } from "@/sanity/queries";
import { urlBuilder } from "@/sanity/imageUrl";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | GubMotors Blog" };

  const title = post.seoTitle ?? `${post.title} | GubMotors Blog`;
  const description =
    post.seoDescription ??
    post.excerpt ??
    "Read the latest from the GubMotors blog — Bucks County & Philadelphia used car tips and news.";
  const imageUrl = post.mainImage
    ? urlBuilder.image(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://gubmotors.com/blog/${slug}`,
      siteName: "GubMotors",
      type: "article",
      publishedTime: post.publishedAt,
      ...(imageUrl
        ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    alternates: { canonical: `https://gubmotors.com/blog/${slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(body: unknown[]): number {
  const text = JSON.stringify(body);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const portableComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-black mt-10 mb-4 leading-snug">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-black mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-5 text-base">{children}</p>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts().catch(() => [] as Post[]),
  ]);

  if (!post) notFound();

  const heroImage = post.mainImage
    ? urlBuilder.image(post.mainImage).width(1400).height(580).fit("crop").url()
    : null;

  const readTime = post.body ? estimateReadTime(post.body as unknown[]) : 3;

  const relatedPosts = allPosts
    .filter((p) => p.slug.current !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "GubMotors", url: "https://gubmotors.com" },
    publisher: { "@type": "Organization", name: "GubMotors", url: "https://gubmotors.com" },
    ...(heroImage ? { image: heroImage } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gubmotors.com/blog/${slug}`,
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: "GubMotors",
    url: "https://gubmotors.com",
    address: { "@type": "PostalAddress", addressRegion: "PA", addressCountry: "US" },
    description: "Quality pre-owned vehicles in Bucks County & Philadelphia. Founded 2008.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Navbar />

      {/* Hero Image */}
      {heroImage ? (
        <div className="w-full bg-[#0f172a] overflow-hidden" style={{ maxHeight: 520 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={post.title}
            className="w-full object-cover"
            style={{ maxHeight: 520 }}
          />
        </div>
      ) : (
        <div className="w-full bg-[#0f172a] h-24" />
      )}

      {/* Article Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/blog"
            className="text-[#1E3A8A] text-sm font-medium hover:underline mb-5 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            {post.publishedAt && (
              <p className="text-[#1E3A8A] text-xs font-semibold uppercase tracking-widest mb-3">
                {formatDate(post.publishedAt)} · {readTime} min read
              </p>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-gray-500 text-lg leading-relaxed">{post.excerpt}</p>
            )}
          </div>
        </div>
      </div>

      {/* Article Body + Sidebar */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex gap-12 items-start">
          {/* Main Content */}
          <article className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 p-8 md:p-12">
            {post.body ? (
              <PortableText
                value={post.body as Parameters<typeof PortableText>[0]["value"]}
                components={portableComponents}
              />
            ) : (
              <p className="text-gray-400 italic">No content yet.</p>
            )}

            {/* Author Card */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                GM
              </div>
              <div>
                <p className="font-bold text-black text-sm">GubMotors Team</p>
                <p className="text-gray-500 text-sm">
                  Bucks County & Philadelphia used car experts since 2008. 500+ five-star reviews.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            {/* CTA Card */}
            <div className="bg-[#1E3A8A] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Ready to shop?</h3>
              <p className="text-blue-200 text-sm mb-5 leading-relaxed">
                200+ vehicles in Bucks County. All credit welcome, financing on-site.
              </p>
              <Link
                href="/inventory"
                className="block bg-white text-[#1E3A8A] font-bold text-sm text-center py-2.5 rounded hover:bg-blue-50 transition-all"
              >
                Browse Inventory
              </Link>
              <Link
                href="/#financing"
                className="block border border-white/40 text-white font-semibold text-sm text-center py-2.5 rounded mt-2 hover:bg-white/10 transition-all"
              >
                Get Financing
              </Link>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-bold text-black text-sm uppercase tracking-wide mb-4 border-b border-gray-100 pb-3">
                  More Articles
                </h3>
                <ul className="space-y-4">
                  {relatedPosts.map((rp) => {
                    const thumb = rp.mainImage
                      ? urlBuilder.image(rp.mainImage).width(120).height(80).fit("crop").url()
                      : null;
                    return (
                      <li key={rp._id}>
                        <Link
                          href={`/blog/${rp.slug.current}`}
                          className="flex gap-3 group"
                        >
                          <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-[#1e293b]">
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={thumb}
                                alt={rp.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-[#1E3A8A] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 group-hover:text-[#1E3A8A] transition-colors leading-snug font-medium">
                            {rp.title}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-bold text-black text-sm uppercase tracking-wide mb-3">
                Have Questions?
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                Our team is on the lot Mon–Sat 9AM–7PM. No pressure, just answers.
              </p>
              <a
                href="tel:+17325550192"
                className="flex items-center gap-2 text-[#1E3A8A] font-bold text-sm hover:underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (732) 555-0192
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="lg:hidden bg-[#1E3A8A] py-10 px-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Ready to find your next car?</h2>
        <p className="text-blue-200 text-sm mb-5">Bucks County & Philadelphia · All credit welcome</p>
        <Link
          href="/inventory"
          className="inline-block bg-white text-[#1E3A8A] font-bold px-8 py-3 rounded hover:bg-blue-50 transition-all"
        >
          Browse Inventory
        </Link>
      </div>

      {/* More Articles Strip */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-14 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-8">More from the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => {
                const cardImg = rp.mainImage
                  ? urlBuilder.image(rp.mainImage).width(600).height(340).fit("crop").url()
                  : null;
                return (
                  <Link
                    key={rp._id}
                    href={`/blog/${rp.slug.current}`}
                    className="group rounded-xl border border-gray-100 overflow-hidden hover:border-[#1E3A8A] hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="h-44 bg-[#1e293b] overflow-hidden">
                      {cardImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cardImg}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-[#1E3A8A] opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {rp.publishedAt && (
                        <p className="text-xs text-gray-400 mb-1">{formatDate(rp.publishedAt)}</p>
                      )}
                      <h3 className="font-bold text-black text-sm leading-snug group-hover:text-[#1E3A8A] transition-colors flex-1">
                        {rp.title}
                      </h3>
                      <span className="mt-3 text-[#1E3A8A] text-xs font-semibold uppercase tracking-wide">
                        Read More →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

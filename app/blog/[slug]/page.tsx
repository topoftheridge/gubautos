import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPostSlugs, type Post } from "@/sanity/queries";
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
  const description = post.seoDescription ?? post.excerpt ?? "Read the latest from the GubMotors blog — Bucks County & Philadelphia used car tips and news.";
  const imageUrl = post.mainImage ? urlBuilder.image(post.mainImage).width(1200).height(630).url() : undefined;

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
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] } : {}),
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
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);
  if (!post) notFound();

  const heroImage = post.mainImage ? urlBuilder.image(post.mainImage).width(1200).height(500).url() : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "GubMotors", url: "https://gubmotors.com" },
    publisher: {
      "@type": "Organization",
      name: "GubMotors",
      url: "https://gubmotors.com",
    },
    ...(heroImage ? { image: heroImage } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://gubmotors.com/blog/${slug}` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Navbar />

      {/* Article Hero */}
      <div className="bg-[#0f172a] text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-gray-400 text-sm hover:text-white transition-colors mb-4 inline-block">
            ← Back to Blog
          </Link>
          {post.publishedAt && (
            <p className="text-[#1E3A8A] text-xs font-semibold uppercase tracking-widest mb-3">
              {formatDate(post.publishedAt)}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-gray-400 text-lg">{post.excerpt}</p>}
        </div>
      </div>

      {heroImage && (
        <div className="w-full max-h-[480px] overflow-hidden bg-[#1e293b]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={post.title} className="w-full object-cover max-h-[480px]" />
        </div>
      )}

      {/* Body */}
      <article className="bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto prose prose-neutral prose-headings:font-bold prose-headings:text-black prose-a:text-[#1E3A8A] prose-strong:text-black max-w-none">
          {post.body ? (
            <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} />
          ) : (
            <p className="text-gray-500 italic">No content yet.</p>
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-12 px-6 text-center">
        <p className="text-gray-500 mb-2">Have questions about buying your next vehicle?</p>
        <h2 className="text-xl font-bold text-black mb-6">GubMotors is here to help — Bucks County & Philadelphia</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/inventory" className="bg-[#1E3A8A] text-white font-bold px-8 py-3 rounded hover:bg-blue-900 transition-all">
            Browse Inventory
          </Link>
          <Link href="/blog" className="border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-all">
            More Articles
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

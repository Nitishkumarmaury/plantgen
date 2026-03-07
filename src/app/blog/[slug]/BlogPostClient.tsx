"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { blogContent } from "@/data/blog-content";
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react";

export default function BlogPostClient() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post || !content) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://plantgen.live${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Plantgen" },
    publisher: {
      "@type": "Organization",
      name: "Plantgen",
      url: "https://plantgen.live",
    },
  };

  return (
    <div className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/blog"
            className="hover:text-brand-700 transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 mb-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-neutral prose-lg max-w-none prose-headings:font-serif prose-headings:text-neutral-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
          {content.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, j) => (
                <p
                  key={j}
                  className="text-neutral-700 leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2 my-4">
                  {section.list.map((item, k) => (
                    <li
                      key={k}
                      className="flex items-start gap-2 text-neutral-700"
                    >
                      <span className="text-brand-600 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>

        {/* CTA */}
        <div className="mt-12 p-8 bg-brand-50 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Ready to send a plant gift?
          </h3>
          <p className="text-neutral-600 mb-5">
            Browse our collection — same-day delivery in Chandigarh & Tricity
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 bg-brand-600 text-white font-medium rounded-full hover:bg-brand-700 transition-colors"
            >
              Shop Plant Gifts
            </Link>
            <Link
              href="/plant-gifts-chandigarh"
              className="px-6 py-3 border border-brand-300 text-brand-700 font-medium rounded-full hover:bg-brand-100 transition-colors"
            >
              Plant Gifts Chandigarh
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">
            Related Articles
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-4 border border-neutral-100 rounded-xl hover:shadow-md transition-all group"
                >
                  <span className="text-xs text-brand-600 font-medium">
                    {related.category}
                  </span>
                  <h4 className="font-medium text-neutral-900 mt-1 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-8 text-sm text-neutral-500 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

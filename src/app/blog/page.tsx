import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { ChevronRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-brand-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-medium">Blog</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-3">
            Plantgen Blog
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl">
            Tips on plant gifting, indoor plant care, eco-friendly gifts, and
            corporate gifting from Chandigarh&apos;s plant gifting experts.
          </p>
        </header>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid sm:grid-cols-[280px_1fr] gap-6 p-5 bg-white border border-neutral-100 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto rounded-xl overflow-hidden bg-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 280px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <p className="text-xs text-neutral-400 mt-3">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

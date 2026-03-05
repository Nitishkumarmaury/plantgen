import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <p className="text-6xl font-serif font-bold text-neutral-200 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Page not found
        </h1>
        <p className="text-neutral-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
          >
            Browse Plants
          </Link>
        </div>
      </div>
    </div>
  );
}

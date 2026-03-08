import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageByRouteAndSlug, getTopSlugsForRoute } from "@/lib/seo/page-registry";
import { generatePageContent } from "@/lib/seo/content-engine";
import SEOPageTemplate from "@/components/seo/SEOPageTemplate";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getTopSlugsForRoute("guide", 30);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByRouteAndSlug("guide", slug);
  if (!page) return { title: "Not Found" };

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}${page.path}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `${SITE_URL}${page.path}`,
      siteName: "Plantgen",
      type: "website",
      locale: "en_IN",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPageByRouteAndSlug("guide", slug);
  if (!page) notFound();

  const content = generatePageContent(page);
  return <SEOPageTemplate page={page} content={content} />;
}

/**
 * Page Registry — Central system that generates all 100k+ SEO page slugs and
 * their associated metadata from dimension combinations.
 *
 * Usage:
 *   import { getAllPages, getPageBySlug, getTopPages } from "@/lib/seo/page-registry";
 *
 *   const top1000 = getTopPages(1000);          // for generateStaticParams
 *   const page    = getPageBySlug("plants-for-bedroom"); // for ISR
 */

import {
  plantTypes,
  rooms,
  useCases,
  occasions,
  cities,
  careLevels,
  type PlantDimension,
  type RoomDimension,
  type UseCaseDimension,
  type OccasionDimension,
  type CityDimension,
  type CareLevelDimension,
} from "@/data/seo/dimensions";

// ─── Types ──────────────────────────────────────────────────────────────────

export type SEORouteType =
  | "plants-for"
  | "best"
  | "plant-gifts"
  | "plant-delivery"
  | "guide";

export interface SEOPageDefinition {
  slug: string;
  route: SEORouteType;
  /** Full URL path, e.g. /plants-for/bedroom */
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** Primary long-tail keywords this page targets */
  keywords: string[];
  /** Priority 0–1 for sitemap ordering. Higher = more valuable. */
  priority: number;
  /** Dimension references — used by content engine & product matcher */
  dimensions: {
    plant?: PlantDimension;
    room?: RoomDimension;
    useCase?: UseCaseDimension;
    occasion?: OccasionDimension;
    city?: CityDimension;
    careLevel?: CareLevelDimension;
  };
}

// ─── Page Generators ────────────────────────────────────────────────────────
// Each generator function produces pages for one URL pattern.

function generatePlantsForPages(): SEOPageDefinition[] {
  const pages: SEOPageDefinition[] = [];

  // Room pages: /plants-for/bedroom
  for (const room of rooms) {
    pages.push({
      slug: room.slug,
      route: "plants-for",
      path: `/plants-for/${room.slug}`,
      title: `Best Plants for ${room.name} — Top Picks ${new Date().getFullYear()}`,
      metaDescription: `Discover the best plants for your ${room.name.toLowerCase()}. Expert-curated picks for ${room.idealConditions.toLowerCase()} conditions. Free delivery in Chandigarh.`,
      h1: `Best Plants for Your ${room.name}`,
      keywords: [...room.keywords, `plants for ${room.name.toLowerCase()}`, `best ${room.name.toLowerCase()} plants`],
      priority: 0.85,
      dimensions: { room },
    });
  }

  // Use case pages: /plants-for/air-purifying
  for (const uc of useCases) {
    pages.push({
      slug: uc.slug,
      route: "plants-for",
      path: `/plants-for/${uc.slug}`,
      title: `Best ${uc.name} Plants — Top Picks & Care Tips`,
      metaDescription: `Find the best ${uc.name.toLowerCase()} plants for your home and office. Curated recommendations with care guides. Shop at Plantgen.`,
      h1: `Best Plants for ${uc.name}`,
      keywords: uc.keywords,
      priority: 0.8,
      dimensions: { useCase: uc },
    });
  }

  // Care level audience: /plants-for/beginners
  for (const cl of careLevels) {
    pages.push({
      slug: cl.slug,
      route: "plants-for",
      path: `/plants-for/${cl.slug}`,
      title: `Best Plants for ${cl.name} — Easy Picks & Tips`,
      metaDescription: `Perfect plants for ${cl.name.toLowerCase()}. Curated for ease, beauty, and low maintenance. Explore at Plantgen.`,
      h1: `Best Plants for ${cl.name}`,
      keywords: cl.keywords,
      priority: 0.75,
      dimensions: { careLevel: cl },
    });
  }

  // Plant × Room (limited to top 10 plants × top 8 rooms to avoid thin content)
  for (const plant of plantTypes.slice(0, 10)) {
    for (const room of rooms.slice(0, 8)) {
      const slug = `${plant.slug}-in-${room.slug}`;
      pages.push({
        slug,
        route: "plants-for",
        path: `/plants-for/${slug}`,
        title: `${plant.name} for ${room.name} — Care Guide & Tips`,
        metaDescription: `Is ${plant.name} good for your ${room.name.toLowerCase()}? Complete guide for growing ${plant.name} in ${room.name.toLowerCase()} conditions. Buy at Plantgen.`,
        h1: `${plant.name} for Your ${room.name}`,
        keywords: [`${plant.name.toLowerCase()} for ${room.name.toLowerCase()}`, `${plant.name.toLowerCase()} ${room.name.toLowerCase()}`],
        priority: 0.55,
        dimensions: { plant, room },
      });
    }
  }

  // Use case × Room (limited to top 10 use cases × top 8 rooms)
  for (const uc of useCases.slice(0, 10)) {
    for (const room of rooms.slice(0, 8)) {
      const slug = `${uc.slug}-in-${room.slug}`;
      pages.push({
        slug,
        route: "plants-for",
        path: `/plants-for/${slug}`,
        title: `${uc.name} Plants for ${room.name} — Top Picks`,
        metaDescription: `Best ${uc.name.toLowerCase()} plants for your ${room.name.toLowerCase()}. Expert picks for ${room.idealConditions.toLowerCase()} conditions.`,
        h1: `${uc.name} Plants for Your ${room.name}`,
        keywords: [`${uc.name.toLowerCase()} plants for ${room.name.toLowerCase()}`],
        priority: 0.5,
        dimensions: { useCase: uc, room },
      });
    }
  }

  return pages;
}

function generateBestPages(): SEOPageDefinition[] {
  const pages: SEOPageDefinition[] = [];

  // best/{plant-slug}-plants: /best/snake-plant
  for (const plant of plantTypes) {
    pages.push({
      slug: `${plant.slug}-plants`,
      route: "best",
      path: `/best/${plant.slug}-plants`,
      title: `Best ${plant.name} Varieties — Growing Guide ${new Date().getFullYear()}`,
      metaDescription: `Everything about ${plant.name}: best varieties, care tips, benefits, and buying guide. ${plant.shortDesc}`,
      h1: `Best ${plant.name} Varieties & Growing Guide`,
      keywords: [`best ${plant.name.toLowerCase()}`, `${plant.name.toLowerCase()} care`, `${plant.name.toLowerCase()} guide`],
      priority: 0.7,
      dimensions: { plant },
    });
  }

  // best/{usecase}-plants: /best/air-purifying-plants
  for (const uc of useCases) {
    pages.push({
      slug: `${uc.slug}-plants`,
      route: "best",
      path: `/best/${uc.slug}-plants`,
      title: `Best ${uc.name} Plants — Expert Picks ${new Date().getFullYear()}`,
      metaDescription: `Top ${uc.name.toLowerCase()} plants ranked by experts. ${uc.contentHook.slice(0, 100)}`,
      h1: `Best ${uc.name} Plants`,
      keywords: [`best ${uc.name.toLowerCase()} plants`, ...uc.keywords],
      priority: 0.75,
      dimensions: { useCase: uc },
    });
  }

  // best/{plant}-for-{room}: /best/snake-plant-for-bedroom
  for (const plant of plantTypes.slice(0, 15)) {
    for (const room of rooms.slice(0, 8)) {
      const slug = `${plant.slug}-for-${room.slug}`;
      pages.push({
        slug,
        route: "best",
        path: `/best/${slug}`,
        title: `Best ${plant.name} for ${room.name} — Complete Guide`,
        metaDescription: `How to grow ${plant.name} in your ${room.name.toLowerCase()}. Light, water, placement tips and where to buy.`,
        h1: `Best ${plant.name} for ${room.name}`,
        keywords: [`${plant.name.toLowerCase()} for ${room.name.toLowerCase()}`],
        priority: 0.45,
        dimensions: { plant, room },
      });
    }
  }

  return pages;
}

function generatePlantGiftPages(): SEOPageDefinition[] {
  const pages: SEOPageDefinition[] = [];

  // Single occasion: /plant-gifts/birthday
  for (const occ of occasions) {
    pages.push({
      slug: occ.slug,
      route: "plant-gifts",
      path: `/plant-gifts/${occ.slug}`,
      title: `Plant Gifts for ${occ.name} — Meaningful Green Gifts`,
      metaDescription: `Find the perfect plant gift for ${occ.name.toLowerCase()}. Eco-friendly, long-lasting, and meaningful. Same-day delivery in Chandigarh.`,
      h1: `Best Plant Gifts for ${occ.name}`,
      keywords: occ.keywords,
      priority: 0.8,
      dimensions: { occasion: occ },
    });
  }

  // Occasion × City (limited to local delivery cities only)
  for (const occ of occasions) {
    for (const city of cities.filter((c) => c.localDelivery)) {
      const slug = `${occ.slug}-in-${city.slug}`;
      pages.push({
        slug,
        route: "plant-gifts",
        path: `/plant-gifts/${slug}`,
        title: `${occ.name} Plant Gifts in ${city.name} — Delivery Available`,
        metaDescription: `Send a plant gift for ${occ.name.toLowerCase()} in ${city.name}. ${city.localDelivery ? "Same-day delivery available." : "Reliable delivery."} Shop at Plantgen.`,
        h1: `${occ.name} Plant Gifts in ${city.name}`,
        keywords: [`${occ.name.toLowerCase()} plant gift ${city.name.toLowerCase()}`, `send plant ${city.name.toLowerCase()}`],
        priority: city.localDelivery ? 0.7 : 0.4,
        dimensions: { occasion: occ, city },
      });
    }
  }

  // Plant × Occasion (limited to top 10 plants × top 10 occasions)
  for (const plant of plantTypes.slice(0, 10)) {
    for (const occ of occasions.slice(0, 10)) {
      const slug = `${plant.slug}-for-${occ.slug}`;
      pages.push({
        slug,
        route: "plant-gifts",
        path: `/plant-gifts/${slug}`,
        title: `${plant.name} Gift for ${occ.name} — Why It's Perfect`,
        metaDescription: `Gift a ${plant.name} for ${occ.name.toLowerCase()}. ${plant.shortDesc} Buy now at Plantgen with gift wrapping.`,
        h1: `${plant.name} as a ${occ.name} Gift`,
        keywords: [`${plant.name.toLowerCase()} gift for ${occ.name.toLowerCase()}`],
        priority: 0.45,
        dimensions: { plant, occasion: occ },
      });
    }
  }

  return pages;
}

function generateDeliveryPages(): SEOPageDefinition[] {
  const pages: SEOPageDefinition[] = [];

  // City pages: /plant-delivery/chandigarh
  for (const city of cities) {
    pages.push({
      slug: city.slug,
      route: "plant-delivery",
      path: `/plant-delivery/${city.slug}`,
      title: `Plant Delivery in ${city.name} — Fresh Plants to Your Door`,
      metaDescription: `Order plants online in ${city.name}. ${city.localDelivery ? "Same-day & next-day delivery." : "Reliable all-India shipping."} Indoor plants, gifts & more. Shop Plantgen.`,
      h1: `Plant Delivery in ${city.name}`,
      keywords: city.keywords,
      priority: city.localDelivery ? 0.85 : 0.55,
      dimensions: { city },
    });
  }

  // Plant × City (limited to local delivery cities only)
  for (const plant of plantTypes) {
    for (const city of cities.filter((c) => c.localDelivery)) {
      const slug = `${plant.slug}-in-${city.slug}`;
      pages.push({
        slug,
        route: "plant-delivery",
        path: `/plant-delivery/${slug}`,
        title: `Buy ${plant.name} in ${city.name} — Online Delivery`,
        metaDescription: `Buy ${plant.name} online in ${city.name} with ${city.localDelivery ? "same-day" : "fast"} delivery. ${plant.shortDesc}`,
        h1: `${plant.name} Delivery in ${city.name}`,
        keywords: [`buy ${plant.name.toLowerCase()} ${city.name.toLowerCase()}`, `${plant.name.toLowerCase()} delivery ${city.name.toLowerCase()}`],
        priority: city.localDelivery ? 0.6 : 0.3,
        dimensions: { plant, city },
      });
    }
  }

  // Use case × City (limited to local delivery cities only)
  for (const uc of useCases) {
    for (const city of cities.filter((c) => c.localDelivery)) {
      const slug = `${uc.slug}-in-${city.slug}`;
      pages.push({
        slug,
        route: "plant-delivery",
        path: `/plant-delivery/${slug}`,
        title: `${uc.name} Plants in ${city.name} — Buy Online`,
        metaDescription: `Order ${uc.name.toLowerCase()} plants online in ${city.name}. Curated picks delivered to your door. Shop Plantgen.`,
        h1: `${uc.name} Plants in ${city.name}`,
        keywords: [`${uc.name.toLowerCase()} plants ${city.name.toLowerCase()}`],
        priority: city.localDelivery ? 0.5 : 0.25,
        dimensions: { useCase: uc, city },
      });
    }
  }

  return pages;
}

function generateGuidePages(): SEOPageDefinition[] {
  const pages: SEOPageDefinition[] = [];

  // Plant care guides: /guide/snake-plant-care
  for (const plant of plantTypes) {
    pages.push({
      slug: `${plant.slug}-care`,
      route: "guide",
      path: `/guide/${plant.slug}-care`,
      title: `${plant.name} Care Guide — Light, Water, Soil & Tips`,
      metaDescription: `Complete ${plant.name} care guide. Learn about watering, light needs, soil, propagation, and common problems. Expert tips from Plantgen.`,
      h1: `How to Care for ${plant.name}`,
      keywords: [`${plant.name.toLowerCase()} care`, `how to care for ${plant.name.toLowerCase()}`, `${plant.name.toLowerCase()} watering`],
      priority: 0.7,
      dimensions: { plant },
    });
  }

  // Room guides: /guide/bedroom-plants
  for (const room of rooms) {
    pages.push({
      slug: `${room.slug}-plants`,
      route: "guide",
      path: `/guide/${room.slug}-plants`,
      title: `Complete ${room.name} Plant Guide — Best Picks & Tips`,
      metaDescription: `Everything you need to know about ${room.name.toLowerCase()} plants. Which plants suit ${room.idealConditions.toLowerCase()}, how to arrange them, and what to avoid.`,
      h1: `The Ultimate Guide to ${room.name} Plants`,
      keywords: [`${room.name.toLowerCase()} plants guide`, `how to choose ${room.name.toLowerCase()} plants`],
      priority: 0.65,
      dimensions: { room },
    });
  }

  // Care level guides: /guide/plant-care-for-beginners
  for (const cl of careLevels) {
    pages.push({
      slug: `plant-care-for-${cl.slug}`,
      route: "guide",
      path: `/guide/plant-care-for-${cl.slug}`,
      title: `Plant Care for ${cl.name} — Complete Getting Started Guide`,
      metaDescription: `New to plants? This beginner-friendly guide covers everything ${cl.name.toLowerCase()} need to start a thriving indoor garden.`,
      h1: `Plant Care Guide for ${cl.name}`,
      keywords: [`plant care for ${cl.name.toLowerCase()}`, ...cl.keywords],
      priority: 0.7,
      dimensions: { careLevel: cl },
    });
  }

  return pages;
}

// ─── Registry ───────────────────────────────────────────────────────────────

let _allPages: SEOPageDefinition[] | null = null;
let _slugIndex: Map<string, SEOPageDefinition> | null = null;
let _routeIndex: Map<SEORouteType, Map<string, SEOPageDefinition>> | null = null;

function buildRegistry() {
  if (_allPages) return;

  _allPages = [
    ...generatePlantsForPages(),
    ...generateBestPages(),
    ...generatePlantGiftPages(),
    ...generateDeliveryPages(),
    ...generateGuidePages(),
  ];

  _slugIndex = new Map();
  _routeIndex = new Map();

  for (const page of _allPages) {
    // Global slug index (route + slug combo for uniqueness)
    const key = `${page.route}:${page.slug}`;
    _slugIndex.set(key, page);

    // Route-specific index
    if (!_routeIndex.has(page.route)) {
      _routeIndex.set(page.route, new Map());
    }
    _routeIndex.get(page.route)!.set(page.slug, page);
  }
}

/** Get all generated pages */
export function getAllPages(): SEOPageDefinition[] {
  buildRegistry();
  return _allPages!;
}

/** Total page count */
export function getTotalPageCount(): number {
  return getAllPages().length;
}

/** Look up a page by its route type and slug */
export function getPageByRouteAndSlug(
  route: SEORouteType,
  slug: string
): SEOPageDefinition | undefined {
  buildRegistry();
  return _routeIndex?.get(route)?.get(slug);
}

/** Get all pages for a specific route */
export function getPagesByRoute(route: SEORouteType): SEOPageDefinition[] {
  buildRegistry();
  const routeMap = _routeIndex?.get(route);
  return routeMap ? Array.from(routeMap.values()) : [];
}

/** Get top N pages sorted by priority (for generateStaticParams) */
export function getTopPages(n: number): SEOPageDefinition[] {
  return getAllPages()
    .sort((a, b) => b.priority - a.priority)
    .slice(0, n);
}

/** Get top slugs for a specific route (for generateStaticParams) */
export function getTopSlugsForRoute(
  route: SEORouteType,
  n: number
): string[] {
  return getPagesByRoute(route)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, n)
    .map((p) => p.slug);
}

/** Get related pages for internal linking */
export function getRelatedPages(
  page: SEOPageDefinition,
  limit = 8
): SEOPageDefinition[] {
  const all = getAllPages();
  const dims = page.dimensions;

  // Score each page based on dimension overlap
  const scored = all
    .filter((p) => p.path !== page.path)
    .map((candidate) => {
      let score = 0;
      const cd = candidate.dimensions;
      if (dims.plant && cd.plant?.slug === dims.plant.slug) score += 3;
      if (dims.room && cd.room?.slug === dims.room.slug) score += 2;
      if (dims.useCase && cd.useCase?.slug === dims.useCase.slug) score += 2;
      if (dims.occasion && cd.occasion?.slug === dims.occasion.slug) score += 2;
      if (dims.city && cd.city?.slug === dims.city.slug) score += 1;
      if (dims.careLevel && cd.careLevel?.slug === dims.careLevel.slug) score += 1;
      // Prefer different route types for diversity
      if (candidate.route !== page.route) score += 0.5;
      return { page: candidate, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.page);
}

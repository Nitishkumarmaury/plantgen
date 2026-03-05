const PEXELS_API_KEY = process.env.PEXELS_API_KEY || "";
const PEXELS_SEARCH_URL = "https://api.pexels.com/v1/search";

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
}

// In-memory cache for Pexels images
const imageCache = new Map<string, string[]>();

export async function fetchPlantImages(
  query: string,
  perPage: number = 5
): Promise<string[]> {
  const cacheKey = `${query}-${perPage}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: perPage.toString(),
      orientation: "portrait",
    });

    const response = await fetch(`${PEXELS_SEARCH_URL}?${params}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data: PexelsResponse = await response.json();
    const images = data.photos.map((photo) => photo.src.large2x);

    imageCache.set(cacheKey, images);
    return images;
  } catch (error) {
    console.error("Failed to fetch Pexels images:", error);
    return [];
  }
}

export async function fetchSinglePlantImage(
  query: string
): Promise<string | null> {
  const images = await fetchPlantImages(query, 1);
  return images.length > 0 ? images[0] : null;
}

export type { PexelsPhoto, PexelsResponse };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-plant-gifts-birthday-chandigarh",
    title: "Best Plant Gifts for Birthday in Chandigarh — 2026 Guide",
    description:
      "Discover the most unique and meaningful birthday plant gifts available in Chandigarh. From indoor plants to succulents — surprise your loved ones with a gift that grows.",
    date: "2026-03-08",
    readTime: "6 min read",
    category: "Plant Gifting",
    keywords: [
      "birthday plant gift chandigarh",
      "best birthday gift chandigarh",
      "plant birthday gift ideas",
      "unique birthday gifts chandigarh",
    ],
    image: "/plants/indoor_plants/peace_lily_pot_03.jpg",
  },
  {
    slug: "indoor-plants-chandigarh-weather",
    title: "10 Best Indoor Plants for Chandigarh Weather (Summer & Winter Guide)",
    description:
      "Expert guide to indoor plants that thrive in Chandigarh's extreme weather — from 45°C summers to cold winters. Low-maintenance picks for every home.",
    date: "2026-03-06",
    readTime: "8 min read",
    category: "Plant Care",
    keywords: [
      "indoor plants chandigarh",
      "best plants chandigarh weather",
      "plants for chandigarh summer",
      "low maintenance plants chandigarh",
    ],
    image: "/plants/indoor_plants/snake_plant_pot_02.jpg",
  },
  {
    slug: "corporate-plant-gifting-chandigarh",
    title: "Corporate Plant Gifting in Chandigarh — Why Companies Are Switching",
    description:
      "How Chandigarh businesses are replacing generic corporate gifts with eco-friendly plant gifts. Guide to employee welcome kits, client gifts & event giveaways.",
    date: "2026-03-04",
    readTime: "7 min read",
    category: "Corporate Gifting",
    keywords: [
      "corporate gifting chandigarh",
      "corporate plant gifts",
      "employee welcome gifts chandigarh",
      "eco friendly corporate gifts",
    ],
    image: "/plants/corporate_gift_plants/branded_pot_set_01.jpg",
  },
];

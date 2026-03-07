/**
 * Content Engine — Generates unique, SEO-friendly content for each
 * programmatic page by combining content blocks from dimensions.
 *
 * Two modes:
 * 1. Template-based (default): instant, no API cost, good quality
 * 2. AI-enhanced (optional): calls OpenAI for richer introductions
 *
 * Each page gets: intro, benefits, care tips, FAQs, and product context.
 * Content uniqueness comes from combining different dimension-specific blocks.
 */

import type { SEOPageDefinition } from "./page-registry";
import type { Product } from "@/types";
import { products } from "@/data/products";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PageContent {
  intro: string;
  benefits: string[];
  careTips: string[];
  faqs: FAQ[];
  buyingTips: string[];
  /** Contextual paragraph for the page — varies by dimension combo */
  contextParagraph: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ─── Product Matcher ────────────────────────────────────────────────────────

export function getRelevantProducts(
  page: SEOPageDefinition,
  limit = 8
): Product[] {
  const dims = page.dimensions;

  const scored = products.map((product) => {
    let score = 0;
    const nameLower = product.name.toLowerCase();
    const tags = product.tags.map((t) => t.toLowerCase());

    // Match by plant dimension
    if (dims.plant) {
      for (const match of dims.plant.productMatch) {
        if (nameLower.includes(match.toLowerCase())) score += 10;
      }
      for (const tag of dims.plant.tagMatch) {
        if (tags.includes(tag)) score += 3;
      }
    }

    // Match by use case / benefit tags
    if (dims.useCase) {
      for (const tag of dims.useCase.productTagMatch) {
        if (tags.includes(tag)) score += 5;
      }
    }

    // Match by occasion tags
    if (dims.occasion) {
      for (const tag of dims.occasion.productTagMatch) {
        if (tags.includes(tag)) score += 5;
      }
    }

    // Match by care level
    if (dims.careLevel) {
      for (const tag of dims.careLevel.productTagMatch) {
        if (tags.includes(tag)) score += 4;
      }
    }

    // Room-based matching (heuristic)
    if (dims.room) {
      const roomSlug = dims.room.slug;
      if (
        (roomSlug === "office" || roomSlug === "corporate-office") &&
        (product.category === "Desk Plants" || product.category === "Corporate Gifts")
      )
        score += 5;
      if (
        (roomSlug === "bedroom" || roomSlug === "living-room" || roomSlug === "study-room") &&
        product.category === "Indoor Plants"
      )
        score += 3;
      if (
        roomSlug === "balcony" || roomSlug === "terrace"
          ? product.category === "Outdoor Plants" || product.category === "Flowering Plants"
          : false
      )
        score += 4;
      if (roomSlug === "kitchen" && product.category === "Herbs") score += 5;
      if (roomSlug === "pooja-room" && tags.some((t) => t.includes("tulsi") || t.includes("sacred")))
        score += 5;
    }

    // Boost featured / best sellers
    if (product.featured) score += 1;
    if (product.bestSeller) score += 1;

    return { product, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.product);
}

// ─── Content Generators per Dimension ───────────────────────────────────────

function getRoomContent(slug: string): Partial<PageContent> {
  const roomContent: Record<string, Partial<PageContent>> = {
    bedroom: {
      benefits: [
        "Purify air while you sleep — removing toxins like formaldehyde",
        "Release oxygen at night (Snake Plant, Aloe Vera)",
        "Boost humidity for better skin and breathing",
        "Reduce stress and promote deeper, more restful sleep",
      ],
      careTips: [
        "Place in corners that get indirect light from a window",
        "Avoid over-watering — bedroom plants typically need less water",
        "Choose non-fragrant plants to avoid disrupting sleep",
        "Wipe leaves weekly to keep air-purifying efficiency high",
      ],
      faqs: [
        { question: "Is it safe to keep plants in the bedroom?", answer: "Absolutely! Bedroom plants are completely safe. The amount of CO₂ they release at night is negligible compared to what a sleeping human exhales. Plants like Snake Plant and Aloe Vera actually release oxygen at night." },
        { question: "Which plant gives oxygen at night?", answer: "Snake Plant (Sansevieria), Aloe Vera, and Areca Palm are the top picks for nighttime oxygen release. These CAM plants keep their stomata open at night." },
        { question: "How many plants should I keep in my bedroom?", answer: "NASA recommends at least 2-3 plants per 100 sq ft room for effective air purification. For an average bedroom, 3-5 plants is ideal." },
      ],
    },
    office: {
      benefits: [
        "Boost productivity by up to 15% (University of Exeter study)",
        "Reduce stress hormones and increase focus during work",
        "Absorb noise and improve acoustics in open offices",
        "Filter VOCs from printers, screens, and office furniture",
      ],
      careTips: [
        "Choose plants that thrive in air-conditioned environments",
        "Use self-watering pots to avoid over/under-watering at work",
        "Position near your monitor to reduce eye strain naturally",
        "Avoid direct AC airflow — it dries out most plants",
      ],
      faqs: [
        { question: "What are the best low-maintenance office plants?", answer: "ZZ Plant, Snake Plant, and Pothos are the top 3 office picks. They survive in low light, infrequent watering, and air conditioning — basically thriving on benign neglect." },
        { question: "Do desk plants really improve productivity?", answer: "Yes! Multiple studies confirm that having plants within view at work increases productivity by 12-15%, reduces stress by 37%, and decreases sick days by 60%." },
        { question: "Can plants survive in an AC office?", answer: "Yes, many plants thrive in AC. ZZ Plant, Snake Plant, Chinese Evergreen, and Dracaena handle air-conditioned offices well. Avoid tropical ferns that need high humidity." },
      ],
    },
    "living-room": {
      benefits: [
        "Create a stunning focal point with large statement plants",
        "Purify the air in your most-used room",
        "Improve mood and reduce anxiety for the whole family",
        "Add natural texture and colour to your interior design",
      ],
      careTips: [
        "Choose a mix of sizes — tall floor plants and small table plants",
        "Use decorative pots that match your interior style",
        "Rotate plants quarterly for even growth towards light",
        "Group humidity-loving plants together for a micro-climate",
      ],
      faqs: [
        { question: "Which large plants look best in the living room?", answer: "Fiddle Leaf Fig, Monstera, Areca Palm, and Rubber Plant make stunning living room statement plants. They grow 3-6 feet tall and add instant drama." },
        { question: "How to arrange plants in the living room?", answer: "Use the 'triangle rule' — place plants at three different heights. Put a tall plant in a corner, medium ones on shelves, and small ones on the coffee table." },
      ],
    },
    bathroom: {
      benefits: [
        "Thrive in humidity that most other plants hate",
        "Add spa-like ambiance to your daily routine",
        "Absorb excess moisture and reduce mold growth",
        "Purify air in a small enclosed space effectively",
      ],
      careTips: [
        "Choose humidity-loving tropicals like ferns and pothos",
        "Ensure some natural or bright artificial light reaches them",
        "Don't over-water — the shower steam provides natural humidity",
        "Place on windowsills or hang from shower curtain rods",
      ],
      faqs: [
        { question: "Can plants survive in a bathroom with no window?", answer: "It's challenging but possible. Pothos, ZZ Plant, and Snake Plant can tolerate low-light bathrooms. Consider a grow light if there's zero natural light." },
        { question: "Best plants for a humid bathroom?", answer: "Boston Fern, Pothos, Spider Plant, and Peace Lily absolutely love bathroom humidity. They'll thrive where other houseplants would struggle." },
      ],
    },
  };

  return roomContent[slug] || getDefaultRoomContent();
}

function getDefaultRoomContent(): Partial<PageContent> {
  return {
    benefits: [
      "Purify indoor air by removing common household toxins",
      "Create a calming, natural atmosphere in any room",
      "Boost mood and reduce stress levels naturally",
      "Add colour, texture, and life to your space",
    ],
    careTips: [
      "Match the plant to the room's light conditions",
      "Water on a consistent schedule — most prefer once a week",
      "Ensure proper drainage to prevent root rot",
      "Dust leaves monthly to keep them photosynthesising efficiently",
    ],
    faqs: [
      { question: "Which indoor plants need the least care?", answer: "Snake Plant, ZZ Plant, and Pothos are the most forgiving indoor plants. They tolerate low light, irregular watering, and almost any indoor temperature." },
      { question: "How often should I water indoor plants?", answer: "Most indoor plants do well with watering once a week. Always check the top inch of soil — if it's dry, water thoroughly. If still moist, wait a few more days." },
    ],
  };
}

function getUseCaseContent(slug: string): Partial<PageContent> {
  const content: Record<string, Partial<PageContent>> = {
    "air-purifying": {
      benefits: [
        "Remove formaldehyde, benzene, and trichloroethylene from indoor air",
        "Reduce sick building syndrome symptoms by up to 34%",
        "Increase indoor oxygen levels naturally",
        "Lower carbon dioxide concentrations in enclosed spaces",
      ],
      faqs: [
        { question: "Which plant purifies air the most?", answer: "According to NASA's Clean Air Study, Peace Lily, Snake Plant, and Areca Palm are the top 3 air purifiers. A single Peace Lily can clean the air in a 100 sq ft room." },
        { question: "How many air-purifying plants do I need?", answer: "NASA recommends 15-18 good-sized plants for a 1,800 sq ft home. That's roughly 1 plant per 100 sq ft for effective air purification." },
        { question: "Do air-purifying plants work in AC rooms?", answer: "Yes! In fact, air-purifying plants are even more valuable in AC rooms because sealed environments trap pollutants. Snake Plant and ZZ Plant handle AC conditions particularly well." },
      ],
    },
    "low-maintenance": {
      benefits: [
        "Survive weeks without watering — perfect for forgetful owners",
        "Tolerate a wide range of light conditions",
        "Resist common pests and diseases",
        "Grow steadily without frequent fertilizing or pruning",
      ],
      faqs: [
        { question: "What plant is absolutely impossible to kill?", answer: "The ZZ Plant is virtually indestructible. It survives months of neglect, low light, no fertilizer, and irregular watering. Pothos and Snake Plant are close runners-up." },
        { question: "Can I leave plants unwatered for 2 weeks?", answer: "Yes! ZZ Plant, Snake Plant, all succulents, and most cacti easily survive 2-3 weeks without water. Before leaving, water thoroughly and move them out of direct sun." },
      ],
    },
    gifting: {
      benefits: [
        "Eco-friendly alternative to plastic gifts and cut flowers",
        "Lasts for years, not days — a gift that keeps growing",
        "Carries symbolic meaning (luck, prosperity, love, health)",
        "Comes beautifully wrapped and ready to gift",
      ],
      faqs: [
        { question: "Is a plant a good gift?", answer: "Plants are one of the most thoughtful gifts you can give. They're eco-friendly, long-lasting, symbolise growth and care, and remind the receiver of you every time they water it." },
        { question: "Which plant is best for gifting?", answer: "Lucky Bamboo (luck), Jade Plant (prosperity), Peace Lily (sympathy), and Money Plant (fortune) are top gifting picks. For corporate gifts, Bonsai and Succulents are elegant choices." },
        { question: "Do you offer gift wrapping?", answer: "Yes! All Plantgen deliveries come with premium gift wrapping options and personalised message cards at a nominal cost of ₹49." },
      ],
    },
  };

  return content[slug] || getDefaultUseCaseContent();
}

function getDefaultUseCaseContent(): Partial<PageContent> {
  return {
    benefits: [
      "Improve indoor air quality and oxygen levels",
      "Reduce stress, anxiety, and boost overall well-being",
      "Add natural beauty and biophilic design to your space",
      "Low cost, high impact way to transform any room",
    ],
    faqs: [
      { question: "Where can I buy plants online in India?", answer: "Plantgen offers a curated selection of healthy, well-potted plants with same-day delivery in Chandigarh & Tricity. Browse our shop for indoor plants, succulents, herbs, and gift plants." },
      { question: "Do indoor plants improve health?", answer: "Yes! Studies show indoor plants reduce stress by 37%, improve air quality, boost productivity by 15%, and even speed up hospital recovery. They're a natural wellness investment." },
    ],
  };
}

function getOccasionContent(slug: string): Partial<PageContent> {
  const defaults: Partial<PageContent> = {
    benefits: [
      "A meaningful, eco-friendly gift that keeps growing",
      "Symbolises lasting wishes of health, luck, and prosperity",
      "Premium gift wrapping and personalised message cards available",
      "Same-day delivery in Chandigarh & Tricity",
    ],
    buyingTips: [
      "Choose a plant that matches the recipient's care ability",
      "Add a personalised message card for a special touch",
      "Select gift wrapping for a ready-to-present experience",
      "Consider the recipient's home lighting when choosing a plant",
    ],
    faqs: [
      { question: "Can I add a gift message?", answer: "Yes! During checkout, you can add a personalised message that will be beautifully printed on a premium card and included with the plant." },
      { question: "Is same-day delivery available?", answer: "Same-day delivery is available in Chandigarh, Mohali, Panchkula & Zirakpur for orders placed before 2 PM. For other cities, standard delivery takes 3-7 business days." },
    ],
  };
  return defaults;
}

function getCityContent(slug: string, cityName: string, isLocal: boolean): Partial<PageContent> {
  return {
    benefits: isLocal
      ? [
          `Same-day plant delivery across ${cityName}`,
          "Hand-delivered by our team — no courier damage",
          "Cash on Delivery (COD) available",
          "Free delivery above ₹599",
        ]
      : [
          `Reliable plant delivery to ${cityName} via trusted logistics`,
          "Plants packed in custom protective packaging",
          "Live tracking available for all orders",
          "Healthy plant guarantee — damaged plants replaced free",
        ],
    faqs: [
      {
        question: `How fast is plant delivery in ${cityName}?`,
        answer: isLocal
          ? `We offer same-day delivery in ${cityName} for orders placed before 2 PM. Next-day delivery is guaranteed for all other orders.`
          : `Delivery to ${cityName} typically takes 3-7 business days. Plants are packed in custom breathable boxes to ensure they arrive healthy and fresh.`,
      },
      {
        question: `Is COD available in ${cityName}?`,
        answer: isLocal
          ? `Yes! Cash on Delivery is available for all orders in ${cityName} at no extra charge.`
          : `Currently, COD is available for Chandigarh Tricity orders only. For ${cityName}, we accept all major payment methods including UPI, cards, and net banking.`,
      },
    ],
  };
}

// ─── Main Content Generator ─────────────────────────────────────────────────

export function generatePageContent(page: SEOPageDefinition): PageContent {
  const dims = page.dimensions;
  let content: PageContent = {
    intro: "",
    benefits: [],
    careTips: [],
    faqs: [],
    buyingTips: [],
    contextParagraph: "",
  };

  // Build intro from dimension hooks
  const hooks: string[] = [];
  if (dims.room) hooks.push(dims.room.contentHook);
  if (dims.useCase) hooks.push(dims.useCase.contentHook);
  if (dims.occasion) hooks.push(dims.occasion.contentHook);
  if (dims.city) hooks.push(dims.city.contentHook);
  if (dims.careLevel) hooks.push(dims.careLevel.contentHook);
  if (dims.plant) hooks.push(dims.plant.shortDesc);

  content.intro = hooks.join(" ") || `Discover the best plants for every need at Plantgen. We offer curated, healthy plants with expert care guidance.`;

  // Merge content blocks by priority
  if (dims.room) {
    const rc = getRoomContent(dims.room.slug);
    content.benefits = rc.benefits || content.benefits;
    content.careTips = rc.careTips || content.careTips;
    content.faqs = [...content.faqs, ...(rc.faqs || [])];
  }

  if (dims.useCase) {
    const uc = getUseCaseContent(dims.useCase.slug);
    if (!content.benefits.length) content.benefits = uc.benefits || [];
    content.faqs = [...content.faqs, ...(uc.faqs || [])];
  }

  if (dims.occasion) {
    const oc = getOccasionContent(dims.occasion.slug);
    if (!content.benefits.length) content.benefits = oc.benefits || [];
    content.buyingTips = oc.buyingTips || [];
    content.faqs = [...content.faqs, ...(oc.faqs || [])];
  }

  if (dims.city) {
    const cc = getCityContent(dims.city.slug, dims.city.name, dims.city.localDelivery);
    if (!content.benefits.length) content.benefits = cc.benefits || [];
    content.faqs = [...content.faqs, ...(cc.faqs || [])];
  }

  // Fallback defaults
  if (!content.benefits.length) {
    content.benefits = [
      "Improve indoor air quality naturally",
      "Reduce stress and boost well-being",
      "Add natural beauty to any space",
      "Eco-friendly and long-lasting",
    ];
  }

  if (!content.careTips.length) {
    content.careTips = [
      "Water thoroughly when the top inch of soil feels dry",
      "Place in appropriate light — check each plant's specific needs",
      "Ensure pots have drainage holes to prevent root rot",
      "Feed with balanced fertiliser once a month during growing season",
    ];
  }

  // Ensure at least 2 FAQs
  if (content.faqs.length < 2) {
    content.faqs.push(
      { question: "Where can I buy plants online?", answer: "Plantgen offers a curated collection of healthy plants with same-day delivery in Chandigarh & Tricity. Browse our shop for indoor plants, succulents, herbs, and gifting plants." },
      { question: "How do I care for my new plant?", answer: "Each Plantgen order comes with a care card specific to your plant. Generally: water when the top soil is dry, provide appropriate light, and avoid cold drafts." },
    );
  }

  // Context paragraph for SEO richness
  content.contextParagraph = buildContextParagraph(page);

  // De-duplicate FAQs by question
  const seen = new Set<string>();
  content.faqs = content.faqs.filter((faq) => {
    const key = faq.question.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return content;
}

function buildContextParagraph(page: SEOPageDefinition): string {
  const dims = page.dimensions;
  const parts: string[] = [];

  if (dims.plant && dims.room) {
    parts.push(
      `The ${dims.plant.name} is an excellent choice for your ${dims.room.name.toLowerCase()}. With its ${dims.plant.shortDesc.toLowerCase().replace(/\.$/, "")}, it thrives in ${dims.room.idealConditions.toLowerCase()} — making it a natural fit for this space.`
    );
  } else if (dims.plant && dims.occasion) {
    parts.push(
      `${dims.plant.name} makes a wonderful ${dims.occasion.name.toLowerCase()} gift. ${dims.plant.shortDesc} When paired with our premium gift wrapping, it creates a memorable, eco-friendly present.`
    );
  } else if (dims.useCase && dims.city) {
    parts.push(
      `Looking for ${dims.useCase.name.toLowerCase()} plants in ${dims.city.name}? Plantgen delivers curated, healthy plants right to your doorstep. ${dims.useCase.contentHook}`
    );
  } else if (dims.plant && dims.city) {
    parts.push(
      `Buy ${dims.plant.name} online in ${dims.city.name} with ${dims.city.localDelivery ? "same-day" : "reliable"} delivery. ${dims.plant.shortDesc}`
    );
  } else if (dims.occasion && dims.city) {
    parts.push(
      `Send the perfect ${dims.occasion.name.toLowerCase()} plant gift in ${dims.city.name}. ${dims.occasion.contentHook} ${dims.city.contentHook}`
    );
  }

  if (!parts.length) {
    parts.push(
      `At Plantgen, we believe every plant tells a story. Whether you're looking for air-purifying champions, lucky gifting plants, or simply a green companion for your home, our curated collection has something for everyone. All plants come healthy, well-potted, and with a care guide.`
    );
  }

  return parts.join(" ");
}

// ─── AI Content Enhancement (Optional) ──────────────────────────────────────

/**
 * Optional: Enhance page intro using OpenAI API.
 * Call this in a build script to pre-generate content, then cache results.
 *
 * Usage (in scripts/generate-content.ts):
 *   const enhanced = await enhanceWithAI(page, templateContent);
 *
 * Requires OPENAI_API_KEY environment variable.
 */
export async function enhanceWithAI(
  page: SEOPageDefinition,
  templateContent: PageContent
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return templateContent.intro;

  const prompt = `Write a 150-word SEO-friendly introduction for a page titled "${page.h1}" about plants.

Context: ${page.metaDescription}
Target keywords: ${page.keywords.slice(0, 5).join(", ")}
Existing intro: ${templateContent.intro}

Requirements:
- Natural, helpful, engaging tone
- Include 2-3 target keywords naturally
- Mention "Plantgen" brand once
- End with a call to action to browse products
- Do NOT use generic filler phrases
- Write for an Indian audience interested in plants and gifting`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) return templateContent.intro;

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || templateContent.intro;
  } catch {
    return templateContent.intro;
  }
}

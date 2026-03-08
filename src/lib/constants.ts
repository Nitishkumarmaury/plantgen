/** Centralised contact & brand constants — single source of truth. */

export const SITE_URL = "https://plantgen.live";
export const SITE_NAME = "Plantgen";
export const SITE_TAGLINE = "Gift Growth. Gift Meaning.";

export const CONTACT = {
  address: "Chandigarh, India",
  areas: ["Chandigarh", "Mohali", "Panchkula", "Zirakpur"],
  phone: "+919555179269",
  whatsapp: "+919555179269",
  instagram: "https://www.instagram.com/plantgen.live?igsh=MWQwc2hmczQ4N284bQ%3D%3D&utm_source=qr",
} as const;

export const WHATSAPP_URL = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`;

export const INSTAGRAM_URL = CONTACT.instagram;

export const GIFT_WRAP_COST = 49; // ₹

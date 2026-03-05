export type ProductCategory =
  | "Indoor Plants"
  | "Desk Plants"
  | "Flowering Plants"
  | "Outdoor Plants"
  | "Herbs"
  | "Succulents"
  | "Corporate Gifts";

export type CareLevel = "Easy" | "Medium" | "Expert";

export type PlantType = "Indoor" | "Desk" | "Flowering" | "Outdoor" | "Herb" | "Succulent" | "Corporate";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: ProductCategory;
  plantType: PlantType;
  shortDescription: string;
  fullDescription: string;
  careLevel: CareLevel;
  lightRequirement: string;
  wateringFrequency: string;
  deliveryAvailability: string;
  codAvailable: boolean;
  imageUrl: string;
  imageUrl2?: string;
  tags: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  priceDrop?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftMessage?: string;
  giftWrap?: boolean;
}

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landmark?: string;
  deliveryDate: string;
  timeSlot: string;
  messageNote?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    giftWrap: boolean;
  }[];
  totalAmount: number;
  status: "pending" | "confirmed" | "out-for-delivery" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  label: string;
  value: string;
}

export const TIME_SLOTS: TimeSlot[] = [
  { label: "9:00 AM – 11:00 AM", value: "09:00-11:00" },
  { label: "11:00 AM – 1:00 PM", value: "11:00-13:00" },
  { label: "1:00 PM – 3:00 PM", value: "13:00-15:00" },
  { label: "3:00 PM – 5:00 PM", value: "15:00-17:00" },
  { label: "5:00 PM – 7:00 PM", value: "17:00-19:00" },
  { label: "7:00 PM – 9:00 PM", value: "19:00-21:00" },
];

export const CATEGORIES: ProductCategory[] = [
  "Indoor Plants",
  "Desk Plants",
  "Flowering Plants",
  "Outdoor Plants",
  "Herbs",
  "Succulents",
  "Corporate Gifts",
];

export const BUDGET_RANGES = [
  { label: "Under ₹400", min: 0, max: 399 },
  { label: "₹400 – ₹699", min: 400, max: 699 },
  { label: "₹700 – ₹999", min: 700, max: 999 },
  { label: "₹1,000+", min: 1000, max: 9999 },
];

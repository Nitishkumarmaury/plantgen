/**
 * SEO Dimensions — The building blocks for 100k+ programmatic pages.
 *
 * Every array here is a "dimension". Combining dimensions produces unique
 * long-tail keyword pages:
 *   plantTypes × rooms        →  "snake plant for bedroom"
 *   plantTypes × cities       →  "money plant delivery in chandigarh"
 *   occasions  × cities       →  "birthday plant gift in delhi"
 *   benefits   × rooms        →  "air purifying plants for office"
 *
 * To add pages, simply add entries. The page-registry picks them up
 * automatically.
 */

// ─── Plant Types ────────────────────────────────────────────────────────────

export interface PlantDimension {
  slug: string;
  name: string;
  /** Matches against Product.name (case-insensitive substring) */
  productMatch: string[];
  /** Matches against Product.tags */
  tagMatch: string[];
  shortDesc: string;
}

export const plantTypes: PlantDimension[] = [
  { slug: "money-plant", name: "Money Plant", productMatch: ["money plant"], tagMatch: ["indoor-plants"], shortDesc: "Easy-care trailing vine known for bringing prosperity and purifying air." },
  { slug: "snake-plant", name: "Snake Plant", productMatch: ["snake plant"], tagMatch: ["indoor-plants"], shortDesc: "Ultra-hardy air purifier that thrives on neglect — NASA recommended." },
  { slug: "peace-lily", name: "Peace Lily", productMatch: ["peace lily"], tagMatch: ["indoor-plants"], shortDesc: "Elegant white-bloomed plant that cleans indoor air beautifully." },
  { slug: "lucky-bamboo", name: "Lucky Bamboo", productMatch: ["lucky bamboo"], tagMatch: ["desk-plants", "corporate"], shortDesc: "Symbol of luck and fortune — the perfect meaningful gift." },
  { slug: "jade-plant", name: "Jade Plant", productMatch: ["jade"], tagMatch: ["succulents"], shortDesc: "Succulent money tree that symbolises wealth and good luck." },
  { slug: "aloe-vera", name: "Aloe Vera", productMatch: ["aloe"], tagMatch: ["succulents", "herbs"], shortDesc: "Medicinal powerhouse that soothes skin and purifies indoor air." },
  { slug: "spider-plant", name: "Spider Plant", productMatch: ["spider plant"], tagMatch: ["indoor-plants"], shortDesc: "Classic cascading plant that's virtually impossible to kill." },
  { slug: "pothos", name: "Pothos", productMatch: ["pothos", "golden pothos"], tagMatch: ["indoor-plants"], shortDesc: "Heart-shaped trailing vine perfect for beginners." },
  { slug: "rubber-plant", name: "Rubber Plant", productMatch: ["rubber plant"], tagMatch: ["indoor-plants"], shortDesc: "Bold glossy-leaved plant that makes a stunning statement." },
  { slug: "areca-palm", name: "Areca Palm", productMatch: ["areca palm"], tagMatch: ["indoor-plants"], shortDesc: "Natural humidifier with tropical resort vibes." },
  { slug: "monstera", name: "Monstera", productMatch: ["monstera"], tagMatch: ["indoor-plants"], shortDesc: "Iconic Swiss cheese plant with dramatic split leaves." },
  { slug: "zz-plant", name: "ZZ Plant", productMatch: ["zz plant"], tagMatch: ["indoor-plants"], shortDesc: "Ultra drought-tolerant plant with waxy architectural leaves." },
  { slug: "philodendron", name: "Philodendron", productMatch: ["philodendron"], tagMatch: ["indoor-plants"], shortDesc: "Lush heart-shaped leaves that adapt to most indoor environments." },
  { slug: "fiddle-leaf-fig", name: "Fiddle Leaf Fig", productMatch: ["fiddle leaf"], tagMatch: ["indoor-plants"], shortDesc: "Designer favourite with large violin-shaped leaves." },
  { slug: "calathea", name: "Calathea", productMatch: ["calathea"], tagMatch: ["indoor-plants"], shortDesc: "Prayer plant with mesmerising patterned foliage." },
  { slug: "english-ivy", name: "English Ivy", productMatch: ["english ivy"], tagMatch: ["indoor-plants"], shortDesc: "Timeless trailing vine that filters indoor pollutants." },
  { slug: "boston-fern", name: "Boston Fern", productMatch: ["boston fern"], tagMatch: ["indoor-plants"], shortDesc: "Lush feathery fronds that add a tropical touch." },
  { slug: "anthurium", name: "Anthurium", productMatch: ["anthurium"], tagMatch: ["indoor-plants", "flowering"], shortDesc: "Heart-shaped blooms in vivid red, pink and white." },
  { slug: "dracaena", name: "Dracaena", productMatch: ["dracaena"], tagMatch: ["indoor-plants"], shortDesc: "Colourful sword-shaped leaves that tolerate low light." },
  { slug: "succulent", name: "Succulent", productMatch: ["succulent"], tagMatch: ["succulents", "desk-plants"], shortDesc: "Compact water-storing cuties perfect for desks and windowsills." },
  { slug: "cactus", name: "Cactus", productMatch: ["cactus"], tagMatch: ["succulents", "desk-plants"], shortDesc: "Zero-fuss desert plants that need almost no water." },
  { slug: "tulsi", name: "Tulsi (Holy Basil)", productMatch: ["tulsi", "holy basil"], tagMatch: ["herbs"], shortDesc: "Sacred Indian herb revered for health and spiritual benefits." },
  { slug: "mint", name: "Mint", productMatch: ["mint"], tagMatch: ["herbs"], shortDesc: "Fragrant herb that freshens air and flavours your kitchen." },
  { slug: "lavender", name: "Lavender", productMatch: ["lavender"], tagMatch: ["flowering", "herbs"], shortDesc: "Calming purple blooms known for soothing stress and aiding sleep." },
  { slug: "rose", name: "Rose Plant", productMatch: ["rose"], tagMatch: ["flowering", "outdoor"], shortDesc: "Classic flowering plant that symbolises love and beauty." },
  { slug: "marigold", name: "Marigold", productMatch: ["marigold"], tagMatch: ["flowering", "outdoor"], shortDesc: "Vibrant golden flowers used in celebrations and festivals." },
  { slug: "bonsai", name: "Bonsai", productMatch: ["bonsai"], tagMatch: ["desk-plants", "indoor-plants"], shortDesc: "Miniature living sculpture — the ultimate thoughtful gift." },
  { slug: "bamboo-palm", name: "Bamboo Palm", productMatch: ["bamboo palm"], tagMatch: ["indoor-plants"], shortDesc: "Air-cleaning palm that brings calm tropical energy." },
  { slug: "croton", name: "Croton", productMatch: ["croton"], tagMatch: ["indoor-plants"], shortDesc: "Multi-coloured foliage that steals the spotlight in any room." },
  { slug: "dieffenbachia", name: "Dieffenbachia", productMatch: ["dieffenbachia"], tagMatch: ["indoor-plants"], shortDesc: "Bold tropical leaves with cream-and-green patterns." },
];

// ─── Rooms / Locations ──────────────────────────────────────────────────────

export interface RoomDimension {
  slug: string;
  name: string;
  keywords: string[];         // related search terms
  idealConditions: string;    // light & humidity
  contentHook: string;        // intro paragraph hook
}

export const rooms: RoomDimension[] = [
  { slug: "bedroom", name: "Bedroom", keywords: ["bedroom plants", "plants for sleeping", "oxygen at night"], idealConditions: "Low to medium indirect light, warm", contentHook: "Transform your bedroom into a restful sanctuary with plants that purify air while you sleep." },
  { slug: "living-room", name: "Living Room", keywords: ["living room plants", "large indoor plants"], idealConditions: "Bright indirect light, moderate humidity", contentHook: "Make your living room come alive with lush, statement-making plants that wow every guest." },
  { slug: "office", name: "Office", keywords: ["office plants", "desk plants for work", "plants for productivity"], idealConditions: "Fluorescent or indirect light, AC environment", contentHook: "Boost your productivity and reduce stress with the right plants on your office desk." },
  { slug: "bathroom", name: "Bathroom", keywords: ["bathroom plants", "humidity loving plants"], idealConditions: "Low light, high humidity", contentHook: "Turn your bathroom into a spa-like retreat with humidity-loving tropical plants." },
  { slug: "kitchen", name: "Kitchen", keywords: ["kitchen plants", "herbs for kitchen"], idealConditions: "Bright light, varying humidity", contentHook: "Add freshness and flavour to your kitchen with edible herbs and compact green plants." },
  { slug: "balcony", name: "Balcony", keywords: ["balcony plants", "outdoor balcony plants"], idealConditions: "Direct or bright indirect sunlight", contentHook: "Transform your balcony into a green escape with sun-loving plants and trailing vines." },
  { slug: "study-room", name: "Study Room", keywords: ["study room plants", "plants for concentration"], idealConditions: "Medium indirect light", contentHook: "Improve focus and concentration during study sessions with brain-boosting green plants." },
  { slug: "entrance", name: "Entrance / Foyer", keywords: ["entrance plants", "welcome plants"], idealConditions: "Variable light", contentHook: "Create a welcoming first impression with lush plants at your entrance or foyer." },
  { slug: "drawing-room", name: "Drawing Room", keywords: ["drawing room plants", "decorative indoor plants"], idealConditions: "Bright indirect light", contentHook: "Elevate your drawing room decor with elegant plants that double as living art." },
  { slug: "dining-room", name: "Dining Room", keywords: ["dining room plants", "table plants"], idealConditions: "Medium to bright indirect light", contentHook: "Set a naturally beautiful dining table with compact plants and fresh herb centrepieces." },
  { slug: "pooja-room", name: "Pooja Room", keywords: ["pooja room plants", "tulsi plant", "sacred plants"], idealConditions: "Indirect light, peaceful", contentHook: "Add spiritual significance to your pooja room with sacred and auspicious plants." },
  { slug: "hospital-room", name: "Hospital / Get Well", keywords: ["hospital plants", "get well plants"], idealConditions: "Low to medium light", contentHook: "Send healing wishes with plants that brighten a hospital room and purify the air." },
  { slug: "window-sill", name: "Window Sill", keywords: ["windowsill plants", "small plants"], idealConditions: "Bright direct or indirect light", contentHook: "Make the most of your sunlit window sills with compact, colourful plants." },
  { slug: "terrace", name: "Terrace", keywords: ["terrace garden", "rooftop plants"], idealConditions: "Full sun to partial shade", contentHook: "Build a stunning terrace garden with hardy outdoor plants and blooming flowers." },
  { slug: "corporate-office", name: "Corporate Office", keywords: ["corporate office plants", "office reception plants"], idealConditions: "AC environment, fluorescent light", contentHook: "Create a healthier, more productive corporate workspace with strategically placed plants." },
];

// ─── Use Cases / Benefits ───────────────────────────────────────────────────

export interface UseCaseDimension {
  slug: string;
  name: string;
  keywords: string[];
  contentHook: string;
  /** Tags to match products */
  productTagMatch: string[];
}

export const useCases: UseCaseDimension[] = [
  { slug: "air-purifying", name: "Air Purification", keywords: ["air purifying plants", "air cleaning plants", "plants that clean air"], contentHook: "Breathe cleaner air at home with NASA-studied air-purifying plants that remove toxins like formaldehyde and benzene.", productTagMatch: ["air-purifying"] },
  { slug: "low-maintenance", name: "Low Maintenance", keywords: ["low maintenance plants", "easy care plants", "hard to kill plants"], contentHook: "No green thumb? No problem. These incredibly forgiving plants thrive even when you forget about them.", productTagMatch: ["easy-care", "beginner-friendly"] },
  { slug: "beginners", name: "Beginners", keywords: ["plants for beginners", "easy plants for first time", "starter plants"], contentHook: "Starting your plant journey? These beginner-friendly plants are nearly impossible to kill and teach you the basics of plant parenthood.", productTagMatch: ["beginner-friendly", "easy-care"] },
  { slug: "feng-shui", name: "Feng Shui", keywords: ["feng shui plants", "lucky plants", "plants for positive energy"], contentHook: "Attract positive energy, prosperity, and harmony into your home with these powerful feng shui plants.", productTagMatch: ["indoor-plants"] },
  { slug: "vastu", name: "Vastu", keywords: ["vastu plants", "vastu shastra plants", "auspicious plants"], contentHook: "Align your home with Vastu Shastra principles using these auspicious plants placed in the right direction.", productTagMatch: ["indoor-plants"] },
  { slug: "oxygen-at-night", name: "Oxygen at Night", keywords: ["plants that give oxygen at night", "bedroom oxygen plants", "CAM plants"], contentHook: "Sleep better with plants that release oxygen after dark through Crassulacean Acid Metabolism (CAM).", productTagMatch: ["indoor-plants", "air-purifying"] },
  { slug: "stress-relief", name: "Stress Relief", keywords: ["stress relief plants", "calming plants", "plants for anxiety"], contentHook: "Reduce anxiety and cortisol levels naturally with scientifically-proven stress-busting plants.", productTagMatch: ["indoor-plants"] },
  { slug: "pet-friendly", name: "Pet Friendly", keywords: ["pet safe plants", "non toxic plants", "cat safe plants", "dog safe plants"], contentHook: "Keep your furry friends safe with these non-toxic, pet-friendly plants that are beautiful AND safe.", productTagMatch: ["indoor-plants", "beginner-friendly"] },
  { slug: "decoration", name: "Home Decoration", keywords: ["decorative plants", "aesthetic plants", "instagram plants"], contentHook: "Elevate your interior design game with these stunning statement plants that double as living decor.", productTagMatch: ["indoor-plants"] },
  { slug: "gifting", name: "Gifting", keywords: ["plant gifts", "gift plants", "plants as gifts"], contentHook: "Give the gift of growth. Plant gifts are meaningful, eco-friendly, and last longer than any bouquet.", productTagMatch: ["birthday-gift", "festive-gift"] },
  { slug: "productivity", name: "Productivity", keywords: ["plants for productivity", "plants for focus", "office productivity plants"], contentHook: "Studies show desk plants can boost productivity by up to 15%. Here are the best picks for your workspace.", productTagMatch: ["desk-plants", "indoor-plants"] },
  { slug: "nasa-recommended", name: "NASA Recommended", keywords: ["NASA plants", "NASA air purifying", "NASA clean air study"], contentHook: "NASA's Clean Air Study identified these plants as the most effective at removing indoor air pollutants.", productTagMatch: ["air-purifying"] },
  { slug: "negative-energy", name: "Remove Negative Energy", keywords: ["plants to remove negative energy", "positive energy plants"], contentHook: "Ward off negativity and invite positive vibrations into your home with these powerful energy-cleansing plants.", productTagMatch: ["indoor-plants"] },
  { slug: "good-luck", name: "Good Luck", keywords: ["lucky plants", "good luck plants", "plants for prosperity"], contentHook: "Invite fortune and prosperity into your life with these traditionally lucky plants endorsed by Feng Shui and Vastu.", productTagMatch: ["indoor-plants"] },
  { slug: "small-space", name: "Small Space / Apartment", keywords: ["plants for small spaces", "apartment plants", "compact plants"], contentHook: "Short on space? These compact, vertical, and hanging plants thrive in the tiniest apartments.", productTagMatch: ["desk-plants", "indoor-plants"] },
  { slug: "no-sunlight", name: "No Sunlight / Low Light", keywords: ["plants without sunlight", "low light plants", "dark room plants"], contentHook: "Even the darkest corners of your home can come alive with these shade-loving plants that need zero direct sunlight.", productTagMatch: ["indoor-plants", "easy-care"] },
  { slug: "fast-growing", name: "Fast Growing", keywords: ["fast growing plants", "quick growing indoor plants"], contentHook: "See results fast! These quick-growing plants will fill your space with lush green in weeks, not months.", productTagMatch: ["indoor-plants"] },
  { slug: "medicinal", name: "Medicinal Plants", keywords: ["medicinal plants", "healing plants", "ayurvedic plants"], contentHook: "Grow your own natural pharmacy at home with these medicinal plants used in Ayurveda for centuries.", productTagMatch: ["herbs"] },
  { slug: "mosquito-repellent", name: "Mosquito Repellent", keywords: ["mosquito repellent plants", "plants that repel insects"], contentHook: "Keep mosquitoes away naturally with these aromatic plants that bugs absolutely hate.", productTagMatch: ["herbs", "outdoor"] },
  { slug: "fragrant", name: "Fragrant / Aromatic", keywords: ["fragrant plants", "aromatic indoor plants", "plants that smell good"], contentHook: "Fill your home with natural fragrance from these aromatic plants — no candles or air fresheners needed.", productTagMatch: ["flowering", "herbs"] },
];

// ─── Gift Occasions ─────────────────────────────────────────────────────────

export interface OccasionDimension {
  slug: string;
  name: string;
  keywords: string[];
  contentHook: string;
  seasonality?: string; // helps with content freshness
  productTagMatch: string[];
}

export const occasions: OccasionDimension[] = [
  { slug: "birthday", name: "Birthday", keywords: ["birthday plant gift", "plant gift for birthday"], contentHook: "Make their birthday unforgettable with a living gift that grows with them year after year.", productTagMatch: ["birthday-gift", "birthday"] },
  { slug: "anniversary", name: "Anniversary", keywords: ["anniversary plant gift", "wedding anniversary plant"], contentHook: "Celebrate your love with a plant that represents growth, resilience, and beauty — just like your relationship.", productTagMatch: ["birthday-gift"] },
  { slug: "housewarming", name: "Housewarming", keywords: ["housewarming plant gift", "new home plant"], contentHook: "Welcome someone to their new home with a beautiful plant that brings life, luck and freshness.", productTagMatch: ["indoor-plants"] },
  { slug: "diwali", name: "Diwali", keywords: ["diwali plant gift", "eco friendly diwali gift"], contentHook: "This Diwali, gift green instead of crackers. Eco-friendly plant gifts that spread joy without pollution.", seasonality: "October-November", productTagMatch: ["festive-gift", "festive"] },
  { slug: "christmas", name: "Christmas", keywords: ["christmas plant gift", "holiday plant gift"], contentHook: "Add green cheer to the holidays with festive plant gifts that last well beyond Christmas morning.", seasonality: "December", productTagMatch: ["festive-gift", "festive"] },
  { slug: "new-year", name: "New Year", keywords: ["new year plant gift", "new year green gift"], contentHook: "Ring in the New Year with a fresh start — gift a plant that symbolises new beginnings and growth.", seasonality: "January", productTagMatch: ["festive-gift", "festive"] },
  { slug: "valentines-day", name: "Valentine's Day", keywords: ["valentine plant gift", "romantic plant gift"], contentHook: "Roses wilt in days. Gift a living plant this Valentine's that blooms year after year, just like your love.", seasonality: "February", productTagMatch: ["birthday-gift"] },
  { slug: "mothers-day", name: "Mother's Day", keywords: ["mother's day plant", "plant gift for mom"], contentHook: "Show Mom your love with a beautiful plant she'll nurture and enjoy every single day.", seasonality: "May", productTagMatch: ["birthday-gift"] },
  { slug: "fathers-day", name: "Father's Day", keywords: ["father's day plant", "plant gift for dad"], contentHook: "Gift Dad something that grows stronger every day — just like the bond you share.", seasonality: "June", productTagMatch: ["birthday-gift"] },
  { slug: "teachers-day", name: "Teacher's Day", keywords: ["teacher's day plant gift", "plant for teacher"], contentHook: "Thank a teacher who helped you grow with a plant that symbolises growth and gratitude.", seasonality: "September", productTagMatch: ["birthday-gift"] },
  { slug: "rakhi", name: "Raksha Bandhan", keywords: ["rakhi plant gift", "raksha bandhan eco gift"], contentHook: "Tie the bond of love with nature — gift your sibling a lucky plant this Raksha Bandhan.", seasonality: "August", productTagMatch: ["festive-gift", "festive"] },
  { slug: "wedding", name: "Wedding", keywords: ["wedding plant gift", "marriage gift plant"], contentHook: "Give the newlyweds a lasting symbol of their union — a beautiful plant they can nurture together.", productTagMatch: ["birthday-gift"] },
  { slug: "get-well-soon", name: "Get Well Soon", keywords: ["get well plant", "healing plant gift"], contentHook: "Send healing vibes with air-purifying plants that brighten a recovery room and lift spirits.", productTagMatch: ["indoor-plants", "air-purifying"] },
  { slug: "congratulations", name: "Congratulations", keywords: ["congratulations plant gift", "celebration plant"], contentHook: "Celebrate their achievement with a thriving plant — because success, like nature, deserves to be nurtured.", productTagMatch: ["birthday-gift"] },
  { slug: "thank-you", name: "Thank You", keywords: ["thank you plant gift", "gratitude plant"], contentHook: "Say thank you in the most meaningful way — with a living gift that keeps giving.", productTagMatch: ["birthday-gift"] },
  { slug: "farewell", name: "Farewell", keywords: ["farewell plant gift", "goodbye gift plant"], contentHook: "A farewell plant says 'I'll remember you' in a way words cannot. A gift that grows with memories.", productTagMatch: ["birthday-gift"] },
  { slug: "baby-shower", name: "Baby Shower", keywords: ["baby shower plant gift", "new baby plant"], contentHook: "Welcome the little one with a non-toxic, safe plant that grows alongside the new family.", productTagMatch: ["birthday-gift"] },
  { slug: "corporate-gift", name: "Corporate / Business", keywords: ["corporate plant gift", "office gift plant", "business gift plant"], contentHook: "Impress clients and motivate teams with elegant corporate plant gifts that show you care about sustainability.", productTagMatch: ["corporate"] },
  { slug: "eid", name: "Eid", keywords: ["eid plant gift", "eid mubarak plant"], contentHook: "Celebrate Eid with a green gift that brings blessings, beauty, and freshness into the home.", seasonality: "Variable", productTagMatch: ["festive-gift", "festive"] },
  { slug: "onam", name: "Onam", keywords: ["onam plant gift", "onam green gift"], contentHook: "Celebrate the harvest festival with lush plants that honour nature's bounty and Kerala's green traditions.", seasonality: "August-September", productTagMatch: ["festive-gift", "festive"] },
];

// ─── Cities ─────────────────────────────────────────────────────────────────

export interface CityDimension {
  slug: string;
  name: string;
  state: string;
  /** true = we do same-day/next-day delivery here */
  localDelivery: boolean;
  keywords: string[];
  contentHook: string;
}

export const cities: CityDimension[] = [
  // Primary delivery zone
  { slug: "chandigarh", name: "Chandigarh", state: "Chandigarh", localDelivery: true, keywords: ["plant delivery chandigarh", "buy plants chandigarh"], contentHook: "Get same-day plant delivery across Chandigarh — from Sector 17 to Sector 63 and beyond." },
  { slug: "mohali", name: "Mohali", state: "Punjab", localDelivery: true, keywords: ["plant delivery mohali", "buy plants mohali"], contentHook: "Order plants online in Mohali with fast local delivery to all phases and sectors." },
  { slug: "panchkula", name: "Panchkula", state: "Haryana", localDelivery: true, keywords: ["plant delivery panchkula", "buy plants panchkula"], contentHook: "Fresh plant delivery across Panchkula — from Sector 1 to Sector 30 and Kalka Road." },
  { slug: "zirakpur", name: "Zirakpur", state: "Punjab", localDelivery: true, keywords: ["plant delivery zirakpur", "buy plants zirakpur"], contentHook: "Quick plant delivery in Zirakpur including VIP Road, Ambala Highway, and surrounding areas." },
  // Tier 1 expansion cities
  { slug: "delhi", name: "Delhi", state: "Delhi", localDelivery: false, keywords: ["plant delivery delhi", "buy plants online delhi"], contentHook: "Order beautiful plants online in Delhi with reliable doorstep delivery across NCR." },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", localDelivery: false, keywords: ["plant delivery mumbai", "buy plants online mumbai"], contentHook: "Send plant gifts to Mumbai — perfect for every occasion with guaranteed safe delivery." },
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", localDelivery: false, keywords: ["plant delivery bangalore", "buy plants online bangalore"], contentHook: "Bangalore's garden city deserves the best plants — delivered fresh to your doorstep." },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", localDelivery: false, keywords: ["plant delivery hyderabad", "buy plants online hyderabad"], contentHook: "Fresh plant delivery in Hyderabad — bring nature into the City of Pearls." },
  { slug: "pune", name: "Pune", state: "Maharashtra", localDelivery: false, keywords: ["plant delivery pune", "buy plants online pune"], contentHook: "Order plants online in Pune with reliable delivery to all major areas." },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", localDelivery: false, keywords: ["plant delivery jaipur", "buy plants online jaipur"], contentHook: "Add green life to the Pink City — order plants online in Jaipur." },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", localDelivery: false, keywords: ["plant delivery lucknow", "buy plants online lucknow"], contentHook: "Gift plants in Lucknow — the City of Nawabs deserves royal greenery." },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", localDelivery: false, keywords: ["plant delivery ahmedabad", "buy plants online ahmedabad"], contentHook: "Order plants online in Ahmedabad with safe, reliable doorstep delivery." },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", localDelivery: false, keywords: ["plant delivery kolkata", "buy plants online kolkata"], contentHook: "Send green gifts to Kolkata — plants that bring joy to the City of Joy." },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", localDelivery: false, keywords: ["plant delivery chennai", "buy plants online chennai"], contentHook: "Order tropical-happy plants in Chennai with reliable delivery across the city." },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", localDelivery: false, keywords: ["plant delivery noida", "buy plants online noida"], contentHook: "Fresh plants delivered to Noida — green up your modern living space." },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", localDelivery: false, keywords: ["plant delivery gurgaon", "buy plants online gurgaon"], contentHook: "Order plants in Gurgaon with fast delivery to DLF, Sohna Road, and Golf Course Road." },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", localDelivery: false, keywords: ["plant delivery indore", "buy plants online indore"], contentHook: "Bring greenery to the cleanest city — order plants online in Indore." },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", localDelivery: false, keywords: ["plant delivery bhopal", "buy plants online bhopal"], contentHook: "Gift plants in the City of Lakes with doorstep delivery across Bhopal." },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", localDelivery: false, keywords: ["plant delivery nagpur", "buy plants online nagpur"], contentHook: "Orange City goes green — order fresh plants online in Nagpur." },
  { slug: "surat", name: "Surat", state: "Gujarat", localDelivery: false, keywords: ["plant delivery surat", "buy plants online surat"], contentHook: "Add natural beauty to the Diamond City — order plants in Surat." },
  { slug: "patna", name: "Patna", state: "Bihar", localDelivery: false, keywords: ["plant delivery patna", "buy plants online patna"], contentHook: "Celebrate every occasion in Patna with meaningful plant gifts delivered home." },
  { slug: "kochi", name: "Kochi", state: "Kerala", localDelivery: false, keywords: ["plant delivery kochi", "buy plants online kochi"], contentHook: "Order tropical plants in Kochi — the perfect addition to God's Own Country." },
  { slug: "chandigarh-tricity", name: "Tricity (Chandigarh Region)", state: "Chandigarh", localDelivery: true, keywords: ["tricity plant delivery", "chandigarh tricity plants"], contentHook: "Same-day plant delivery across Tricity — Chandigarh, Mohali, Panchkula & Zirakpur." },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", localDelivery: false, keywords: ["plant delivery ghaziabad", "buy plants ghaziabad"], contentHook: "Order plants online in Ghaziabad with fast doorstep delivery." },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", localDelivery: false, keywords: ["plant delivery coimbatore", "buy plants coimbatore"], contentHook: "Gift plants in the Manchester of South India — fast delivery across Coimbatore." },
];

// ─── Care Levels / Audience ─────────────────────────────────────────────────

export interface CareLevelDimension {
  slug: string;
  name: string;
  keywords: string[];
  contentHook: string;
  productTagMatch: string[];
}

export const careLevels: CareLevelDimension[] = [
  { slug: "beginners", name: "Beginners", keywords: ["beginner plants", "first time plant owner"], contentHook: "New to plants? These forgiving varieties are perfect for first-time plant parents.", productTagMatch: ["beginner-friendly", "easy-care"] },
  { slug: "busy-people", name: "Busy People", keywords: ["plants for busy people", "low effort plants"], contentHook: "Too busy to water? These self-sufficient plants survive weeks of neglect without drama.", productTagMatch: ["easy-care"] },
  { slug: "kids", name: "Kids / Children", keywords: ["plants for kids", "child friendly plants", "educational plants"], contentHook: "Teach kids responsibility and love for nature with these fun, safe, and easy-to-grow plants.", productTagMatch: ["beginner-friendly"] },
  { slug: "seniors", name: "Senior Citizens", keywords: ["plants for elderly", "easy plants for seniors"], contentHook: "Gentle on the hands, uplifting on the spirit. These easy-care plants are perfect companions for seniors.", productTagMatch: ["easy-care"] },
  { slug: "travellers", name: "Frequent Travellers", keywords: ["plants for travellers", "plants that survive vacation"], contentHook: "Travel frequently? These drought-tolerant plants will be just fine while you're away.", productTagMatch: ["easy-care", "succulents"] },
  { slug: "experts", name: "Plant Enthusiasts", keywords: ["rare plants", "collector plants", "expert plants"], contentHook: "Ready for a challenge? These collector-grade plants reward dedicated plant parents with stunning growth.", productTagMatch: ["medium-care"] },
];

// ─── Computed Stats ─────────────────────────────────────────────────────────

/** Total possible page combinations across all dimensions */
export function getTotalPageEstimate(): number {
  const p = plantTypes.length;
  const r = rooms.length;
  const u = useCases.length;
  const c = cities.length;
  const o = occasions.length;
  const cl = careLevels.length;

  return (
    // Single-dimension pages
    r + u + o + c + cl +
    // Plant × Room
    p * r +
    // Plant × Use case
    p * u +
    // Plant × City
    p * c +
    // Plant × Occasion
    p * o +
    // Use case × Room
    u * r +
    // Use case × City
    u * c +
    // Occasion × City
    o * c +
    // Care × Room
    cl * r +
    // Three-way: Plant × Room × City
    p * r * c +
    // Three-way: Plant × Occasion × City
    p * o * c
  );
}

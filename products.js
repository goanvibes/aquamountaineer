/**
 * =========================================================================
 * AQUA MOUNTAINEER CATALOGUE DATA
 * =========================================================================
 * HOW TO EDIT ON GITHUB:
 * 1. Click the "Edit" pencil icon on this file in GitHub.
 * 2. Copy an existing product block (from '{' to '},').
 * 3. Paste it below another product.
 * 4. Change the text inside the quotes ("").
 * 5. Scroll down and click "Commit changes".
 * 
 * FIELDS:
 * - id: A unique lower-case name with dashes (e.g., "red-koi")
 * - name: The display name of the product
 * - category: E.g., "Live Fish", "Aquascaping", "Equipment", "Tanks", "Fish Care"
 * - image: URL to an image (Unsplash link or local folder like "images/koi.jpg"). If left blank (""), an emoji is used.
 * - emoji: A fallback emoji if no image is provided.
 * - price: Number (e.g., 1499). Use 0 for "Quote based".
 * - unit: "from" (starts at), "quote" (ask for price), or "each".
 * - description: A short sentence explaining the product.
 * - badge: A small highlight tag (e.g., "Popular", "Beginner").
 * - careRequired: (Optional) E.g., "Low", "Medium", "High"
 * - environment: (Optional) E.g., "Freshwater", "Planted Tank", "Pond"
 */

window.AQUA_PRODUCTS = [
  {
    id: "starter-betta-kit",
    name: "Premium Betta Starter Kit",
    category: "Starter Kits",
    image: "https://images.unsplash.com/photo-1543489822-c3f2537c3553?auto=format&fit=crop&w=400&q=80",
    emoji: "🐠",
    price: 1499,
    unit: "from",
    description: "A beginner-friendly glass setup bundle with essentials for a healthy, happy betta home.",
    badge: "Beginner",
    careRequired: "Low",
    environment: "Freshwater / Small Tank"
  },
  {
    id: "aquascaping-dragon-stone",
    name: "Dragon Stone Hardscape",
    category: "Aquascaping",
    image: "https://images.unsplash.com/photo-1628156641829-19aa82a208de?auto=format&fit=crop&w=400&q=80",
    emoji: "🪨",
    price: 299,
    unit: "per kg",
    description: "Highly textured, imported Dragon stone perfect for building dramatic underwater cliffs.",
    badge: "Premium Scape",
    careRequired: "None",
    environment: "Planted Tank"
  },
  {
    id: "planted-tank-bundle",
    name: "Planted Tank Starter Bundle",
    category: "Aquascaping",
    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=400&q=80",
    emoji: "🌿",
    price: 2499,
    unit: "from",
    description: "Substrate, planting tools, selected low-tech greens and basic care guidance.",
    badge: "Popular",
    careRequired: "Medium",
    environment: "Freshwater"
  },
  {
    id: "custom-acrylic-tank",
    name: "Custom Acrylic Tank Build",
    category: "Tanks",
    image: "",
    emoji: "🧊",
    price: 0,
    unit: "quote",
    description: "Made-to-size, seamless acrylic tanks for counters, homes, offices and statement displays.",
    badge: "Custom Service",
    careRequired: "Varies",
    environment: "Indoor Setup"
  },
  {
    id: "3d-aquarium-setup",
    name: "Custom 3D Aquarium Display",
    category: "Tanks",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=400&q=80",
    emoji: "🏔️",
    price: 0,
    unit: "quote",
    description: "Layered depth, custom rock backgrounds, and integrated lighting built around your room.",
    badge: "Flagship",
    careRequired: "Medium",
    environment: "Statement Piece"
  },
  {
    id: "canister-filter",
    name: "High-Capacity Canister Filters",
    category: "Equipment",
    image: "",
    emoji: "⚙️",
    price: 3499,
    unit: "from",
    description: "External filtration systems for crystal clear water and maximum biological filtration.",
    badge: "Essential",
    careRequired: "Monthly cleaning",
    environment: "Medium to Large Tanks"
  },
  {
    id: "led-plant-light",
    name: "Full Spectrum Planted LED",
    category: "Equipment",
    image: "",
    emoji: "💡",
    price: 1299,
    unit: "from",
    description: "Crisp, tuned lighting options optimized for rapid plant growth and vibrant fish colour.",
    badge: "Growth",
    careRequired: "Timer recommended",
    environment: "Planted Tanks"
  },
  {
    id: "premium-koi",
    name: "Japanese Koi Stock",
    category: "Live Fish",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80",
    emoji: "🎏",
    price: 0,
    unit: "quote",
    description: "Vibrant, healthy ornamental koi imported and quarantined for outdoor ponds and large tanks.",
    badge: "Live Stock",
    careRequired: "Medium",
    environment: "Pond / Large Tank"
  },
  {
    id: "schooling-tetras",
    name: "Neon & Cardinal Tetras",
    category: "Live Fish",
    image: "",
    emoji: "🐟",
    price: 0,
    unit: "quote",
    description: "Tight-schooling, colorful nano fish perfect for peaceful, heavily planted community tanks.",
    badge: "Community",
    careRequired: "Low",
    environment: "Planted / Nano"
  }
];
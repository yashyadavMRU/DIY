<script>
  import { goto } from "$app/navigation";
  import { cart, toastStore } from "$lib/stores";
  import { fly, fade } from "svelte/transition";

  function navigate(page) {
    goto(page);
  }

  function handleAddToCart(product) {
    cart.addItem(product);
    toastStore.show(`${product.name} added to hanger!`, "success");
  }

  // Dummy data (In a real app, this comes from your +page.server.js via Prisma)
  export const products = [
    {
      id: "d1",
      name: 'Apex Evo 5" Freestyle',
      slug: "apex-evo-5-freestyle",
      description:
        "The gold standard in freestyle drones. Featuring 6S power, O3 Air Unit, and high-tensile carbon fiber.",
      brand: "ImpulseRC",
      price: 549.99,
      stock: 5,
      isBundle: true,
      categoryId: "freestyle",
      images: [
        {
          url: "https://images.unsplash.com/photo-1527977966376-1c8418f9f108?q=80&w=500",
        },
      ],
      category: { name: "Digital RTF" },
    },
    {
      id: "d2",
      name: "Avata 2 Explorer Bundle",
      slug: "avata-2-explorer",
      description:
        "The ultimate beginner-friendly FPV experience. Includes Goggles 3 and Motion Controller.",
      brand: "DJI",
      price: 999.0,
      stock: 12,
      isBundle: true,
      categoryId: "rtf",
      images: [
        {
          url: "https://images.unsplash.com/photo-1473960104312-bf2e12017180?q=80&w=500",
        },
      ],
      category: { name: "Ready To Fly" },
    },
    {
      id: "d3",
      name: "Pavo20 Pocket Whoop",
      slug: "pavo20-cinewhoop",
      description:
        "A 2-inch powerhouse designed for indoor cinematic shots. Perfect for real estate and events.",
      brand: "BetaFPV",
      price: 189.99,
      stock: 8,
      isBundle: false,
      categoryId: "cinewhoops",
      images: [
        {
          url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=500",
        },
      ],
      category: { name: "Cinewhoops" },
    },
    {
      id: "d4",
      name: "Nazgul5 V3 6S BNF",
      slug: "iflight-nazgul5-v3",
      description:
        "High-speed freestyle beast. Comes pre-tuned with ELRS 2.4G and Xing2 motors.",
      brand: "iFlight",
      price: 320.5,
      stock: 0,
      isBundle: false,
      categoryId: "freestyle",
      images: [
        {
          url: "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?q=80&w=500",
        },
      ],
      category: { name: "Freestyle" },
    },
    {
      id: "d5",
      name: "Mobula7 1S Whoop",
      slug: "mobula7-1s-whoop",
      description:
        "The most popular indoor drone. Lightweight, durable, and runs on simple 1S batteries.",
      brand: "Happymodel",
      price: 105.0,
      stock: 25,
      isBundle: false,
      categoryId: "whoops",
      images: [
        {
          url: "https://images.unsplash.com/photo-1533651180995-3b8dcd33e834?q=80&w=500",
        },
      ],
      category: { name: "Tiny Whoops" },
    },
    {
      id: "d6",
      name: "Mavic 3 Pro Cine",
      slug: "mavic-3-pro-cine",
      description:
        "Professional photography drone with triple camera system and Apple ProRes support.",
      brand: "DJI",
      price: 2999.0,
      stock: 3,
      isBundle: true,
      categoryId: "photography",
      images: [
        {
          url: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=500",
        },
      ],
      category: { name: "Aerial Photo" },
    },
    {
      id: "d7",
      name: "Chimera7 Pro V2",
      slug: "chimera7-pro-v2",
      description:
        "Long-range FPV drone built for mountain surfing. Capable of 15-minute flight times.",
      brand: "iFlight",
      price: 649.0,
      stock: 4,
      isBundle: false,
      categoryId: "long-range",
      images: [
        {
          url: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=500",
        },
      ],
      category: { name: "Long Range" },
    },
    {
      id: "d8",
      name: "Meteor65 Air Edition",
      slug: "meteor65-air",
      description:
        "The lightest 65mm drone in the world. Designed for competitive indoor racing.",
      brand: "BetaFPV",
      price: 99.0,
      stock: 15,
      isBundle: false,
      categoryId: "whoops",
      images: [
        {
          url: "https://images.unsplash.com/photo-1524143878510-e3b8d6312402?q=80&w=500",
        },
      ],
      category: { name: "Tiny Whoops" },
    },
  ];
</script>

<div class="featured-container">
  <div class="header-row">
    <h3>Featured <span>Drones</span></h3>
    <button class="more-btn" on:click={() => navigate("/shop")}>
      Explore more <i class="ri-arrow-right-up-line"></i>
    </button>
  </div>

  <div class="product-grid">
    {#each products as product (product.id)}
      <div class="product-card" in:fly={{ y: 20, duration: 500 }}>
        <div class="image-box">
          {#if product.isBundle}
            <span class="badge">Bundle</span>
          {/if}
          <img src={product.images[0].url} alt={product.name} />

          <div class="quick-actions">
            <button class="qty-btn" on:click={() => cart.addItem(product, -1)}
              >-</button
            >
            <span class="qty-label">Add</span>
            <button class="qty-btn" on:click={() => handleAddToCart(product)}
              >+</button
            >
          </div>
        </div>

        <div class="details">
          <div class="meta">
            <span class="brand">{product.brand}</span>
            <span class="category">{product.category.name}</span>
          </div>
          <h4>{product.name}</h4>
          <p>{product.description.substring(0, 50)}...</p>

          <div class="price-row">
            <span class="price">${product.price.toLocaleString()}</span>
            <button class="details-link">View Specs</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .featured-container {
    max-width: 1200px;
    margin: 60px auto;
    padding: 0 20px;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  h3 {
    font-size: 20px;
    font-weight: 800;
  }

  h3 span {
    color: var(--accent);
  }

  .more-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-main);
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    transition: 0.3s;
  }

  .more-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  .product-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: 0.3s ease;
  }
  .product-card:hover {
    border-color: var(--accent);
    transform: translateY(-5px);
  }

  .image-box {
    position: relative;
    height: 180px;
    background: #020617;
    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden; 
    border-radius: 16px 16px 0 0;
  }

  .image-box img {
    width: 70%;
    object-fit: contain;
    object-fit: cover; 
    transition: transform 0.5s ease;
  }

  .badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #facc15;
    color: #000;
    font-size: 10px;
    font-weight: 900;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .quick-actions {
    position: absolute;
    bottom: 10px;
    background: rgba(15, 23, 42, 0.9);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 12px;
    border-radius: 20px;
    opacity: 0;
    transition: 0.3s;
    border: 1px solid var(--accent);
  }

  .product-card:hover .quick-actions {
    opacity: 1;
  }

  .qty-btn {
    background: none;
    border: none;
    color: vaar(--accent);
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
  }

  .qty-label {
    font-size: 12px;
    font-weight: 700;
    color: white;
  }

  .details {
    padding: 15px;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .brand {
    color: var(--accent);
  }

  .category {
    color: var(--muted);
  }

  h4 {
    margin: 0 0 8px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 15px;
    line-height: 1.4;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    font-weight: 800;
    font-size: 18px;
  }

  .details-link {
    background: none;
    border: 1px solid var(--border);
    color: white;
    font-size: 11px;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .product-grid {
      grid-template-columns: 1fr;
      padding: 0 10px;
    }

    .header-row h3 {
    font-size: 22px; /* Shrink title slightly */
  }
  }
</style>

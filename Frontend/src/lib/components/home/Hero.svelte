<script>
  import FeaturedProducts from "../featuredProducts/FeaturedProducts.svelte";
  import Footer from "../layout/Footer.svelte";
  import Navbar from "../layout/Navbar.svelte";


export let title = "Forge Your Ultimate Drone";
  export let subtitle = "The world's most advanced 3D Drone Configurator. Select parts, simulate flight, and buy in one click.";

    const categories = [
		{ name: 'Frames', icon: 'M4 4h16v16H4V4z', count: 12 },
		{ name: 'Motors', icon: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83', count: 24 },
		{ name: 'Batteries', icon: 'M17 6H3v12h14M21 10v4', count: 18 },
		{ name: 'Electronics', icon: 'M9 3v18m6-18v18M4 9h16M4 15h16', count: 36 }
	];

	const features = [
		{
			title: 'Premium Quality',
			description: 'Hand-selected components from top manufacturers',
			icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
		},
		{
			title: 'DIY Builder',
			description: 'Build your perfect drone with our interactive tool',
			icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
		},
		{
			title: 'Fast Shipping',
			description: 'Free shipping on orders over $100',
			icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
		},
		{
			title: 'Expert Support',
			description: '24/7 technical support from drone experts',
			icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
		}
	];
</script>

<section class="hero-container">
  <div class="overlay"></div>
  
  <div class="content">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    
    <div class="buttons">
      <a href="/builder" class="btn primary">
        <span>🚀</span> Start Building
      </a>
      <a href="/shop" class="btn secondary">
        View Ready-to-Fly
      </a>
    </div>
  </div>
</section>

<FeaturedProducts />

<style>
  .hero-container {
    position: relative;
    width: 100%;
    height: 70vh; /* Tall hero section */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Fallback background if no image */
    background: radial-gradient(circle at center, #1e293b 0%, #020617 100%);
    overflow: hidden;
  }

  /* Cool Grid Effect Overlay */
  .hero-container::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background-image: 
      linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: perspective(500px) rotateX(60deg);
    opacity: 0.3;
    pointer-events: none;
  }

  .content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 800px;
    padding: 0 20px;
  }

  h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #ffffff, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
  }

  p {
    font-size: 1.25rem;
    color: #cbd5e1;
    margin-bottom: 2.5rem;
  }

  .buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .btn {
    padding: 16px 32px;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  .primary {
    background: #0ea5e9; /* Sky Blue */
    color: white;
    box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
    border: none;
  }

  .primary:hover {
    background: #38bdf8;
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(14, 165, 233, 0.6);
  }

  .secondary {
    background: transparent;
    border: 1px solid #475569;
    color: #e2e8f0;
  }

  .secondary:hover {
    border-color: #cbd5e1;
    background: rgba(255, 255, 255, 0.05);
  }
</style>
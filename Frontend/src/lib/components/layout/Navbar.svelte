<script>
  import { goto } from "$app/navigation";
  import { user, cartCount, cart } from "$lib/stores";
  import { slide } from "svelte/transition";

  const navigate = (page) => {
    goto(page);
  };

  let isDropDownOpen = false;

  // Toggle the menu
  function toggleDropDown() {
    isDropDownOpen = !isDropDownOpen;
  }

  function handleNavigation(path) {
    isDropDownOpen = false;
    goto(path);
  }

  function handleLogout() {
    isDropDownOpen = false;
    user.logout();
    cart.clear();
    goto("/auth");
  }
</script>

<header class="header">
  <button class="logo" on:click={() => navigate("/")} aria-label="Go to Home">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
    <h4>DRONE<span>HUB</span></h4>
  </button>

  <div class="center">
    <div class="search-bar">
      <i class="ri-search-line"></i>
      <input type="text" placeholder="Search parts, frames, motors..." />
    </div>
    <nav class="navbar">
      <ul class="links">
        <li><button on:click={() => navigate("/")}>Home</button></li>
        <li>
          <button on:click={() => navigate("/shop")} class="highlight"
            >DIY Store</button
          >
        </li>
        <li>
          <button on:click={() => navigate("/tutorials")}>Tutorials</button>
        </li>
        <li><button on:click={() => navigate("/")}>Community</button></li>
      </ul>
    </nav>
  </div>
  <div class="right">
    <button
      class="cart-icon"
      on:click={() => navigate("/cart")}
      aria-label="View shopping cart"
    >
      <i class="ri-shopping-cart-2-line"></i>
      {#if $cartCount > 0}
        <span class="badge">{$cartCount}</span>
      {/if}
    </button>

    <div class="user-menu-container">
      {#if $user}
        <button
          class="profile-btn"
          class:active={isDropDownOpen}
          on:click={toggleDropDown}
        >
          <span class="status-dot"></span>
          <span>{$user.name.split(" ")[0]}</span>
          <i class="ri-arrow-down-s-line arrow" class:rotate={isDropDownOpen}
          ></i>
        </button>

        {#if isDropDownOpen}
          <div class="overlay" on:click={() => (isDropDownOpen = false)}>
            <div class="dropdown" transition:slide={{ duration: 200 }}>
              <button class="menu-item" on:click={() => handleNavigation("/profile")} aria-label="Profile button">
                <i class="ri-user-settings-line"></i>
                <span>Account Settings</span>
                </button>

              <button class="menu-item" on:click={() => handleNavigation("/orders")} aria-label="Orders button">
                <i class="ri-file-list-3-line"></i>
                <span>My Orders</span>
              </button>

              <div class="divider"></div>
              
              <button class="menu-item logout" on:click={handleLogout}>
                <i class="ri-logout-box-r-linr"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        {/if}

      {:else}
        <button class="auth-btn" on:click={() => navigate("/auth")}
          >SignIn</button
        >
      {/if}
    </div>
  </div>
</header>

<style>
  :root {
    --bg-dark: #0f172a;
    --accent: #38bdf8; /* Cyan */
    --text-main: #f8fafc;
    --glass: rgba(30, 41, 59, 0.7);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 40px;
    background: var(--bg-dark);
    border-bottom: 1px solid #1e293b;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    outline: none;
  }

  .logo:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .logo svg {
    width: 32px;
    height: 32px;
    color: var(--accent);
  }

  .logo h4 {
    font-weight: 800;
    letter-spacing: 1px;
    color: var(--text-main);
  }

  .logo h4 span {
    color: var(--accent);
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .search-bar {
    background: #1e293b;
    border-radius: 20px;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    width: 300px;
    border: 1px solid transparent;
    transition: 0.3s;
  }

  .search-bar:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
  }

  .search-bar input {
    background: transparent;
    border: none;
    color: white;
    padding: 5px 10px;
    font-size: 13px;
    outline: none;
    width: 100%;
  }

  .links {
    list-style: none;
    display: flex;
    gap: 20px;
    margin: 0;
    padding: 0;
  }

  .links button {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.2s;
  }

  .links button:hover {
    color: var(--accent);
  }

  .links .highlight {
    color: #facc15;
  }

  .cart-icon {
    position: relative;
    font-size: 24px;
    color: white;
    cursor: pointer;

    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: transform 0.2s ease;
  }

  .cart-icon:hover {
    color: var(--accent);
    transform: scale(1.1);
  }

  /* Ensure keyboard users see where they are */
  .cart-icon:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background: #ef4444;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 50%;
  }

  .auth-btn {
    background: var(--accent);
    color: #0f172a;
    border: none;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    transition: 0.3s;
  }

  .auth-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);
  }

  .profile-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(30, 41, 59, 0.7); /* Slate-800 with transparency */
    color: #f8fafc;
    border: 1px solid #334155;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(8px);
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
  }

  /* The Cyan Glow Effect */
  .profile-btn:hover {
    border-color: #38bdf8;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
    transform: translateY(-1px);
  }

  .profile-btn:active {
    transform: translateY(1px);
  }

  /* Online Status Indicator */
  .status-dot {
    width: 8px;
    height: 8px;
    background-color: #10b981; /* Emerald-500 */
    border-radius: 50%;
    position: relative;
  }

  /* The Pulsing Animation */
  .status-dot::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-color: #10b981;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  /* Fix for very long names on mobile */
  @media (max-width: 480px) {
    .profile-btn {
      padding: 6px 12px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* Navbar.svelte Style Section */
  @media (max-width: 768px) {
    .header {
      height: auto;
      padding: 10px 20px;
      flex-wrap: wrap; /* Allows search bar to drop to a new line */
    }

    .center {
      order: 3; /* Moves search & links below logo and cart */
      width: 100%;
      margin-top: 10px;
    }

    .search-bar {
      width: 100% !important; /* Make search bar full width on mobile */
    }

    .navbar {
      display: none; /* Hide links on mobile, or use a dropdown */
    }

    .right {
      order: 2;
    }
  }
</style>

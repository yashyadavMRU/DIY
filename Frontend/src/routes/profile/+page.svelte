<script>
  import { user } from "$lib/stores";
  import { fade, fly } from "svelte/transition";
    
    let activeTab = "account";

    const menuItems = [
        {id: "account", label: "Account Setting", icon: "ri-user-seetings-line"},
        {id: "payment", label: "Payment Methods", icon: "ri-bank-card-line"},
        {id: "address", label: "Saved Addresses", icon: "ri-map-pin-user-line"},
        {id: "security", label: "Security & Login", icon: "ri-shield-keyhole-line"},
    ]
</script>

<div class="dashboard-wrapper" in:fade>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="mini-avtar">{$user?.name.charAt(0)}</div>
            <div class="header-info">
                <h3>{$user?.name.split(' ')[0]}</h3>
            </div>
        </div>

        <nav class="sidebar-nav">
            {#each menuItems as item}
                <button class="nav-item" class:active={activeTab === item.id} on:click={() => activeTab = item.id} aria-label="Active Tab">
                    <i class={item.icon}>
                        <span>{item.label}</span>
                    </i>
                </button>
            {/each}
        </nav>
    </aside>


    <main class="content-area">
        {#if activeTab === "account"}
            <section in:fly={{x:20, duration: 300}}>
                <h2>Account Settings</h2>
                <div class="form-group">
                    <label for="full-name">Full Name</label>
                    <input type="text" value={$user?.name}>
                </div>

                <div class="form-group">
                    <label for="email">Full Name</label>
                    <input type="email" value={$user?.email} disabled>
                </div>
                <button class="btn-primary">Save Changes</button>
            </section>
        {:else if activeTab === 'payment'}
            <section in:fly={{x:20, duration: 300}}>
                <h2>Payment Methods</h2>
                <i class="ri-bank-card-2-line"></i>
          <p>No payment methods saved yet.</p>
                <button class="btn-secondary">+ Add Card</button>
            </section>

        {:else if activeTab === 'address'}
            <section in:fly={{ x:20, duration: 300}}>
                <h2>Saved Address</h2>
                
            </section>
        {/if}
    </main>
</div>
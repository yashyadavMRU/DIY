<script>
  import favicon from "$lib/assets/favicon.svg"; // ✅ import global CSS here (not in <style>)
  import { onMount } from "svelte";
  import { cart, currentPage, user } from "$lib/stores";
  import Shop from "./shop/+page.svelte";
  import Auth from "./auth/+page.svelte";
  import Home from "./+page.svelte";
  import Cart from "./cart/+page.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Toast from "$lib/components/Toast.svelte";

  let { children } = $props();

  // Whenever the user logs in or out, reload the correct cart
  // The '$' creates a reactive statement
  $effect(() => {
    if ($user) cart.load();
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
<Toast />
<Navbar />
<main class="page">
    {@render children()}
</main>
<Footer />

<style>
  .page {
    width: 100%;
    margin: 0 auto;
    min-height: 80vh;
  }
</style>

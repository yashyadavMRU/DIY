<script>
  import { goto } from "$app/navigation";
  import { user, toastStore } from "$lib/stores";

  let mode = "signup"; // signup | signin

  const navigate = (page) => {
    goto(page);
  }

  let name = "";
  let email = "";
  let password = "";
  let loading = false;

  async function handleSignUp() {
    loading = true;
    try {
      if(mode === "signin"){
        await user.login(email, password);
        toastStore.show("Pilot authenticated. Welcome back!", "success");
      }else{
        await user.register(name, email, password)
        toastStore.show("Pilot authenticated. Welcome back!", "success");
      }

      navigate("/");
    } catch (error) {
      toastStore.show(error.message || "Authentication failed", "error");
    }finally{
      loading = false;
    }
  }
</script>

<section class="auth-wrap">
  <div class="card auth-card">

    <h1>{mode === "signup" ? "Create Account" : "Welcome Back"}</h1>
    <p class="muted">
      {mode === "signup"
        ? "Build drones, save builds, and join the community."
        : "Sign in to continue building your drone."}
    </p>

    <form on:submit|preventDefault={handleSignUp}>
      {#if mode === "signup"}
        <input
          class="input"
          placeholder="Full Name"
          bind:value={name}
          required
        />
      {/if}

      <input
        class="input"
        type="email"
        placeholder="Email address"
        bind:value={email}
        required
      />

      <input
        class="input"
        type="password"
        placeholder="Password"
        bind:value={password}
        required
      />

      <button class="btn-primary">
        {mode === "signup" ? "Create Account" : "Sign In"}
      </button>
    </form>

    <div class="switch">
      {#if mode === "signup"}
        Already have an account?
        <button on:click={() => (mode = "signin")}>Sign in</button>
      {:else}
        Don’t have an account?
        <button on:click={() => (mode = "signup")}>Create account</button>
      {/if}
    </div>
  </div>
</section>

<style>
  .auth-wrap {
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-card {
    width: 100%;
    max-width: 600px;
    padding: 40px;
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
  }

  h1 {
    margin: 0 0 6px;
    font-size: 28px;
  }

  .muted {
    color: var(--muted);
    margin-bottom: 20px;
    font-size: 14px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .input {
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(255,255,255,0.04);
    color: var(--text);
    outline: none;
  }

  .input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(43,176,255,0.15);
  }

  .btn-primary {
    margin-top: 8px;
    padding: 12px;
    border-radius: 14px;
    border: none;
    background: var(--primary);
    color: #00131f;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary:hover {
    filter: brightness(1.05);
  }

  .switch {
    margin-top: 16px;
    font-size: 14px;
    color: var(--muted);
    text-align: center;
  }

  .switch button {
    background: none;
    border: none;
    color: var(--primary);
    cursor: pointer;
    font-weight: 600;
  }
</style>

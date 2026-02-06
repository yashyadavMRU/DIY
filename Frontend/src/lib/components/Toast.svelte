<script>
    import { toastStore } from "$lib/stores.js";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";

</script>

<div class="toast-wrapper">
    {#each $toastStore as t (t.id)}
        <div class="toast-card {t.type}" animate:flip={{duration: 300}} transition:fly={{ x: 100, opacity: 0, duration: 400 }}>
            <div class="status-indicator"></div>
            <div class="content">
                <i class={t.type === "success" ? "ri-checkbox-circle-line" : "ri-error-warning-line"}></i>
                <span>{t.message}</span>
            </div>

            <button class="close" on:click={() => toastStore.dismiss(t.id)}>
                <i class="ri-close-line"></i>
            </button>
        </div>
    {/each}
</div>

<style>
    .toast-wrapper{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
    }

    .toast-card{
        pointer-events: auto;
        min-width: 300px;
        background: #1e293b;
        border: 1px solid #334155;
        color: white;
        padding: 16px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;
    }

    .status-indicator{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--accent);
    }

    .toast-card.success .status-indicator{
        background: #10b981;
    }

    .toast-card.error .status-indicator{
        background: #ef4444;
    }

    .content{
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        font-weight: 500;
    }

    .content i{
        font-size: 20px;
    }

    .success i{
        color: #10b981;
    }

    .error i{
        color: #ef4444;
    }

    .close{
        background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    transition: 0.2s;
    }

    .close:hover{
        color: white;
    }
</style>
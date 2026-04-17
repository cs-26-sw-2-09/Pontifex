<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/Components/Navbar.svelte";
	import "@tailwindplus/elements";
	let { children } = $props();
	let cookie = 1;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- Cookie here!!! -->
{#if cookie}
	<Navbar/>
{/if}

{@render children()}

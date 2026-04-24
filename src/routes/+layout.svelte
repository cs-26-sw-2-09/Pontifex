<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/Components/Navbar.svelte";
	import "@tailwindplus/elements";
  import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { deleteUserCookie } from "$lib/cookies/cookies";
	let { children } = $props();
	let cookie = 1;
	
  function logout() {
		deleteUserCookie();
		goto(resolve("/"));
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- Cookie here!!! -->
{#if cookie}
	<Navbar/>
{/if}

{@render children()}

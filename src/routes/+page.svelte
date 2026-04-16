<script lang="ts">
	let World: string = "world";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>{World}</p>
<div>HEJ</div>

<button on:click={() => console.log(fetch("/api/user/1"))}>STUFF</button>

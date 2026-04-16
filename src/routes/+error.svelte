<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
</script>

<main class="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-lg font-semibold text-indigo-400">{page.status}</p>
		<h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
			Page {page.error?.message}
		</h1>
		<p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
			Sorry, we couldn’t find the page you’re looking for.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href={resolve("/")}
				class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>Go back home</a
			>
		</div>
	</div>
</main>

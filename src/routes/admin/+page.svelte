<script lang="ts">
	import type { PageProps } from "./$types";
	import Navbar from "$lib/Components/Navbar.svelte";
	let { data }: PageProps = $props();
</script>
<Navbar/>

<h1 class="text-center text-[42px]">Welcome, {data.user?.Name}!</h1>

<ul role="list" class="m-2 flex-col divide-y divide-white/5">
	{#each data.users as user (user.Id)}
		<li class="m-2 flex justify-between rounded-lg bg-gray-700 p-2">
			<!-- LEFT SIDE -->
			<div class="flex min-w-0 gap-x-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-12 flex-none rounded-full bg-gray-800 stroke-gray-400 outline -outline-offset-1 outline-white/10"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>

				<div class="min-w-0 flex-auto">
					<p class="text-lg font-semibold text-white">
						{user.Name}
					</p>

					<p class="mt-1 truncate text-sm text-gray-200">
						ID: {user.Id}
					</p>
				</div>
			</div>

			<!-- RIGHT SIDE (optional / extendable) -->
			<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
				{#if user.Role}
					<p class="text-sm/6 text-white">{user.Role}</p>
				{/if}
			</div>
		</li>
	{/each}
</ul>

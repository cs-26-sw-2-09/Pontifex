<script lang="ts">
	import { Role } from "$lib/types";
	import type { PageProps } from "./$types";
	let { data }: PageProps = $props();

	var filter = $state("All");
	function handleFilter(str: string){
		filter = str;
	}

	
</script>


<h1 class="text-center text-[42px] font-semibold text-gray-900 mb-8">
	Welcome, {data.currentUser?.Name}!
</h1>

<div class="flex justify-center">
	<div class="flex flex-col items-center gap-4 bg-gray-700 px-8 py-6 rounded-2xl shadow-lg">
		<p class="text-gray-200 text-lg font-medium">Filter between users:</p>

		<div class="flex gap-4">
			<button
				onclick={() => handleFilter("All")}
				class="px-5 py-2 rounded-xl bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all duration-200"
			>
				All
			</button>

			<button
				onclick={() => handleFilter("Student")}
				class="px-5 py-2 rounded-xl bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all duration-200"
			>
				Students
			</button>

			<button
				onclick={() => handleFilter("Teacher")}
				class="px-5 py-2 rounded-xl bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all duration-200"
			>
				Teachers
			</button>
		</div>
	</div>
</div>


<ul role="list" class="m-2 flex-col divide-y divide-white/5">
	{#each data.users as users (users.Id)}
		{#if (users.Role === filter) || filter === "All"}
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
							{users.Name}
						</p>

						<p class="mt-1 truncate text-sm text-gray-200">
							ID: {users.Id}
						</p>
					</div>
				</div>

				<!-- RIGHT SIDE (optional / extendable) -->
				<div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
					{#if users.Role}
						<p class="text-sm/6 text-white">{users.Role}</p>
					{/if}
				</div>
			</li>
		{/if}
	{/each}
</ul>

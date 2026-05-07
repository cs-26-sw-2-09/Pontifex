<script lang="ts">
	let { data } = $props();
</script>

<h1 class="mb-10 text-center text-[42px] font-semibold text-gray-900">
	Assignments for {data.user.Name}
</h1>

{#if data.assignments.length > 0}
	<ul role="list" class="mx-auto max-w-3xl space-y-6">
		{#each data.assignments as assignment (assignment.Id)}
			<li class="rounded-2xl bg-gray-700 p-6 shadow-lg transition-all hover:bg-gray-600">
				<div class="flex items-start justify-between">
					<div class="flex gap-4">
						<div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L17 6.5V19a2 2 0 01-2 2z"
								/>
						</div>

						<div>
							<p class="text-xl font-semibold text-white">
								{assignment.Name}
							</p>

							<p class="mt-1 text-gray-300">
								{assignment.Description}
							</p>

							<p class="mt-2 text-sm text-gray-400">
								Course ID: {assignment.CourseId}
							</p>
						</div>
					</div>

					<div class="text-right">
						<p class="text-sm text-gray-300">
							Due:
							<span class="font-semibold text-green-400">
								{new Date(assignment.DueDate).toLocaleDateString()}
							</span>
						</p>
					</div>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p class="mt-10 text-center text-lg text-gray-500">No assignments found.</p>
{/if}

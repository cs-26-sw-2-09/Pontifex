<script lang="ts">
	let { data } = $props();

	import Navbar from "$lib/Components/Navbar.svelte";
</script>

<Navbar role={data.user!.Role} />

<h1 class="mb-10 text-center text-[42px] font-semibold text-gray-900">
	Assignments for {data.user.Name}
</h1>

{#if data.assignments.length > 0}
	<ul role="list" class="mx-auto max-w-3xl space-y-6">
		{#each data.assignments as assignment (assignment.Id)}
			<li class="rounded-2xl bg-gray-700 p-6 shadow-lg transition-all hover:bg-gray-600">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<!-- LEFT SIDE -->
					<div class="flex flex-1 gap-4">
						<div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
							<!-- icon -->
						</div>

						<div class="flex-1">
							<p class="text-xl font-semibold text-white">
								{assignment.Name}
							</p>

							<p class="wrap-break-words mt-1 text-gray-300">
								{assignment.Description}
							</p>

							<p class="mt-2 text-sm text-gray-400">
								Course ID: {assignment.CourseId}
							</p>
						</div>
					</div>

					<!-- RIGHT SIDE -->
					<div class="min-w-37.5 text-right">
						{#if assignment.Submissions?.length}
							<!-- Submitted -->
							<p class="text-sm text-gray-300">
								Submitted:
								<span class="font-semibold text-blue-400">
									{new Date(assignment.Submissions[0].SubmissionDate).toLocaleDateString()}
								</span>
							</p>

							<span
								class="mt-1 inline-block rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white"
							>
								Submitted
							</span>
						{:else}
							<!-- Not submitted -->
							<p class="text-sm text-gray-300">
								Due:
								<span class="font-semibold text-green-400">
									{new Date(assignment.DueDate).toLocaleDateString()}
								</span>
							</p>

							<span
								class="mt-1 inline-block rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white"
							>
								Not submitted
							</span>
						{/if}
					</div>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p class="mt-10 text-center text-lg text-gray-500">No assignments found.</p>
{/if}

<script lang="ts">
	let { data } = $props();

	import Navbar from "$lib/Components/Navbar.svelte";
</script>

<Navbar role={data.user?.Role} />

<h1 class="mb-10 text-center text-[42px] font-semibold text-gray-900">
	Assignments for {data.user?.Name}
</h1>

{#if data.Assignments!.length > 0}
	<ul role="list" class="mx-auto max-w-3xl space-y-6">
		{#each data.Assignments as assignment, index (assignment.Id)}
			<a href={`/assignments/${assignment.Id}`} class="block">
				<li class="rounded-2xl bg-gray-700 p-6 shadow-lg transition-all hover:bg-gray-600">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<!-- LEFT -->
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

						<!-- RIGHT -->
						<div class="min-w-52 text-right text-sm text-gray-300">
							<!-- ================= ADMIN ================= -->
							{#if data.user?.Role === "Admin" || data.user?.Role === "Teacher"}
								<p class="mt-1 text-blue-400">
									Submissions ({assignment.Submissions?.length})
								</p>

								{#if assignment.Submissions?.length}
									<div class="mt-2">
										<p class="text-xs text-gray-400">Submitted by:</p>
										<ul class="text-sm text-green-300">
											{#each assignment.Submissions as sub (sub.Id)}
												<li>
													{sub.User?.Name ?? "Unknown user"}
												</li>
											{/each}
										</ul>
									</div>
								{/if}

								{#if data.notSubmitted[index]?.length}
									<div class="mt-3">
										<p class="text-xs text-gray-400">
											Not submitted ({data.notSubmitted[index]?.length})
										</p>
										<ul class="text-sm text-red-300">
											{#each data.notSubmitted[index] as user (user.Id)}
												<li>{user.Name}</li>
											{/each}
										</ul>
									</div>
								{/if}

								{#if !assignment.Submissions && !data.notSubmitted[index]}
									<p class="mt-2 text-xs text-gray-400">No detailed submission data available</p>
								{/if}
							{/if}

							<!-- ================= STUDENT ================= -->
							{#if data.user?.Role === "Student"}
								{#if assignment.Submissions?.length}
									<p>
										Submitted:
										<span class="font-semibold text-green-400">
											{new Date(assignment.Submissions[0].SubmissionDate).toLocaleDateString()}
										</span>
									</p>

									<span class="mt-1 inline-block rounded bg-green-600 px-3 py-1 text-white">
										Submitted
									</span>
								{:else}
									<p>
										Due:
										<span class="font-semibold text-yellow-400">
											{new Date(assignment.DueDate).toLocaleDateString()}
										</span>
									</p>

									<span class="mt-1 inline-block rounded bg-red-600 px-3 py-1 text-white">
										Not submitted
									</span>
								{/if}
							{/if}
						</div>
					</div>
				</li>
			</a>
		{/each}
	</ul>
{:else}
	<p class="mt-10 text-center text-lg text-gray-500">No assignments found.</p>
{/if}

<script lang="ts">
	let { data } = $props();
	import { resolve } from "$app/paths";

	import Navbar from "$lib/Components/Navbar.svelte";
</script>

<Navbar role={data.user?.Role} userId={data.user?.Id} />

<h1 class="mb-10 text-center text-4xl font-semibold">
	Assignments for {data.user?.Name}
</h1>

{#if data.Assignments?.length > 0}
	<ul role="list" class="mx-auto max-w-6xl space-y-6">
		{#each data.Assignments as assignment, index (assignment.Id)}
			<a href={resolve(`/assignments/${assignment.Id}`)} class="block">
				<li
					class="w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg transition-all hover:bg-gray-700"
				>
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<!-- LEFT -->
						<div class="flex flex-1 gap-4">
							<div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800">
								<!-- icon -->
							</div>

							<div class="flex-1">
								<p class="text-xl font-semibold">
									{assignment.Name}
								</p>

								<p class="wrap-break-words mt-1">
									{assignment.Description}
								</p>

								<p class="mt-2 text-sm">
									Course ID: {assignment.CourseId}
								</p>
							</div>
						</div>

						<!-- RIGHT -->
						<div class="min-w-50 text-right text-sm">
							<!-- ============= ADMIN & TEACHER ============= -->
							{#if data.user?.Role === "Admin" || data.user?.Role === "Teacher"}
								<p class="text-blue-400">
									Submissions ({assignment.Submissions?.length})
								</p>

								{#if assignment.Submissions?.length}
									<div>
										<p class="text-xs">Submitted by:</p>
										<ul class="text-xs text-green-300">
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
										<p class="text-xs">
											Not submitted ({data.notSubmitted[index]?.length})
										</p>
										<ul class="text-xs text-red-300">
											{#each data.notSubmitted[index] as user (user.Id)}
												<li>{user.Name}</li>
											{/each}
										</ul>
									</div>
								{/if}

								{#if !assignment.Submissions && !data.notSubmitted[index]}
									<p class="text-xs">No detailed submission data available</p>
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

									<span class="mt-5 inline-block rounded bg-green-600 p-2"> Submitted </span>
								{:else}
									<p>
										Due:
										<span class="font-semibold text-yellow-400">
											{new Date(assignment.DueDate).toLocaleDateString()}
										</span>
									</p>

									<span class="mt-1 inline-block rounded bg-red-600 p-2"> Not submitted </span>
								{/if}
							{/if}
						</div>
					</div>
				</li>
			</a>
		{/each}
	</ul>
{:else}
	<p class="text-center text-lg">No assignments found.</p>
{/if}

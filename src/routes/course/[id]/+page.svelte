<script lang="ts">
	import { redirect } from "@sveltejs/kit";
	import type { PageData } from "./$types";
	import Navbar from "$lib/Components/Navbar.svelte";
	import { resolve } from "$app/paths";

	export let data: PageData;

	if (!data.course) {
		redirect(303, "/");
	}
	const assignments = data.course.Assignments ?? [];
	const users = data.course.Users ?? [];
</script>

<!-- missing navbar and user cookie -->
<Navbar role={data.user!.Role} userId={data.user!.Id} />

<div class="min-h-screen bg-gray-950 px-6 py-8 text-gray-100">
	<!-- Course Header -->
	<section class="mx-auto max-w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
		<p class="text-sm font-medium tracking-wide text-gray-400 uppercase">Course</p>

		<h1 class="mt-2 text-4xl font-bold text-white">
			{data.course?.Name}
		</h1>

		{#if data.course?.Description}
			<p class="mt-4 max-w-3xl text-gray-300">
				{data.course.Description}
			</p>
		{/if}

		<div class="mt-6 flex flex-wrap gap-3">
			<span class="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300">
				{assignments.length} assignments
			</span>

			<span class="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300">
				{users.length} enrolled users
			</span>
		</div>
	</section>

	<!-- Main Content -->
	<section class="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
		<!-- Assignments -->
		<div class="lg:col-span-2">
			<div class="rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
				<div class="mb-5 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-white">Assignments</h2>

					<span class="text-sm text-gray-400">
						{assignments.length} total
					</span>
				</div>

				{#if assignments.length > 0}
					<div class="space-y-3">
						{#each assignments as assignment (assignment.Id)}
							<a
								href={resolve(`/assignments/${assignment.Id}`)}
								class="block rounded-xl border border-gray-700 bg-gray-800 p-4 transition hover:border-gray-500 hover:bg-gray-700"
							>
								<div class="flex items-center justify-between gap-4">
									<div>
										<h3 class="text-lg font-semibold text-white">
											{assignment.Name}
										</h3>

										<p class="mt-1 text-sm text-gray-400">Open assignment details</p>
									</div>

									<span class="text-xl text-gray-400"> → </span>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<div class="rounded-xl border border-dashed border-gray-700 p-8 text-center">
						<p class="text-gray-400">No assignments have been added to this course yet.</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Users -->
		<aside>
			<div class="rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
				<div class="mb-5 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-white">Users</h2>

					<span class="text-sm text-gray-400">
						{users.length} total
					</span>
				</div>

				{#if users.length > 0}
					<div class="space-y-3">
						{#each users as user (user.Id)}
							<a
								href={resolve(`/profile/${user.Id}`)}
								class="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800 p-3 transition hover:border-gray-500 hover:bg-gray-700"
							>
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 font-bold text-white"
								>
									{user.Name.charAt(0).toUpperCase()}
								</div>

								<div class="min-w-0">
									<p class="truncate font-medium text-white">
										{user.Name}
									</p>

									{#if user.Role}
										<p class="text-sm text-gray-400">
											{user.Role}
										</p>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<div class="rounded-xl border border-dashed border-gray-700 p-6 text-center">
						<p class="text-sm text-gray-400">No users are enrolled in this course.</p>
					</div>
				{/if}
			</div>
		</aside>
	</section>
</div>

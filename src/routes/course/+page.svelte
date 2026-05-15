<script lang="ts">
	import type { PageData } from "./$types";
	import Navbar from "$lib/Components/Navbar.svelte";
	import { resolve } from "$app/paths";

	export let data: PageData;

	const courses = data.courses ?? [];
</script>

<Navbar role={data.user!.Role} userId={data.user!.Id} />

<div class="min-h-screen bg-gray-950 px-6 py-8 text-gray-100">
	<!-- Header -->
	<section class="mx-auto max-w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
		<p class="text-sm font-medium tracking-wide text-gray-400 uppercase">Course overview</p>

		<h1 class="mt-2 text-4xl font-bold">These are your courses</h1>

		<p class="mt-4 max-w-3xl text-gray-300">
			Select a course to view assignments, enrolled users, and course details.
		</p>

		<div class="mt-6">
			<span class="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300">
				{courses.length} courses
			</span>
		</div>
	</section>

	<!-- Courses -->
	<section class="mx-auto mt-8 max-w-6xl">
		<div class="rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
			<div class="mb-5 flex items-center justify-between">
				<h2 class="text-2xl font-bold">Courses</h2>

				<span class="text-sm text-gray-400">
					{courses.length} total
				</span>
			</div>

			{#if courses.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each courses as course (course.Id)}
						<a
							href={resolve(`/course/${course.Id}`)}
							class="group rounded-xl border border-gray-700 bg-gray-800 p-5 transition hover:border-gray-500 hover:bg-gray-700"
						>
							<div class="flex h-full flex-col justify-between gap-6">
								<div>
									<p class="text-sm font-medium tracking-wide text-gray-400 uppercase">Course</p>

									<h3 class="mt-2 text-xl font-bold text-white group-hover:text-gray-100">
										{course.Name}
									</h3>

									{#if course.Description}
										<p class="mt-3 line-clamp-3 text-sm text-gray-400">
											{course.Description}
										</p>
									{:else}
										<p class="mt-3 text-sm text-gray-500">No description available.</p>
									{/if}
								</div>

								<div class="flex items-center justify-between border-t border-gray-700 pt-4">
									<span class="text-sm text-gray-400"> View course </span>
									<span class="text-xl text-gray-400 transition group-hover:translate-x-1"> </span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<div class="rounded-xl border border-dashed border-gray-700 p-10 text-center">
					<h3 class="text-lg font-semibold">No courses found</h3>

					<p class="mt-2 text-sm text-gray-400">You are not currently enrolled in any courses.</p>
				</div>
			{/if}
		</div>
	</section>
</div>

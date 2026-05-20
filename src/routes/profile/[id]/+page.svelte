<script lang="ts">
	import Navbar from "$lib/Components/Navbar.svelte";
	import { redirect } from "@sveltejs/kit";
	import type { PageData } from "./$types";
	import { resolve } from "$app/paths";

	export let data: PageData;
	const currentUser = data.currentUser;
	const user = data.user;
	const userInfo = data.user?.UserInfo?.[0];
	const courses = data.user?.Course ?? [];
	if (!data.user) {
		redirect(303, "/");
	}
</script>

<Navbar role={currentUser!.Role} userId={currentUser!.Id} />
{#if user === undefined}
	<div class="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
		<p class="text-xl">User not found.</p>
	</div>
{:else}
	<div class="min-h-screen bg-gray-950 px-6 py-8 text-gray-100">
		<!-- Profile Header -->
		<section class="mx-auto max-w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
			<div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<div class="flex items-center gap-5">
					<!-- Avatar -->
					<div
						class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-3xl font-bold text-white"
					>
						{user.Name.charAt(0).toUpperCase()}
					</div>

					<div>
						<p class="text-sm font-medium tracking-wide text-gray-400 uppercase">User profile</p>

						<h1 class="mt-1 text-4xl font-bold text-white">
							{user.Name}
						</h1>

						<p class="mt-2 text-gray-300">
							{user.Role}
						</p>
					</div>
				</div>

				<div class="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300">
					{courses.length} courses
				</div>
			</div>
		</section>

		<!-- Main Content -->
		<section class="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- User Information -->
			<div class="lg:col-span-2">
				<div class="rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
					<h2 class="mb-5 text-2xl font-bold text-white">Personal information</h2>

					{#if userInfo}
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Name</p>
								<p class="mt-1 font-medium text-white">{user.Name}</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Role</p>
								<p class="mt-1 font-medium text-white">{user.Role}</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Gender</p>
								<p class="mt-1 font-medium text-white">
									{userInfo.Gender ?? "Not provided"}
								</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Email</p>
								<p class="mt-1 font-medium wrap-break-word text-white">
									{userInfo.Email ?? "Not provided"}
								</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Phone number</p>
								<p class="mt-1 font-medium text-white">
									{userInfo.PhoneNumber ?? "Not provided"}
								</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Birthdate</p>
								<p class="mt-1 font-medium text-white">
									{userInfo.Birthdate ?? "Not provided"}
								</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">CPR</p>
								<p class="mt-1 font-medium text-white">
									{userInfo.CPR ?? "Not provided"}
								</p>
							</div>

							<div class="rounded-xl bg-gray-800 p-4">
								<p class="text-sm text-gray-400">Address</p>
								<p class="mt-1 font-medium text-white">
									{userInfo.Address ?? "Not provided"}
								</p>
							</div>
						</div>
					{:else}
						<div class="rounded-xl border border-dashed border-gray-700 p-8 text-center">
							<p class="text-gray-400">No personal information has been added for this user.</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Courses -->
			<aside>
				<div class="rounded-2xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
					<div class="mb-5 flex items-center justify-between">
						<h2 class="text-2xl font-bold text-white">Courses</h2>

						<span class="text-sm text-gray-400">
							{courses.length} total
						</span>
					</div>

					{#if courses.length > 0}
						<div class="space-y-3">
							{#each courses as course (course.Id)}
								<a
									href={resolve(`/course/${course.Id}`)}
									class="block rounded-xl border border-gray-700 bg-gray-800 p-4 transition hover:border-gray-500 hover:bg-gray-700"
								>
									<div class="flex items-center justify-between gap-4">
										<div>
											<p class="font-semibold text-white">
												{course.Name}
											</p>

											{#if course.Description}
												<p class="mt-1 line-clamp-2 text-sm text-gray-400">
													{course.Description}
												</p>
											{:else}
												<p class="mt-1 text-sm text-gray-500">No description available.</p>
											{/if}
										</div>

										<span class="text-xl text-gray-400"> → </span>
									</div>
								</a>
							{/each}
						</div>
					{:else}
						<div class="rounded-xl border border-dashed border-gray-700 p-6 text-center">
							<p class="text-sm text-gray-400">This user is not enrolled in any courses.</p>
						</div>
					{/if}
				</div>
			</aside>
		</section>
	</div>
{/if}

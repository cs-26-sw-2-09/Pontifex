<script lang="ts">
	import type { PageData } from "./$types";
	import { resolve } from "$app/paths";

	let { data }: { data: PageData } = $props();

	let user = $derived(structuredClone(data.user));
</script>

<div class="min-h-screen bg-gray-900 px-6 py-10 text-white">
	<!-- Top Header with back button for easy navigation-->
	<div class="mx-auto mb-8 flex max-w-3xl items-center justify-between">
		<a
			href={resolve("/admin")}
			class="rounded-xl bg-gray-700 px-5 py-2 shadow-md transition-all hover:bg-gray-600"
		>
			← Back
		</a>

		<h1 class="text-4xl font-bold">Edit User: <b>{user?.Name}</b></h1>

		<div></div>
	</div>

	<!-- Main Edit content-->
	<div class="mx-auto max-w-3xl rounded-3xl bg-gray-800 p-10 shadow-2xl">
		<form method="POST" action="?/saveUser" class="flex flex-col gap-8">
			<!-- USER NAME -->
			<div class="flex flex-col gap-2">
				<label for="name" class="text-lg font-medium text-gray-300">Full Name</label>
				<input
					id="name"
					name="name"
					bind:value={user.Name}
					class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>

			<!-- USER ROLE -->
			<div class="flex flex-col gap-2">
				<label for="role" class="text-lg font-medium text-gray-300">Role</label>
				<select
					name="role"
					id="role"
					bind:value={user.Role}
					class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				>
					<option value="Student">Student</option>
					<option value="Teacher">Teacher</option>
					<option value="Admin">Admin</option>
				</select>
			</div>

			{#if (user.UserInfo !== undefined)}
				<div class="flex flex-col gap-2">
					<label for="Email" class="text-lg font-medium text-gray-300">Email</label>
					<input
						id="Email"
						name="Email"
						bind:value={user.UserInfo[0].Email}
						class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="address" class="text-lg font-medium text-gray-300">Address</label>
					<input
						id="address"
						name="address"
						bind:value={user.UserInfo[0].Address}
						class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="phonenumber" class="text-lg font-medium text-gray-300">Phone Number</label>
					<input
						id="phonenumber"
						name="phonenumber"
						bind:value={user.UserInfo[0].PhoneNumber}
						class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
					/>
				</div>
			{/if}


			<!-- USER ID readonly -->
			<div class="flex flex-col gap-2">
				<label for="id" class="text-lg font-medium text-gray-300">User ID</label>
				<input
					id="id"
					readonly
					value={user.Id}
					class="rounded-xl bg-gray-900 px-4 py-3 text-gray-400"
				/>
			</div>

			<!-- SAVE BUTTON -->
			<div class="flex justify-end pt-4">
				<button
					type="submit"
					class="rounded-2xl bg-green-600 px-8 py-3 font-semibold shadow-lg transition-all hover:bg-green-500"
				>
					Save Changes
				</button>
			</div>
		</form>

		<!-- DELETE SECTION -->
		<div class="mt-12 border-t border-gray-700 pt-8">
			<h2 class="mb-4 text-xl font-semibold text-red-400">Danger Zone</h2>

			<form method="POST" action="?/deleteUser">
				<button
					type="submit"
					class="rounded-2xl bg-red-500 px-8 py-3 font-semibold shadow-lg transition-all hover:bg-red-500"
				>
					Delete User
				</button>
			</form>
		</div>
	</div>
</div>

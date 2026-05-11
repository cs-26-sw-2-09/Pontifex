<script lang="ts">
	let role = $state("Student");
	let gender = $state("Other");
	import { resolve } from "$app/paths";
</script>

<div class="min-h-screen bg-gray-900 px-6 py-10 text-white">
	<div class="mx-auto max-w-2xl rounded-3xl bg-gray-800 p-10 shadow-2xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-4xl font-bold">Add User</h1>

			<a
				href={resolve("/admin")}
				class="rounded-xl bg-gray-700 px-5 py-2 transition-all hover:bg-gray-600"
			>
				← Back
			</a>
		</div>

		<form method="POST" action="?/createUser" class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="name" class="text-gray-300">Name</label>
				<input
					id="name"
					name="name"
					required
					class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="role" class="text-gray-300">Role</label>
				<select
					id="role"
					name="role"
					bind:value={role}
					class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				>
					<option value="Student">Student</option>
					<option value="Teacher">Teacher</option>
					<option value="Admin">Admin</option>
				</select>
			</div>

			<div class="flex flex-col gap-2">
				<label for="gender" class="text-gray-300">Gender</label>
				<select
					id="gender"
					name="gender"
					bind:value={gender}
					class="rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="NonBinary">NonBinary</option>
					<option value="Other">Other</option>
				</select>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<input
					name="email"
					placeholder="Email"
					class="input rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<input
					name="phoneNumber"
					placeholder="Phone number"
					class="input rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<input
					name="birthdate"
					type="date"
					class="input rounded-xl border-amber-300 bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<input
					name="cpr"
					placeholder="CPR"
					class="input rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500"
				/>
				<input
					name="address"
					placeholder="Address"
					class="input rounded-xl bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-gray-500 md:col-span-2"
				/>
			</div>

			<button
				type="submit"
				class="rounded-2xl bg-green-600 px-8 py-3 font-semibold shadow-lg transition-all hover:bg-green-500"
			>
				Create User
			</button>
		</form>
	</div>
</div>

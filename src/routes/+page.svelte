<script lang="ts">
	let { data } = $props();
</script>

<div class="flex min-h-screen flex-col items-center pt-48 text-center">
	<h1 class="text-5xl font-bold text-gray-100">Lectio Pontifex</h1>
	<h2 class="mt-4 text-xl text-gray-200">Who are you?</h2>

	<div class="mt-10 flex gap-6">
		<form method="POST" action="?/login" class="flex flex-col gap-2">
			<p class="text-center text-sm font-medium text-blue-400">Student</p>
			<select
				name="id"
				class="rounded-xl border border-blue-400 bg-white px-6 py-3 text-blue-400 shadow-md"
			>
				{#each data.students as student (student.Id)}
					<option value={student.Id}>{student.Name}</option>
				{/each}
			</select>
			<input type="hidden" name="role" value="Student" />
			<button
				type="submit"
				class="rounded-xl border border-blue-400 px-6 py-2 text-blue-400 shadow-md transition hover:bg-blue-400 hover:text-slate-900"
			>
				Login
			</button>
		</form>

		<form method="POST" action="?/login" class="flex flex-col gap-2">
			<p class="text-center text-sm font-medium text-emerald-400">Teacher</p>
			<select
				name="id"
				class="rounded-xl border border-emerald-400 bg-white px-6 py-3 text-emerald-400 shadow-md"
			>
				{#each data.teachers as teacher (teacher.Id)}
					<option value={teacher.Id}>{teacher.Name}</option>
				{/each}
			</select>
			<input type="hidden" name="role" value="Teacher" />
			<button
				type="submit"
				class="rounded-xl border border-emerald-400 px-6 py-2 text-emerald-400 shadow-md transition hover:bg-emerald-400 hover:text-slate-900"
			>
				Login
			</button>
		</form>

		<form method="POST" action="?/login" class="flex flex-col gap-2">
			<p class="text-center text-sm font-medium text-red-400">Admin</p>
			<select
				name="id"
				class="rounded-xl border border-red-400 bg-white px-6 py-3 text-red-400 shadow-md"
			>
				{#each data.admins as admin (admin.Id)}
					<option value={admin.Id}>{admin.Name}</option>
				{/each}
			</select>
			<input type="hidden" name="role" value="Admin" />
			<button
				type="submit"
				class="rounded-xl border border-red-400 px-6 py-2 text-red-400 shadow-md transition hover:bg-red-400 hover:text-slate-900"
			>
				Login
			</button>
		</form>
	</div>
</div>

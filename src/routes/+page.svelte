<script lang="ts">
	import Auth from "$lib/Components/Auth.svelte";
	let activeFormId = $state("");
	let { data } = $props();
</script>

<div class="-mt-20 flex min-h-screen flex-col items-center justify-center gap-10 text-center">
	<div
		class="flex h-auto w-auto flex-col items-center justify-center gap-10 rounded-2xl border-2 border-gray-700 bg-gray-900/80 p-10 backdrop-blur-lg"
	>
		<div>
			<h1 class="text-5xl font-bold text-gray-100">Lectio Pontifex</h1>
			<h2 class="text-2xl font-light text-gray-200">Who are you?</h2>
		</div>

		<div class="flex gap-6">
			<form method="POST" action="?/login" id="student-login" class="flex flex-col gap-2">
				<p class="text-center text-sm font-medium text-blue-400">Student</p>
				<select
					name="id"
					class="appearance-none justify-between rounded-xl border border-blue-400 bg-gray-800 px-8 py-3 text-blue-400 shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
				>
					{#each data.students as student (student.Id)}
						<option value={student.Id}>{student.Name}</option>
					{/each}
				</select>
				<input type="hidden" name="role" value="Student" id="SelectedStudent" />
				<button
					onclick={() => (activeFormId = "student-login")}
					command="show-modal"
					commandfor="dialog"
					type="button"
					class="rounded-xl border border-blue-400 px-6 py-2 text-blue-400 shadow-md transition hover:bg-blue-400 hover:text-slate-900"
				>
					Login
				</button>
			</form>

			<form method="POST" action="?/login" id="teacher-login" class="flex flex-col gap-2">
				<p class="text-center text-sm font-medium text-emerald-400">Teacher</p>
				<select
					name="id"
					class="appearance-none rounded-xl border border-emerald-400 bg-gray-800 px-8 py-3 text-emerald-400 shadow-md focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
				>
					{#each data.teachers as teacher (teacher.Id)}
						<option
							class="flex justify-center gap-5 rounded-lg p-4 selection:bg-emerald-500"
							value={teacher.Id}>{teacher.Name}</option
						>
					{/each}
				</select>
				<input type="hidden" name="role" value="Teacher" />
				<button
					onclick={() => (activeFormId = "teacher-login")}
					command="show-modal"
					commandfor="dialog"
					type="button"
					class="rounded-xl border border-emerald-400 px-6 py-2 text-emerald-400 shadow-md transition hover:bg-emerald-400 hover:text-slate-900"
				>
					Login
				</button>
			</form>

			<form method="POST" action="?/login" id="admin-login" class="flex flex-col gap-2">
				<p class="text-center text-sm font-medium text-red-400">Admin</p>
				<select
					name="id"
					class="appearance-none rounded-xl border border-red-400 bg-gray-800 px-8 py-3 text-red-400 shadow-md focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
				>
					{#each data.admins as admin (admin.Id)}
						<option value={admin.Id}>{admin.Name}</option>
					{/each}
				</select>
				<input type="hidden" name="role" value="Admin" />
				<button
					onclick={() => (activeFormId = "admin-login")}
					command="show-modal"
					commandfor="dialog"
					type="button"
					class="rounded-xl border border-red-400 px-6 py-2 text-red-400 shadow-md transition hover:bg-red-400 hover:text-slate-900"
				>
					Login
				</button>
			</form>
			<Auth formId={activeFormId} />
		</div>
	</div>
</div>

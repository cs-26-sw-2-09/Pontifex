<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { setCookie } from "$lib/cookies/cookies";

	const students = [
		"Student 1",
		"Student 2",
		"Student 3",
		"Student 4",
		"Student 5",
		"Student 6",
		"Student 7",
		"Student 8",
		"Student 9",
		"Student 10",
		"Student 11",
		"Student 12",
		"Student 13",
		"Student 14",
		"Student 15",
		"Student 16",
		"Student 17",
		"Student 18",
		"Student 19",
		"Student 20"
	];
	const teachers = ["Teacher 1", "Teacher 2", "Teacher 3", "Teacher 4", "Teacher 5"];
	const admins = ["Admin 1", "Admin 2", "Admin 3"];

	let selectedStudent = "";
	let selectedTeacher = "";
	let selectedAdmin = "";

	function loginStudent() {
		if (selectedStudent === "") return;
		setCookie("user", students[Number(selectedStudent)]);
		goto(resolve("/student"));
	}

	function loginTeacher() {
		if (selectedTeacher === "") return;
		setCookie("user", teachers[Number(selectedTeacher)]);
		goto(resolve("/teacher"));
	}

	function loginAdmin() {
		if (selectedAdmin === "") return;
		setCookie("user", admins[Number(selectedAdmin)]);
		goto(resolve("/admin"));
	}
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-100 pt-48 text-center">
	<h1 class="text-5xl font-bold">Lectio Pontifex</h1>
	<h2 class="mt-4 text-xl">Who are you?</h2>

	<div class="mt-10 flex gap-6">
		<div class="flex flex-col gap-2">
			<select
				bind:value={selectedStudent}
				class="rounded-xl border border-blue-400 bg-white px-6 py-3 text-blue-400 shadow-md"
			>
				<option value="">Student</option>
				{#each students as student, i (i)}
					<option value={i}>{student}</option>
				{/each}
			</select>
			<button
				on:click={loginStudent}
				class="rounded-xl border border-blue-400 px-6 py-2 text-blue-400 shadow-md transition hover:bg-blue-400 hover:text-slate-900"
			>
				Login
			</button>
		</div>

		<div class="flex flex-col gap-2">
			<select
				bind:value={selectedTeacher}
				class="rounded-xl border border-emerald-400 bg-white px-6 py-3 text-emerald-400 shadow-md"
			>
				<option value="">Teacher</option>
				{#each teachers as teacher, i (i)}
					<option value={i}>{teacher}</option>
				{/each}
			</select>
			<button
				on:click={loginTeacher}
				class="rounded-xl border border-emerald-400 px-6 py-2 text-emerald-400 shadow-md transition hover:bg-emerald-400 hover:text-slate-900"
			>
				Login
			</button>
		</div>

		<div class="flex flex-col gap-2">
			<select
				bind:value={selectedAdmin}
				class="rounded-xl border border-red-400 bg-white px-6 py-3 text-red-400 shadow-md"
			>
				<option value="">Admin</option>
				{#each admins as admin, i (i)}
					<option value={i}>{admin}</option>
				{/each}
			</select>
			<button
				on:click={loginAdmin}
				class="rounded-xl border border-red-400 px-6 py-2 text-red-400 shadow-md transition hover:bg-red-400 hover:text-slate-900"
			>
				Login
			</button>
		</div>
	</div>
</div>

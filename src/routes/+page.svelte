<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { setUserCookie } from "$lib/cookies/cookies";

	const students = [
		{ name: "Student 1", id: 1 },
		{ name: "Student 2", id: 2 },
		{ name: "Student 3", id: 3 },
		{ name: "Student 4", id: 4 },
		{ name: "Student 5", id: 5 },
		{ name: "Student 6", id: 6 },
		{ name: "Student 7", id: 7 },
		{ name: "Student 8", id: 8 },
		{ name: "Student 9", id: 9 },
		{ name: "Student 10", id: 10 },
		{ name: "Student 11", id: 11 },
		{ name: "Student 12", id: 12 },
		{ name: "Student 13", id: 13 },
		{ name: "Student 14", id: 14 },
		{ name: "Student 15", id: 15 },
		{ name: "Student 16", id: 16 },
		{ name: "Student 17", id: 17 },
		{ name: "Student 18", id: 18 },
		{ name: "Student 19", id: 19 },
		{ name: "Student 20", id: 20 }
	];
	const teachers = [
		{ name: "Teacher 1", id: 1 },
		{ name: "Teacher 2", id: 2 },
		{ name: "Teacher 3", id: 3 },
		{ name: "Teacher 4", id: 4 },
		{ name: "Teacher 5", id: 5 }
	];
	const admins = [
		{ name: "Admin 1", id: 1 },
		{ name: "Admin 2", id: 2 },
		{ name: "Admin 3", id: 3 }
	];

	let selectedStudent: number;
	let selectedTeacher: number;
	let selectedAdmin: number;

	function loginStudent() {
		if (!selectedStudent && selectedStudent != 0) return;
		setUserCookie(students[selectedStudent].id);
		goto(resolve("/student"));
	}

	function loginTeacher() {
		if (!selectedTeacher && selectedTeacher != 0) return;
		setUserCookie(teachers[selectedTeacher].id);
		goto(resolve("/teacher"));
	}

	function loginAdmin() {
		if (!selectedAdmin && selectedAdmin != 0) return;
		setUserCookie(admins[selectedAdmin].id);
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
				{#each students as student, i (i)}
					<option value={i}>{student.name}</option>
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
				{#each teachers as teacher, i (i)}
					<option value={i}>{teacher.name}</option>
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
				{#each admins as admin, i (i)}
					<option value={i}>{admin.name}</option>
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

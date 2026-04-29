<script lang="ts">
	import { Role } from "$lib/types";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { currentUser } = data;
</script>

<h1 class=" p-2 text-[40px] font-bold">Profile</h1>

<div class="col-1 m-3 grid gap-4">
	<div class="rounded-xl border-2 bg-gray-700 p-4">
		<h2 class="font-semibold text-white">ID:</h2>
		<div class="mt-2 text-gray-300">
			<h4>{currentUser?.Role} {currentUser?.Id}</h4>
		</div>
	</div>

	<div class="rounded-xl bg-gray-700 p-4">
		<h2 class="font-semibold text-white">Name:</h2>
		<div class="mt-2 text-gray-300">
			<h4>{currentUser?.Name}</h4>
		</div>
	</div>

	<div class="rounded-xl bg-gray-700 p-4">
		<h2 class="font-semibold text-white">Phone number:</h2>
		<div class="mt-2 text-gray-300">
			<h4>{currentUser?.UserInfo[0].PhoneNumber}</h4>
		</div>
	</div>

	<div class="rounded-xl bg-gray-700 p-4">
		<h2 class="font-semibold text-white">Mail:</h2>
		<div class="mt-2 text-gray-300">
			<h4>{currentUser?.UserInfo[0].Email}</h4>
		</div>
	</div>

	<div class="rounded-xl bg-gray-700 p-4">
		<h2 class="font-semibold text-white">CPR-number:</h2>
		<div class="mt-2 text-gray-300">
			<h4>{currentUser?.UserInfo[0].CPR}</h4>
		</div>
	</div>
</div>

{#if currentUser?.Role === Role.Student}
	<div class="m-3 grid grid-cols-2 content-start gap-4">
		<div class="box-border h-50 w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
			<h2 class="font-bold">Attendence record:</h2>
		</div>

		<div class="col-start-2 box-border h-50 w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
			<h2 class="font-bold">Grades:</h2>
		</div>
	</div>
{/if}

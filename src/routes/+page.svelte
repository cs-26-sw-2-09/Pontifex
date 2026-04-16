<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
</script>

<div class="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-48 text-center">
	<h1 class="text-5xl font-bold">Lectio Pontifex</h1>
	<h2 class="mt-4 text-xl">Who are you?</h2>

	<div class="mt-10 flex gap-6">
		<button
			on:click={() => goto(resolve("/student"))}
			class="transform rounded-xl border border-blue-400 px-8 py-4
           text-blue-400 shadow-md
           transition duration-300 hover:-translate-y-1 hover:bg-blue-400
           hover:text-slate-900 hover:shadow-xl"
		>
			Student 1
		</button>

		<button
			on:click={() => goto(resolve("/student"))}
			class="transform rounded-xl border border-blue-400 px-8 py-4
           text-blue-400 shadow-md
           transition duration-300 hover:-translate-y-1 hover:bg-blue-400
           hover:text-slate-900 hover:shadow-xl"
		>
			Student 2
		</button>
	</div>
	<div class="mt-10 flex gap-6">
		<button
			on:click={() => goto(resolve("/teacher"))}
			class="transform rounded-xl border border-emerald-400 px-8 py-4
           text-emerald-400 shadow-md
           transition duration-300 hover:-translate-y-1 hover:bg-emerald-400
           hover:text-slate-900 hover:shadow-xl"
		>
			Teacher 1
		</button>

		<button
			on:click={() => goto(resolve("/teacher"))}
			class="transform rounded-xl border border-emerald-400 px-8 py-4
           text-emerald-400 shadow-md
           transition duration-300 hover:-translate-y-1 hover:bg-emerald-400
           hover:text-slate-900 hover:shadow-xl"
		>
			Teacher 2
		</button>
	</div>
	<div class="mt-10 flex gap-6">
		<button
			on:click={() => goto(resolve("/admin"))}
			class="transform rounded-xl border border-red-400 px-8 py-4
           text-red-400 shadow-md
           transition duration-300 hover:-translate-y-1 hover:bg-red-400
           hover:text-slate-900 hover:shadow-xl"
		>
			Admin
		</button>
	</div>
</div>

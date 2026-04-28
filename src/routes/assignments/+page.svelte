<script lang="ts">
	export let data;
</script>

<h1 class="mb-4 text-2xl font-bold">Assignments</h1>

{#if data.assignments.length > 0}
	<ul class="space-y-4">
		{#each data.assignments as assignment (assignment.Id)}
			<li class="rounded-lg border border-gray-300 bg-white p-4 shadow-sm hover:bg-gray-50">
				<p class="text-lg font-semibold text-gray-900">{assignment.Name}</p>
				<p class="mt-1 text-sm text-gray-500">Course: {assignment.CourseId}</p>
				<p class="mt-1 text-sm text-gray-500">
					Due Date: {new Date(assignment.DueDate).toLocaleDateString()}
				</p>
				{#if assignment.HandedIn}
					<p class="mt-2 text-sm font-medium text-green-600">Status: Handed In</p>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-gray-500">No assignments found.</p>
{/if}

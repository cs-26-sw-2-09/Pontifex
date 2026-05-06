<script lang="ts">
	let { data } = $props();
</script>

<h1 class="text-2x1 font bold mb-4">
	Assigments for {data.user.Name}
</h1>

{#if data.assignments.length > 0}
	<ul class="space-y-4">
		{#each data.assignments as assignment (assignment.Id)}
			<li class="rounded border p-4">
				<h2 class="font-semibold">{assignment.Name}</h2>
				<p>{assignment.Description}</p>
				<p>Course: {assignment.CourseId}</p>
				<p>Due: {assignment.DueDate}</p>
			</li>
		{/each}
	</ul>
{:else}
	<p>No assignments found.</p>
{/if}

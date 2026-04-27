<script lang="ts">
	// Recieve data from +page.server.ts load function
	let { data } = $props();

	// A basic interface so Typescript does not complain about the type of the handed in assignments
	interface HandedInAssignment {
		AssignmentId: number;
		HandInDate: Date;
	}
</script>

<h1 class="text-center text-[42px]">Assignments, {data.userName}!</h1>

<div class="m-10 mr-30 ml-30 grid content-start gap-4">
	{#each data.assignments as assignment (assignment.Id)}
		{@const submission = data.handedInAssignments.find(
			(h: HandedInAssignment) => h.AssignmentId === assignment.Id
		)}
		{@const isHandedIn = !!submission}

		<div
			class="box-border h-auto w-full rounded-lg border-2 p-3 shadow-lg
	{isHandedIn ? 'border-green-200 bg-green-100' : 'border-gray-200 bg-white'}"
		>
			<ul>
				<li class="text-xl font-bold">{assignment.Name}</li>
				<li>Course ID: {assignment.CourseId}</li>
				<li>{assignment.Description}</li>
				<li class="text-sm text-gray-600">
					<!-- Display due date -->
					Due: {new Date(assignment.DueDate).toLocaleDateString()}

					<!-- If the assignment has been handed in, show the handed-in date -->
					{#if submission}
						<br />
						Handed in: {new Date(submission.HandInDate).toLocaleDateString()}
					{/if}
				</li>
			</ul>
		</div>
	{/each}

	{#if data.assignments.length === 0}
		<p class="text-center text-gray-500">No assignments found.</p>
	{/if}
</div>

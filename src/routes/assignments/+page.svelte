<script lang="ts">
	// Import function to get the logged-in user from cookies
	import { getUserCookie } from "$lib/cookies/cookies";

	// Get current user name for display
	const user = getUserCookie();

	// TypeScript interface for assignments
	interface Assignment {
		Id: number;
		TeacherId: number;
		CourseId: number;
		Name: string;
		Description: string;
		DueDate: string;
	}

	// TypeScript interface for handed-in assignments
	interface HandedInAssignment {
		Id: number;
		UserId: number;
		AssignmentId: number;
		HandInDate: string;
		Grade?: number;
		Feedback?: string;
		AssignmentText?: string;
	}

	// Props passed from +server.ts load function
	export let data: {
		assignments: Assignment[];
		handedInAssignments: HandedInAssignment[];
	};
</script>

<!-- Page title showing the current user -->
<h1 class="text-center text-[42px]">Assignments, {user}!</h1>

<div class="m-10 mr-30 ml-30 grid content-start gap-4">
	{#each data.assignments as assignment (assignment.Id)}
		<!-- Card for each assignment; color depends on whether it has been handed in -->
		<div
			class="box-border h-auto w-full rounded-lg border-2 p-3 shadow-lg"
			class:bg-green-200={data.handedInAssignments.some((h) => h.AssignmentId === assignment.Id)}
			class:bg-gray-200={!data.handedInAssignments.some((h) => h.AssignmentId === assignment.Id)}
		>
			<ul>
				<li class="text-xl font-bold">{assignment.Name}</li>
				<li>Course ID: {assignment.CourseId}</li>
				<li>{assignment.Description}</li>
				<li class="text-sm text-gray-600">
					<!-- Display due date -->
					Due: {new Date(assignment.DueDate).toLocaleDateString()}

					<!-- If the assignment has been handed in, show the handed-in date -->
					{#if data.handedInAssignments.some((h) => h.AssignmentId === assignment.Id)}
						<br />
						Handed in: {new Date(
							data.handedInAssignments.find((h) => h.AssignmentId === assignment.Id)?.HandInDate ??
								""
						).toLocaleDateString()}
					{/if}
				</li>
			</ul>
		</div>
	{/each}

	<!-- Fallback if there are no assignments -->
	{#if data.assignments.length === 0}
		<p class="text-center text-gray-500">No assignments found.</p>
	{/if}
</div>

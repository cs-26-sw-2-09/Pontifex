<script lang="ts">
	import { Role } from "$lib/types.js";

	let { data } = $props();
</script>

<p>Assignment name: {data.assignment.Name}</p>
<p>Assignment description: {data.assignment.Description}</p>
<p>Assignment due date: {new Date(data.assignment.DueDate).toLocaleDateString()}</p>

{#if data.user.Role === Role.Student}
	{#if data.assignment.Submissions?.length}
		<p>
			Submitted on: {new Date(data.assignment.Submissions[0].SubmissionDate).toLocaleDateString()}
		</p>
		<p>Your submission: {data.assignment.Submissions[0].AssignmentText}</p>
	{:else}
		<!-- Input form to submit assignment -->
		<!-- It is just a text input -->
		<form method="POST" action="?/submit" class="mt-4">
			<label for="submission" class="block text-sm font-medium text-gray-700"
				>Your submission:</label
			>
			<div class="mt-1">
				<input
					type="text"
					name="submission"
					id="submission"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder="Enter your submission here"
				/>
			</div>
			<button
				type="submit"
				class="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
			>
				Submit Assignment
			</button>
		</form>
	{/if}
{/if}

{#if data.user!.Role === Role.Teacher}
	<h2 class="mt-6 text-xl font-semibold text-gray-900">Submissions:</h2>
	{#if data.assignment.Submissions?.length}
		<ul class="mt-4 space-y-4">
			{#each data.assignment.Submissions as submission (submission.Id)}
				<li class="rounded-lg bg-gray-700 p-4 shadow">
					<p class="text-sm text-gray-300">Student: {submission.User.Name}</p>
					<p class="mt-1 text-gray-300">Submission: {submission.AssignmentText}</p>
					<p class="mt-1 text-sm text-gray-400">
						Submitted on: {new Date(submission.SubmissionDate).toISOString()}
					</p>
					<!-- Add a form to grade the submission with feedback -->
					<form method="POST" action="?/grade" class="mt-4">
						<input type="hidden" name="submissionId" value={submission.Id} />
						<label for="grade-{submission.Id}" class="block text-sm font-medium text-gray-700"
							>Grade:</label
						>
						<div class="mt-1">
							<input
								type="text"
								name="feedback"
								id="feedback-{submission.Id}"
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Enter feedback here"
							/>
							<input
								type="number"
								name="Grade"
								id="grade-{submission.Id}"
								class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Enter grade here (1-5)"
								min="1"
								max="5"
							/>
						</div>
						<button
							type="submit"
							class="mt-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
						>
							Grade Submission
						</button>
					</form>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mt-4 text-gray-300">No submissions yet.</p>
	{/if}
{/if}

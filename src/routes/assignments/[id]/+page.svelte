<script lang="ts">
	import { Role } from "$lib/types.js";

	let { data } = $props();
	import Navbar from "$lib/Components/Navbar.svelte";
</script>

<Navbar role={data.user!.Role} userId={data.user!.Id} />

<div class="flex flex-col gap-5">
	<div class="mx-auto w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
		<h1 class="mt-2 mb-2 text-4xl font-bold">Assignment name: {data.assignment?.Name}</h1>
		<p>Assignment description: <br /> {data.assignment?.Description}</p>
		<p>Assignment due date: {new Date(data.assignment.DueDate).toLocaleString()}</p>
	</div>
	{#if data.user?.Role === Role.Student}
		<div class="mx-auto w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
			{#if data.assignment?.Submissions?.length}
				<p>
					Submitted on: {new Date(data.assignment.Submissions[0].SubmissionDate).toLocaleString()}
				</p>
				<p>Your submission: {data.assignment.Submissions[0].AssignmentText}</p>
				{#if data.Reviews.filter((review) => review.SubmissionsId === data.assignment.Submissions[0].Id).length}
					<p class="mt-2 text-sm text-green-400">Graded</p>
					<p class="mt-1 text-gray-300">
						Feedback: {data.Reviews.find(
							(review) => review.SubmissionsId === data.assignment.Submissions[0].Id
						)?.Feedback}
					</p>
					<p class="mt-1 text-gray-300">
						Grade: {data.Reviews.find(
							(review) => review.SubmissionsId === data.assignment.Submissions[0].Id
						)?.Grade}
					</p>
				{:else}
					<p class="mt-2 text-sm text-yellow-400">Not graded yet</p>
				{/if}
			{:else}
				<!-- Input form to submit assignment -->
				<!-- It is just a text input -->
				<form method="POST" action="?/submit" class="mt-4">
					<label for="submission" class="block text-sm font-medium">Your submission:</label>
					<div class="mt-1 text-gray-950">
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
						class="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
					>
						Submit Assignment
					</button>
				</form>
			{/if}
		</div>
	{/if}
	{#if data.user!.Role === Role.Teacher || data.user!.Role === Role.Admin}
		<div class="mx-auto w-6xl rounded-2xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
			<h1 class="mt-6 text-xl font-semibold">Submissions:</h1>
			{#if data.assignment?.Submissions?.length}
				<ul class="mt-4 space-y-4">
					{#each data.assignment?.Submissions as submission (submission.Id)}
						<li class="rounded-lg bg-gray-700 p-4 shadow">
							<p class="text-sm text-gray-300">Student: {submission.User?.Name}</p>
							<p class="mt-1 text-gray-300">Submission: {submission.AssignmentText}</p>
							<p class="mt-1 text-sm text-gray-400">
								Submitted on: {new Date(submission.SubmissionDate).toLocaleString()}
							</p>
							{#if data.Reviews.filter((review) => review.SubmissionsId === submission.Id).length}
								<p class="mt-2 text-sm text-green-400">Already graded</p>
								<p class="mt-1 text-gray-300">
									Feedback: {data.Reviews.find((review) => review.SubmissionsId === submission.Id)
										?.Feedback}
								</p>
								<p class="mt-1 text-gray-300">
									Grade: {data.Reviews.find((review) => review.SubmissionsId === submission.Id)
										?.Grade}
								</p>
							{:else}
								<!-- Add a form to grade the submission with feedback -->
								<form method="POST" action="?/grade" class="mt-4">
									<input type="hidden" name="submissionId" value={submission.Id} />
									<label for="grade-{submission.Id}" class="block text-sm font-medium">Grade:</label
									>
									<div class="mt-1 text-gray-950">
										<input
											type="text"
											name="feedback"
											id="feedback-{submission.Id}"
											class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="Enter feedback here"
										/>
										<input
											type="number"
											name="grade"
											id="grade-{submission.Id}"
											class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											placeholder="Enter grade here (1-5)"
											min="1"
											max="5"
										/>
										<input type="hidden" name="SubId" value={submission.Id} />
									</div>
									<button
										type="submit"
										class="mt-2 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
									>
										Grade Submission
									</button>
								</form>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-4 text-gray-300">No submissions yet.</p>
			{/if}
		</div>
	{/if}
</div>

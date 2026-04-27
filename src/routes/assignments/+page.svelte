<script lang="ts">
	import { getUserCookie } from "$lib/cookies/cookies";

	const user = getUserCookie();

	export let data;
</script>

<h1 class="text-center text-[42px]">Assignments, {user}!</h1> <!-- Remove cookie at some point -->

<div class="m-10 ml-30 mr-30 grid content-start gap-4">
    {#each data.assignments as assignment (assignment.Id)}
    <div class="box-border h-auto w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
        <ul>
            <li class="text-xl font-bold">{assignment.Name}</li>
            <li>{assignment.Description}</li>
            <li class="text-sm text-gray-600">
                Due: {new Date(assignment.DueDate).toLocaleDateString()}
            </li>
        </ul>
    </div>
{/each}
</div>

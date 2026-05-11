<script lang="ts">
	export let data: PageData;
</script>

{data.course.Name}

{#each data.course.Assignments as assignment (assignment.Id)}
	<div class="border-10 p-2 text-center text-[25px] text-white">
		<a href="/course/{data.course.Id}/assignment/{assignment.Id}">{assignment.Name}</a>
	</div>
{/each}

{#each data.course.Users as user (user.Id)}
	<div class="border-10 p-2 text-center text-[25px] text-white">
		<a href="/profile/{user.Id}">{user.Name}</a>
	</div>
{/each}

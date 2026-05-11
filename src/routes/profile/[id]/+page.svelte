<script lang="ts">
	export let data: PageData;
</script>

<p>Name: {data.user.Name}</p>
<p>Role: {data.user.Role}</p>
<p>Gender {data.user.UserInfo[0].Gender}</p>
<p>Email: {data.user.UserInfo[0].Email}</p>
<p>Phone Number: {data.user.UserInfo[0].PhoneNumber}</p>
<p>Birthdate: {data.user.UserInfo[0].Birthdate}</p>
<p>CPR: {data.user.UserInfo[0].CPR}</p>
<p>Address: {data.user.UserInfo[0].Address}</p>
{#each data.user.Course as course (course.Id)}
	<div class="border-10 p-2 text-center text-[25px] text-white">
		<a href="/course/{course.Id}">{course.Name}</a>
	</div>
{/each}

<script lang="ts">
	import Navbar from "$lib/Components/Navbar.svelte";
	let { data } = $props();
</script>

<Navbar role={data.Role!} />
<h1 class="text-center text-[42px]">Welcome, {data.Name}!</h1>

<div class="m-10 grid grid-cols-3 content-start gap-4">
	<div class="box-border h-50 w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
		<h2 class="text-center text-[20px] font-bold">Information</h2>
		<ul>
			<li>General info</li>
			<li>General info</li>
			<li>General info</li>
			<li>General info</li>
		</ul>
	</div>
	<div
		class="col-start-3 row-span-2 box-border grid h-full w-full gap-1 rounded-lg border-2 bg-gray-200 p-3 shadow-lg"
	>
		<table class="table-auto text-center">
			<thead class="text-[20px]">
				<tr>
					<th></th>
					<th>Schedule</th>
					<th></th>
				</tr>
			</thead>
			<thead class="">
				<tr>
					<th>Period</th>
					<th>Time</th>
					<th>Course</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1st period</td>
					<td>8.15-10.00</td>
					<td>Course 1</td>
				</tr>
				<tr>
					<td>2nd period</td>
					<td>10.15 - 12.00</td>
					<td>Course 2</td>
				</tr>
				<tr>
					<td>3rd period</td>
					<td>12.30 - 14.15</td>
					<td>Course 3</td>
				</tr>
				<tr>
					<td>4th period</td>
					<td>14.20 - 16.05</td>
					<td>Course 4</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="col-start-1 box-border h-50 w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
		<h2 class="text-center text-[20px] font-bold">Education</h2>
		<ul>
			<li>Stuff about education</li>
			<li>Stuff about education</li>
			<li>Stuff about education</li>
			<li>Stuff about education</li>
		</ul>
	</div>
</div>

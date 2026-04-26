<script lang="ts">
	import { getUserCookie } from "$lib/cookies/cookies";

	const user = getUserCookie();

</script>

<h1 class="text-center text-[42px]">Assignments, {user}!</h1> <!-- Remove cookie at some point -->

<div class="m-10 ml-30 mr-30 grid content-start gap-4">
	<div class="box-border h-auto w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
		<ul>
			<li>fawwa</li>
		</ul>
	</div>
	<div class="box-border h-auto w-full rounded-lg border-2 bg-gray-200 p-3 shadow-lg">
	<ul>
			<li>waf</li>
		</ul>
	</div>
</div>

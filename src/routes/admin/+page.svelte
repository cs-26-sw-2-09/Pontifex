<script lang="ts">
	import { getUserCookie } from "$lib/cookies/cookies";

	const user = getUserCookie();
</script>

<h1 class="text-center text-[42px]">Welcome, {user}!</h1>

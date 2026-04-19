<script lang="ts">
	import { getCookie } from "$lib/cookies/cookies";

	const user = getCookie("user"); // "Student 2"
</script>

<p>Logget ind som: {user}</p>

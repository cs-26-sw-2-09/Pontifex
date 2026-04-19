<script lang="ts">
    import { getCookie } from '$lib/cookies/cookies';

    const user = getCookie('user');
</script>

<h1 class="text-center text-[42px]">Welcome, {user}!</h1>

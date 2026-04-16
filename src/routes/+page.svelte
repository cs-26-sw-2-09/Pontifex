<script>
  import { goto } from '$app/navigation';
</script>

<h1>Welcome to Lectio</h1>
<h2>Choose your role to continue</h2>
<button on:click={() => goto('/student')}>Student</button>
<button on:click={() => goto('/teacher')}>Teacher</button>
<button on:click={() => goto('/admin')}>Admin</button>

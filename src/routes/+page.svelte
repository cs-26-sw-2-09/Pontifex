<script>
  import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gray-400 flex flex-col items-center justify-start p-48 text-center">
  <h1 class="text-5xl font-bold">Lectio Pontifex</h1>
  <h2 class="text-xl mt-4">Choose your role to continue</h2>

<button on:click={() => goto('/student')}>Student</button>
<button on:click={() => goto('/teacher')}>Teacher</button>
<button on:click={() => goto('/admin')}>Admin</button>

  </div>
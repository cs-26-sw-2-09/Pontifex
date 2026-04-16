<script>
  import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-48 text-center">
  <h1 class="text-5xl font-bold">Lectio Pontifex</h1>
  <h2 class="text-xl mt-4">Who are you?</h2>

<div class="flex gap-6 mt-10">

  <button
    on:click={() => goto('/student')}
     class="px-8 py-4 rounded-xl border border-blue-400 text-blue-400
           hover:bg-blue-400 hover:text-slate-900
           transition duration-300 shadow-md hover:shadow-xl
           transform hover:-translate-y-1"
  >
    Student 1
  </button>

  <button
    on:click={() => goto('/student')}
    class="px-8 py-4 rounded-xl border border-blue-400 text-blue-400
           hover:bg-blue-400 hover:text-slate-900
           transition duration-300 shadow-md hover:shadow-xl
           transform hover:-translate-y-1"
  >
    Student 2
  </button>
</div>
<div class="flex gap-6 mt-10">
  <button
    on:click={() => goto('/teacher')}
    class="px-8 py-4 rounded-xl border border-emerald-400 text-emerald-400
           hover:bg-emerald-400 hover:text-slate-900
           transition duration-300 shadow-md hover:shadow-xl
           transform hover:-translate-y-1"
  >
    Teacher 1
  </button>

    <button
    on:click={() => goto('/teacher')}
    class="px-8 py-4 rounded-xl border border-emerald-400 text-emerald-400
           hover:bg-emerald-400 hover:text-slate-900
           transition duration-300 shadow-md hover:shadow-xl
           transform hover:-translate-y-1"
  >
    Teacher 2
  </button>
</div>
<div class="flex gap-6 mt-10">
  <button
    on:click={() => goto('/admin')}
    class="px-8 py-4 rounded-xl border border-red-400 text-red-400
           hover:bg-red-400 hover:text-slate-900
           transition duration-300 shadow-md hover:shadow-xl
           transform hover:-translate-y-1"
  >
    Admin
  </button>

</div>

  </div>


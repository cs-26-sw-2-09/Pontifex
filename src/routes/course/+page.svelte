<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<h1 class="text-center text-[40px] font-bold">These are your courses</h1>

<div class="">
    <ul class="box-border bg-gray-700">
        {#each data.courses as course (course.Id)}
            <li class="text-white text-[25px] text-center border-10 p-2">{course.Name}</li>
        {/each}
    </ul>
</div>
<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import "@tailwindplus/elements";
	import { resolve } from "$app/paths";


	let { children } = $props();

	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
<nav
	class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
>
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					command="--toggle"
					commandfor="mobile-menu"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						data-slot="icon"
						aria-hidden="true"
						class="size-6 in-aria-expanded:hidden"
					>
						<path
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						data-slot="icon"
						aria-hidden="true"
						class="size-6 not-in-aria-expanded:hidden"
					>
						<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex shrink-0 items-center">
					<!-- FIX ICON FOR LMS -->
					<img
						src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
						alt="Your Company"
						class="h-8 w-auto"
					/>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" -->
						<a
							href={resolve("/")}
							aria-current="page"
							class="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">Home</a
						>
						<a
							href={resolve("/")}
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white"
							>Courses</a
						>
						<a
							href={resolve("/")}
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white"
							>Assignments</a
						>
					</div>
				</div>
			</div>

			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Profile dropdown -->
				<el-dropdown class="relative ml-3">
					<button
						class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						<span class="absolute -inset-1.5"></span>
						<span class="sr-only">Open user menu</span>
						<!-- TODO FIX NAV BAR ICON FOR PROFILE -->
						<img
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
							class="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
						/>
					</button>

					<el-menu
						anchor="bottom end"
						popover="manual"
						class="w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
					>
						<a
							href={resolve("/")}
							class="block px-4 py-2 text-sm text-gray-200 focus:bg-white/5 focus:outline-hidden"
							>Your profile</a
						>
						<a
							href={resolve("/")}
							class="block px-4 py-2 text-sm text-gray-200 focus:bg-white/5 focus:outline-hidden"
							>Settings</a
						>
						
    <form method="POST" action="/logout" class="flex flex-col gap-2">
    <button
        type="submit"
        class="block w-full px-4 py-2 text-left text-sm text-gray-200 focus:bg-white/5 focus:outline-hidden"
    >
        Sign out
    </button>
</form>
					</el-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
	<!-- Mobile menu button-->
	<el-disclosure id="mobile-menu" hidden class="block sm:hidden">
		<div class="space-y-1 px-2 pt-2 pb-3">
			<!-- Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" -->
			<a
				href={resolve("/")}
				aria-current="page"
				class="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Home</a
			>
			<a
				href={resolve("/")}
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
				>Courses</a
			>
			<a
				href={resolve("/")}
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white"
				>Assingments</a
			>
		</div>
	</el-disclosure>
</nav>

{@render children()}

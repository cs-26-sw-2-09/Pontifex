<script lang="ts">
	import "@tailwindplus/elements";
	import { resolve } from "$app/paths";
	import type { Role } from "$lib/types";
	export let role: Role;
	// function logout(){
	// 	deleteUserCookie();
	// 	goto(resolve("/"));
	// }
</script>

<!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
<nav
	class="relative mb-6 bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
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
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" -->
						<a
							href={resolve(role ? `/${role.toLowerCase()}` : "/")}
							aria-current="page"
							class="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">Home</a
						>
						<a
							href={resolve("/course")}
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							stroke="rgb(238, 238, 238)"
							class="size-10"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							/>
						</svg>
					</button>

					<el-menu
						anchor="bottom end"
						popover="manual"
						class="w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
					>
						<a
							href={resolve("/profile")}
							class="block px-4 py-2 text-sm text-gray-200 focus:bg-white/5 focus:outline-hidden"
							>Your profile</a
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
				href={resolve(role ? `/${role.toLowerCase()}` : "/")}
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

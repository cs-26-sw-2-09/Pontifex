import { GetUsersWithRole } from "$lib/server/db";
import type { PageServerLoad, Actions } from "./$types";
import { Role } from "$lib/types";
import { Log } from "$lib/server/LogModule";
import { redirect } from "@sveltejs/kit";
import { error as SVKError } from "@sveltejs/kit";

// Fetches all users parallelly using promise.all into students, teachers, admin
export const load: PageServerLoad = async () => {
	try {
		// Check if the database connection is established by trying to fetch users with a role
		const [students, teachers, admins] = await Promise.all([
			GetUsersWithRole(Role.Student),
			GetUsersWithRole(Role.Teacher),
			GetUsersWithRole(Role.Admin)
		]);
		return { students, teachers, admins };
	} catch (err) {
		console.error("Failed to fetch users:", err);
		throw SVKError(500, "Database connection failed \n");
	}
};

// Requests the cookies, checks id's and gets the data from +page.svelte
// This works by using a form action in "?/login" where this code is called from
// The form data is then used to set the cookie and redirect to the role page
// Tottally not vibe coded... 🤫
export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get("id");
		const role = data.get("role") as string;
		if (!id || !role) throw SVKError(400, "ID and role are required");
		// cookie is set
		if (!id) {
			await Log.Error(new Error("ID is required", { cause: 400 }));
			throw SVKError(400, "ID is required");
		}
		cookies.set("user", id.toString(), {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 30
		});
		await Log.Login(parseInt(id.toString()), role as Role);
		// finds the role and converts to lowercase and then it redirects to the role page
		redirect(303, `/${role.toLowerCase()}`);
	}
};

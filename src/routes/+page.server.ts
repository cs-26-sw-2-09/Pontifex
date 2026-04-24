import { GetUsersWithRole } from "$lib/server/db";
import type { PageServerLoad, Actions } from "./$types";
import { Role } from "$lib/types";
import { redirect, error } from "@sveltejs/kit";

// stores the data parallelly using promise.all into students, teachers, admin
export const load: PageServerLoad = async () => {
	const [students, teachers, admins] = await Promise.all([
		GetUsersWithRole(Role.Student),
		GetUsersWithRole(Role.Teacher),
		GetUsersWithRole(Role.Admin)
	]);

	return { students, teachers, admins };
};
// Requests the cookies, checks id's and gets the data from +page.svelte
export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get("id");
		if (!id) error(400, "ID not found");
		const role = data.get("role") as string;
		// cookie is set
		cookies.set("user", id.toString(), {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 30
		});
		// finds the role and converts to lowercase and then it redirects to the role page
		redirect(303, `/${role.toLowerCase()}`);
	}
};

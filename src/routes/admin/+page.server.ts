import type { PageServerLoad } from "./$types";
import { GetUserFromId, GetUsersWithRole } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Role } from "$lib/types";

// gets the cookie, if not redirected to frontpage
export const load: PageServerLoad = async ({ cookies }) => {
	const users = await GetUsersWithRole(Role.Admin, true);
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const user = await GetUserFromId(userId, false);
	return {
		user: user,
		users: users
	};
};

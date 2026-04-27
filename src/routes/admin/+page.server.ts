import type { PageServerLoad } from "./$types";
import { GetUserFromId, GetUsersWithRole } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Role, type UserType } from "$lib/types";

// gets the cookie, if not redirected to frontpage
export const load: PageServerLoad = async ({ cookies }) => {
	const users: UserType[] = [];
	users.push(...await GetUsersWithRole(Role.Student, true));
	users.push(...await GetUsersWithRole(Role.Teacher, true));
	const userId: number = Number(cookies.get("user"));

	const user = await GetUserFromId(userId, false);

	if (!userId || user?.Role !== Role.Admin) {
		redirect(303, "/");
	}

	return {
		currentUser: user,
		users: users
	};
};

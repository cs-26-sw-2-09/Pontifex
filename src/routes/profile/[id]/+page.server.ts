import type { PageServerLoad } from "./$types";
import { GetUserFromId } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import { Actions, type UserType } from "$lib/types";
import { HasAccessToProfile } from "$lib/acm";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}
	const currentUser: UserType | undefined = await GetUserFromId(userId, false);
	if (!currentUser) throw redirect(303, "/");

	const user = await GetUserFromId(Number(params.id), true);
	if (!user) {
		throw error(404, "User not found");
	}
	if (!(await HasAccessToProfile(currentUser, Actions.Read, user)))
		throw error(403, "You do not have access to this profile");
	return { user, currentUser };
};

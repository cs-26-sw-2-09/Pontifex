import type { PageServerLoad } from "./$types";
import { GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

// gets the cookie, if not redirected to frontpage
export const load: PageServerLoad = async ({ cookies }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const user = await GetUserFromId(userId, false);
	return user;
};

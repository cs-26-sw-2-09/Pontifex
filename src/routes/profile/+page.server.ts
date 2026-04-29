import type { PageServerLoad } from "./$types";
import { GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const currentUser = await GetUserFromId(userId, true);

	return { currentUser };
};

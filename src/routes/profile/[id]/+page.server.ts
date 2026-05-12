import type { PageServerLoad } from "./$types";
import { GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const user = await GetUserFromId(Number(params.id), true);
	if (!user) {
		redirect(303, "/");
	}
	console.log(user);
	return { user };
};

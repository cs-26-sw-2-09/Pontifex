import type { PageServerLoad } from "./$types";
import { GetCourseFromId, GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const course = await GetCourseFromId(Number(params.id), true);

	console.log(course);

	const user = await GetUserFromId(userId, true);

	return { course, user };
};

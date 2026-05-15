import type { PageServerLoad } from "./$types";
import { GetCourseFromId, GetUserFromId } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import { HasAccessToCourse } from "$lib/ACM/ReBAC";
import { Actions } from "$lib/types";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));
	if (!userId) {
		redirect(303, "/");
	}
	const course = await GetCourseFromId(Number(params.id), true);
	const user = await GetUserFromId(userId, true);
	if (!(await HasAccessToCourse(user, Actions.Read, course)))
		throw error(403, "You do not have access to this course");
	return { course, user };
};

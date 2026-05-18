import type { PageServerLoad } from "./$types";
import { GetCoursesFromUserId, GetUserFromId } from "$lib/server/db";
import { error, redirect } from "@sveltejs/kit";
import { HasAccessToCourse } from "$lib/acm";
import { Actions } from "$lib/types";

export const load: PageServerLoad = async ({ cookies }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const courses = await GetCoursesFromUserId(userId);
	// fetches user from database
	const user = await GetUserFromId(Number(userId));

	if (!user) {
		redirect(303, "/");
	}

	courses.forEach(async (course) => {
		if (!(await HasAccessToCourse(user!, Actions.Read, course)))
			throw error(403, "You do not have access to this course");
	});

	return { user, courses };
};

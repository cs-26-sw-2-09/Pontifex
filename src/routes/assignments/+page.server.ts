import { db } from "$lib/server/db";
import { User, Assignments, HandedInAssignments, UserToCourses } from "$lib/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
	// Get userId from cookie
	const userIdRaw = cookies.get("user");
	if (!userIdRaw) {
		redirect(303, "/"); // Redirect to login page if not logged in
	}

	const userID = Number(userIdRaw);

	const currentUser = await db
		.select()
		.from(User)
		.where(eq(User.Id, userID))
		.then((r) => r[0]);

	if (!currentUser) {
		redirect(303, "/"); // Redirect to login page if user not found
	}

	// Initialize an empty array for assignments
	let assignments: {
		Id: number;
		TeacherId: number | null;
		CourseId: number | null;
		Name: string;
		Description: string;
		DueDate: Date;
	}[] = [];

	if (currentUser.Role === "Teacher") {
		// Teachers can see assignments they created
		assignments = await db.select().from(Assignments).where(eq(Assignments.TeacherId, userID));
	} else {
		// Students can see assignments for their courses
		const courseIds = await db
			.select({ CourseId: UserToCourses.CourseId })
			.from(UserToCourses)
			.where(eq(UserToCourses.UserId, userID));

		const courseIdList = courseIds.map((c) => c.CourseId);

		if (courseIdList.length > 0) {
			assignments = await db
				.select()
				.from(Assignments)
				.where(inArray(Assignments.CourseId, courseIdList));
		}
	}

	const handedInAssignments = await db
		.select()
		.from(HandedInAssignments)
		.where(eq(HandedInAssignments.UserId, userID));

	return {
		assignments: assignments,
		handedInAssignments: handedInAssignments,
		userName: currentUser.Name,
		userRole: currentUser.Role
	};
};

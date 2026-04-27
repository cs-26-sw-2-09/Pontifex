import { db } from "$lib/server/db";
import { User, Assignments, HandedInAssignments, UserToCourses } from "$lib/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";

// Types for database rows using Drizzle's InferModel
type AssignmentRow = InferModel<typeof Assignments>;
type HandedInRow = InferModel<typeof HandedInAssignments>;

export async function load({ cookies }) {
	// Get the user ID from the cookie
	const userIdRaw = cookies.get("user");
	if (!userIdRaw) return { assignments: [], handedInAssignments: [] };

	const userId = Number(userIdRaw);

	// Fetch the current user from the database
	const currentUser = await db
		.select()
		.from(User)
		.where(eq(User.Id, userId))
		.then((r) => r[0]);

	// If no user found, return empty arrays
	if (!currentUser) return { assignments: [], handedInAssignments: [] };

	// Initialize assignments array with explicit type
	let assignments: AssignmentRow[] = [];

	// Teachers see only their own assignments
	if (currentUser.Role === "Teacher") {
		assignments = await db.select().from(Assignments).where(eq(Assignments.TeacherId, userId));
	}
	// Students see assignments for courses they are enrolled in
	else if (currentUser.Role === "Student") {
		// Get courses the student is enrolled in
		const courses = await db.select().from(UserToCourses).where(eq(UserToCourses.UserId, userId));

		const courseIds = courses.map((c) => c.CourseId);

		// Only fetch assignments if the student has courses
		if (courseIds.length > 0) {
			assignments = await db
				.select()
				.from(Assignments)
				.where(inArray(Assignments.CourseId, courseIds));
		}
	}

	// Fetch handed-in assignments for the current user
	const handedInAssignments: HandedInRow[] = await db
		.select()
		.from(HandedInAssignments)
		.where(eq(HandedInAssignments.UserId, userId));

	// Return assignments and handed-in assignments to the page
	return { assignments, handedInAssignments };
}

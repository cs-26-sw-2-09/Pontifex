import { redirect } from "@sveltejs/kit";
import type { UserType, Assignments } from "$lib/types";
import { Role } from "$lib/types";

import { db } from "$lib/server/db/";
import { Assignments as assignmentsTable } from "$lib/server/db/schema";

export const load = async ({ cookies, fetch }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	const userResponse = await fetch(`/api/user/${userId}`);
	const user: UserType = await userResponse.json();
	const rawAssignments = await db.select().from(assignmentsTable);
	const assignments = rawAssignments.map((a) => ({
		...a,
		User: {} as UserType
	})) as unknown as Assignments[];
	const filtered = filterAssignmentsByUserRole(user, assignments);

	const handedInAssignmentIds = user.HandedInAssignments?.map((h) => h.AssignmentId) ?? [];
	const handedInAssignments = filtered.map((a) => ({
		...a,
		HandedIn: handedInAssignmentIds.includes(a.Id)
	}));

	return {
		assignments: handedInAssignments
	};
};

function filterAssignmentsByUserRole(user: UserType, assignments: Assignments[]): Assignments[] {
	switch (user.Role) {
		case Role.Admin:
			return assignments;

		case Role.Teacher:
			return assignments.filter((assignment) => assignment.TeacherId === user.Id);

		case Role.Student: {
			const enrolledCourseIds = user.UsersToCourses?.map((utc) => utc.CourseId) ?? [];

			const courseAssignments = assignments.filter((a) => enrolledCourseIds.includes(a.CourseId));

			const handedInAssignmentIds = user.HandedInAssignments?.map((h) => h.AssignmentId) ?? [];
			const handedInAssignments = assignments.filter((a) => handedInAssignmentIds.includes(a.Id));

			const combined = [...courseAssignments, ...handedInAssignments];
			const unique = Array.from(new Map(combined.map((a) => [a.Id, a])).values());

			return unique;
		}
		default:
			return [];
	}
}

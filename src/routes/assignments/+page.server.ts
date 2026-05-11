import { db, GetUserFromId, GetCoursesFromUserId } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { Assignments } from "$lib/types";

// Copy from other +pager.server.ts
export const load: PageServerLoad = async ({ cookies }) => {
	//Get userId from cookie and redirect if they don't have a userId
	const userId = cookies.get("user");
	if (!userId) return redirect(303, "/");

	const user = await GetUserFromId(Number(userId)); // Calls GetUserFromId with the userId to get full user info from db and convert cooki e string to Number and if no user found redirect to homepage
	if (!user) return redirect(303, "/");

	let assignments: Assignments[] = [];

	// Handles admin role: fetches all assignments from db
	if (user.Role === "Admin") {
		// Admins see all assigments
		assignments = await db.query.Assignments.findMany();
		// Handles teacher role: fetches assignments assigned to the teacherId
	} else if (user.Role === "Teacher") {
		// Teachers  see assighments they are responsible for
		assignments = await db.query.Assignments.findMany({
			where: { TeacherId: user.Id }
		});
		// Handles student role: fetches courses and assignments related to the student
	} else if (user.Role === "Student") {
		const courses = await GetCoursesFromUserId(Number(userId));
		const courseIds = courses.map((courses) => courses.Id);
		// Fetches assignments for the student's courses if there are any
		if (courseIds.length > 0) {
			assignments = await db.query.Assignments.findMany({
				where: {
					CourseId: {
						in: courseIds
					}
				},
				with: {
					Submissions: {
						where: {
							UserId: user.Id
						}
					}
				}
			});
		}
		// Fetches submissions made by the student
		//const submissions = await db.query.Submissions.findMany({
		//	where: { UserId: user.Id }
		//});
		// Attaches submissions to the corresponding assignments
		//assignments = assignments.map((assignments) => ({
		//	...assignments,
		//	Submissions: submissions.filter((submission) => submission.AssignmentId === assignments.Id)
		//}));
	}
	// Return user info and fetched assignments
	return {
		user,
		assignments
	};
};

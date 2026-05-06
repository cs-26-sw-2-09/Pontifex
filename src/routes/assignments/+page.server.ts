import { db, GetUserFromId } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { Assignments } from "$lib/server/db/schema";

// Copy from other +pager.server.ts
export const load: PageServerLoad = async ({ cookies }) => {
	//Get userId from cookie and redirect if they don't have a userId
	const userId = cookies.get("user");
	if (!userId) return redirect(303, "/");

	const user = await GetUserFromId(Number(userId)); // Callls GetUserFromId with the userId to get full user info from db and convert cooki e string to Number and if no user found redirect to homepage
	if (!user) return redirect(303, "/");

	type Assignment = typeof Assignments.$inferSelect;
	let assignments: Assignment[] = [];

	if (user.Role === "Admin") {
		assignments = await db.query.Assignments.findMany();
	} else if (user.Role === "Teacher") {
		assignments = await db.query.Assignments.findMany({
			where: { TeacherId: user.Id }
		});
	} /*else if (user.Role === "Student") {
		
	Students need to see assignments from the courses they are enrolled in (maybe importUserToCourses from schema?)
	They also need to see if they have handedin an assignments (need to import HandedInAssignments from schema)

	Need to get users courseIds to get all assignments for those courses
	Then need to check if that assignment had been handedin
	}*/
	return {
		//Need to send user info and assignments to svelte to display
		user,
		assignments: assignments as Assignment[] //Svelte doesn't know what type assignments is for some reason, so this says it is of type Assignment
	};
};

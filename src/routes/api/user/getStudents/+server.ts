// localhost:8123/api/user/getStudents/
//
// Get all student ids
// return all ids as an array

//initial commit

import { HasAccessToProfile } from "$lib/ACM/ReBAC";
import { GetUserFromId, GetUsersWithRole } from "$lib/server/db";
import { Actions, Role } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	// fetches user from database
	const user = await GetUserFromId(Number(userId));

	if (!user) {
		redirect(303, "/");
	}

	const students = await GetUsersWithRole(Role.Student);

	if (!students) {
		return new Response(
			JSON.stringify({
				status: 404,
				message: "No students found"
			}),
			{ status: 404 }
		);
	}

	students.forEach(async (student) => {
		if (!(await HasAccessToProfile(user, Actions.Read, student)))
			throw error(403, "You do not have access to this profile");
	});

	// Retuns Json object including student users ID
	return new Response(JSON.stringify(students), {
		headers: { "Content-Type": "application/json" }
	});
}

import type { PageServerLoad } from "./$types";
import { db, GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Review, Submissions } from "$lib/server/db/schema";
import { HasAccessToAssignment } from "$lib/acm";
import { Actions } from "$lib/types.js";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}
	const user = await GetUserFromId(userId);
	if (!user) {
		redirect(303, "/");
	}
	if (user.Role === "Student") {
		const assignment = await db.query.Assignments.findFirst({
			where: { Id: Number(params.id) },
			with: {
				Submissions: {
					where: {
						UserId: userId
					}
				}
			}
		});
		if (!(await HasAccessToAssignment(user, Actions.Read, assignment)))
			throw error(403, "You do not have access to this assignment");
		return { assignment, user };
	} else {
		const assignment = await db.query.Assignments.findFirst({
			where: { Id: Number(params.id) },
			with: {
				Submissions: {
					with: {
						User: true
					}
				}
			}
		});

		return { assignment, user };
	}
};

export const actions = {
	submit: async ({ request, cookies, params }) => {
		const userId: number = Number(cookies.get("user"));
		const data = await request.formData();
		const content = data.get("submission") as string;

		if (!userId) {
			redirect(303, "/");
		}

		await db.insert(Submissions).values({
			Id: undefined,
			AssignmentText: content,
			UserId: userId,
			AssignmentId: Number(params.id),
			SubmissionDate: new Date()
		});
		redirect(303, `/assignments/${params.id}`);
	},
	grade: async ({ request, cookies, params }) => {
		const userId: number = Number(cookies.get("user"));
		const data = await request.formData();
		const grade = Number(data.get("grade"));
		const feedback = data.get("feedback") as string;

		if (!userId) {
			redirect(303, "/");
		}

		await db.insert(Review).values({
			SubmissionsId: Number(params.id),
			Grade: grade,
			TeacherId: userId,
			Feedback: feedback
		});
		redirect(303, `/assignments/${params.id}`);
	}
};

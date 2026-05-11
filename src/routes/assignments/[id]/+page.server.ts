import type { PageServerLoad } from "./$types";
import { db, GetCoursesFromUserId, GetUserFromId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Review, Submissions } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ cookies, params }) => {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}
	let user = await GetUserFromId(userId);
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
		console.log("Assignment:", assignment);

		return { assignment, user };
	}
};

export const actions = {
	submit: async ({ request, cookies, params }) => {
		console.log("Submitting assignment...");
		const userId: number = Number(cookies.get("user"));
		const data = await request.formData();
		const content = data.get("submission") as string;

		if (!userId) {
			redirect(303, "/");
		}

		let SubmissionId = await db.insert(Submissions).values({
			Id: undefined,
			AssignmentText: content,
			UserId: userId,
			AssignmentId: Number(params.id),
			SubmissionDate: new Date()
		});
		console.log("Submission ID:", SubmissionId);
		redirect(303, `/assignments/${params.id}`);
	},
	grade: async ({ request, cookies, params }) => {
		console.log("Grading assignment...");
		const userId: number = Number(cookies.get("user"));
		const data = await request.formData();
		const grade = Number(data.get("grade"));
		const feedback = data.get("feedback") as string;
		console.log("Grade:", grade, "Feedback:", feedback);

		if (!userId) {
			redirect(303, "/");
		}

		await db.insert(Review).values({
			SubmissionsId: Number(params.id),
			Grade: grade,
			TeacherId: userId,
			Feedback: feedback
		});
		console.log("Graded submission ID:", params.id);
		redirect(303, `/assignments/${params.id}`);
	}
};

import { db, GetUserFromId, GetCoursesFromUserId } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { Assignments, Submissions } from "$lib/types";
import { Role } from "$lib/types";

type AssignmentView = Assignments & {
	Submissions?: Submissions[];
	NotSubmitted?: import("$lib/types").UserType[];
};

export const load: PageServerLoad = async ({ cookies }) => {
	const userId = cookies.get("user");
	if (!userId) throw redirect(303, "/");

	const user = await GetUserFromId(Number(userId));
	if (!user) throw redirect(303, "/");

	let assignments: AssignmentView[] = [];

	// ---------------- ADMIN ----------------
	if (user.Role === Role.Admin) {
		const allAssignments = await db.query.Assignments.findMany();

		const allSubmissions = await db.query.Submissions.findMany();

		const allStudents = await db.query.User.findMany({
			where: { Role: Role.Student }
		});

		const enrollments = await db.query.UserToCourses.findMany();

		// Map course -> studentIds
		const courseMap = new Map<number, number[]>();

		for (const e of enrollments) {
			if (!e.CourseId || !e.UserId) continue;

			if (!courseMap.has(e.CourseId)) {
				courseMap.set(e.CourseId, []);
			}

			courseMap.get(e.CourseId)!.push(e.UserId);
		}

		const studentMap = new Map(allStudents.map((submission) => [submission.Id, submission]));

		assignments = allAssignments.map((assignment) => {
			const submissions = allSubmissions
				.filter((submission) => submission.AssignmentId === assignment.Id)
				.map((submission) => ({
					...submission,
					User: studentMap.get(submission.UserId)
				}));

			const submittedIds = new Set(submissions.map((submission) => submission.UserId));

			const enrolledIds = courseMap.get(assignment.CourseId) ?? [];

			const enrolledStudents = enrolledIds.map((id) => studentMap.get(id)).filter(Boolean);

			const notSubmitted = enrolledStudents.filter(
				(submission) => !submittedIds.has(submission!.Id)
			);

			return {
				...assignment,
				Submissions: submissions,
				NotSubmitted: notSubmitted
			};
		});
	}

	// ---------------- TEACHER ----------------
	else if (user.Role === Role.Teacher) {
		const teacherAssignments = await db.query.Assignments.findMany({
			where: { TeacherId: user.Id }
		});

		const assignmentIds = teacherAssignments.map((assignments) => assignments.Id);
		const courseIds = [
			...new Set(teacherAssignments.map((assignments) => assignments.CourseId).filter(Boolean))
		] as number[];

		const submissions = await db.query.Submissions.findMany({
			where: { AssignmentId: { in: assignmentIds } }
		});

		const students = await db.query.User.findMany({
			where: { Role: Role.Student }
		});

		const submittedUserIds = submissions
			.map((submission) => submission.UserId)
			.filter(Boolean) as number[];

		const submittedUsers = await db.query.User.findMany({
			where: { Id: { in: submittedUserIds } }
		});

		const userMap = new Map(submittedUsers.map((user) => [user.Id, user]));

		const enrollments = await db.query.UserToCourses.findMany({
			where: { CourseId: { in: courseIds } }
		});

		const courseMap = new Map<number, number[]>();

		for (const e of enrollments) {
			if (!e.CourseId || !e.UserId) continue;

			if (!courseMap.has(e.CourseId)) {
				courseMap.set(e.CourseId, []);
			}

			courseMap.get(e.CourseId)!.push(e.UserId);
		}

		assignments = teacherAssignments.map((assignment) => {
			const assignmentSubmissions = submissions
				.filter((s) => s.AssignmentId === assignment.Id)
				.map((s) => ({
					...s,
					User: userMap.get(s.UserId)
				}));

			const submitted = new Set(assignmentSubmissions.map((s) => s.UserId));
			const enrolledIds = courseMap.get(assignment.CourseId) ?? [];

			const enrolledStudents = students.filter((submission) => enrolledIds.includes(submission.Id));

			const notSubmitted = enrolledStudents.filter((submissions) => !submitted.has(submissions.Id));

			return {
				...assignment,
				Submissions: assignmentSubmissions,
				NotSubmitted: notSubmitted
			};
		});
	}

	// ---------------- STUDENT ----------------
	else if (user.Role === Role.Student) {
		const courses = await GetCoursesFromUserId(Number(userId));
		const courseIds = courses.map((courses) => courses.Id);

		if (courseIds.length > 0) {
			const courseAssignments = await db.query.Assignments.findMany({
				where: {
					CourseId: { in: courseIds }
				}
			});

			const submissions = await db.query.Submissions.findMany({
				where: { UserId: user.Id }
			});

			assignments = courseAssignments.map((assignments) => ({
				...assignments,
				Submissions: submissions.filter(
					(submissions) => submissions.AssignmentId === assignments.Id
				)
			}));
		}
	}

	return {
		user,
		assignments
	};
};

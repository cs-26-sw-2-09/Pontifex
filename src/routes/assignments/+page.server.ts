import { db, GetUserFromId, GetCoursesFromUserId } from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { Assignments, UserType } from "$lib/types";
import { Role } from "$lib/types";
import { Submissions } from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ cookies }) => {
	// Check if user is logged in
	const userId = cookies.get("user");
	if (!userId) throw redirect(303, "/");

	// Check if user exists
	const user = await GetUserFromId(Number(userId));
	if (!user) throw redirect(303, "/");

	// ---------------- STUDENT ----------------
	if (user.Role === Role.Student) {
		const Courses = await GetCoursesFromUserId(Number(userId));
		// Get a list of all courses the student is enrolled in
		const CourseIds = Courses.map((course) => course.Id);
		// Get a list of all assignments for those courses, including this student's submissions
		const Assignments = await db.query.Assignments.findMany({
			where: {
				CourseId: {
					in: CourseIds
				}
			},
			with: {
				Submissions: {
					where: {
						UserId: Number(userId)
					}
				}
			}
		});

		// Return the assignments
		return {
			user,
			Assignments
		};
	}

	// ------------ ADMIN / TEACHER -------------
	let Assignments: Assignments[] = [];

	// ------------ ADMIN -------------
	if (user.Role === Role.Admin) {
		// Get a list of all assignments with all data
		Assignments = await db.query.Assignments.findMany({
			with: {
				Submissions: {
					with: {
						User: true
					}
				},
				Course: {
					with: {
						Users: true
					}
				}
			}
		});
	}

	// ------------ TEACHER -------------
	if (user.Role === Role.Teacher) {
		// Get a list of all assignments for the teacher with all data
		Assignments = await db.query.Assignments.findMany({
			where: {
				TeacherId: Number(userId)
			},
			with: {
				Submissions: {
					with: {
						User: true
					}
				},
				Course: {
					with: {
						Users: true
					}
				}
			}
		});
	}
	// Get a list of all students for each assignment
	// It starts by getting a list of all users for each course
	// Then it filters out so its only students
	// Then we have an array of students for each assignment
	const StudentUsers = Assignments.map((assignment) => assignment.Course?.Users).map((Users) =>
		Users?.filter((user: UserType) => user.Role === Role.Student)
	);

	// Get a list of all students who have not submitted for each assignment
	const notSubmitted = StudentUsers.map((users, index) => {
		// Get a list of all students who have submitted for the assignment
		const submitted = Assignments[index].Submissions!.map((submission) => submission.UserId);
		// Filter out the students who have submitted from the list of all students
		const notSubmitted = users?.filter((user: UserType) => !submitted.includes(user.Id));
		// Return the list of students who have not submitted for the assignment
		return notSubmitted;
	});
	// return the assignments and the users
	return {
		Assignments,
		user,
		notSubmitted
	};
};

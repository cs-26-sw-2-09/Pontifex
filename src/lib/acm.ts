import { db } from "$lib/server/db";
import {
	type UserType,
	Role,
	Actions,
	type Course,
	type UserToCourse,
	type Assignments,
	type Submissions,
	type Review
} from "$lib/types.js";
import { Log } from "$lib/server/LogModule.js";

export async function HasAccessToProfile(
	User: UserType,
	Action: Actions,
	// Resource is simplified to type userType since we are testing if the current user has acces to another profile
	Profile: UserType
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Profile, true);
		return true;
	}
	// Checks if the user is trying to access their own profile and the action is read, if so return true
	if (User.Id === Profile.Id && Action === Actions.Read) return true;

	// Checks if the user is of type teacher and the actions is read, if so return true
	if (User.Role === Role.Teacher) {
		// 2 scenarios
		// 1. A teacher trying to get a students info
		// 2. A teacher trying to get the info of another teacher
		if (Profile.Role === Role.Student && Action === Actions.Read) {
			// Get the courses for the student and teacher, check if any match
			const StudentCourses = await db.query.UserToCourses.findMany({
				where: {
					UserId: Profile.Id
				}
			});
			const TeacherCourses = await db.query.UserToCourses.findMany({
				where: {
					UserId: User.Id
				}
			});

			// If any of the courses match, return true, else return false
			return StudentCourses.some((SCourse) =>
				TeacherCourses.some((TCourse) => TCourse.CourseId === SCourse.CourseId)
			);
		}

		// If the teacher is trying to write to their own profile, return true
		if (Profile.Id === User.Id && Action === Actions.Write) return true;
	}
	return false;
}

export async function HasAccessToCourse(
	User: UserType,
	Action: Actions,
	Course: Course
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Course, true);
		return true;
	}
	const UserCourse: UserToCourse | undefined = await db.query.UserToCourses.findFirst({
		where: {
			UserId: User.Id,
			CourseId: Course.Id
		}
	});

	// This checks multiple things
	// If the user is a teacher trying to read a course, this is granted
	// If the user is a teacher trying to write to the course, and if they have a relation with the course, this is granted
	if (User.Role === Role.Teacher) {
		if (Action === Actions.Read) return true;
		if (Action === Actions.Write && UserCourse) return true;
	}

	// This checks if the user has a relation with the course
	// The reason for doing it like this, is to make it easier to add more rules later down the line
	if (!UserCourse) {
		return false;
	}

	// This checks if the user is a student trying to read, this is granded
	if (User.Role === Role.Student && Action === Actions.Read) {
		return true;
	}

	// Default denies access and return false
	return false;
}

export async function HasAccessToAssignment(
	User: UserType,
	Action: Actions,
	Assignment: Assignments
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Assignment, true);
		return true;
	}
	// Get the course relation for the user and the course of the assignment
	const UserCourse: UserToCourse | undefined = await db.query.UserToCourses.findFirst({
		where: {
			UserId: User.Id,
			CourseId: Assignment.CourseId
		}
	});

	// This checks multiple things
	// If the user is a teacher trying to read an assignment, this is granted
	// If the user is a teacher trying to write to the assignment, and if they have a relation with the course, this is granted
	if (User.Role === Role.Teacher) {
		if (Action === Actions.Read) return true;
		if (Action === Actions.Write && Assignment.TeacherId === User.Id) return true;
	}

	// This checks if the user has a relation with the course
	if (!UserCourse) return false; // Tak andreas

	// This checks if the user is a student trying to read, this is granded
	if (User.Role === Role.Student && Action === Actions.Read) return true;

	// Default denies access and return false
	return false;
}

export async function HasAccessToSubmission(
	User: UserType,
	Action: Actions,
	Submission: Submissions
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Submission, true);
		return true;
	}
	// This checks if the user is trying to access their own hand in, if so return true
	if (User.Id === Submission.UserId && Action === Actions.Read) return true;

	// Fetch the review and assignment related to the submission
	const Review = await db.query.Review.findFirst({
		where: {
			SubmissionsId: Submission.Id
		}
	});
	const Assignment = await db.query.Assignments.findFirst({
		where: {
			Id: Submission.AssignmentId
		}
	});

	// If the assignment doesn't exist, something is wrong, so we return false
	if (!Assignment) return false;

	// This checks if the user is the teacher of the assignment and trying to read the submission, if so return true
	if (User.Id === Assignment.TeacherId && Action === Actions.Read) return true;

	// This checks if the user not is the student who made the submission
	if (User.Id != Submission.UserId) return false;

	// This checks if the action is write or delete
	// If there is no review it can be edited or deleted, if there is a review it can not be edited or deleted
	// Also checks if the current date is before the due date of the assignment, if the due date has passed, the submission can not be edited or deleted
	if (
		!Review &&
		(Action === Actions.Write || Action === Actions.Delete) &&
		new Date() < Assignment?.DueDate
	)
		return true;

	// Default denies access
	return false;
}

export async function HasAccessToReview(
	User: UserType,
	Action: Actions,
	Review: Review
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Review, true);
		return true;
	}

	// Fetching the submission related to the review
	const Submission = await db.query.Submissions.findFirst({
		where: {
			Id: Review.SubmissionsId
		},
		with: {
			Assignment: true
		}
	});

	// If the submission doesn't exist, something is wrong, so we return false
	if (!Submission) return false;

	//
	if (User.Id === Submission.Assignment?.TeacherId) return true;

	// If the user made the submission, they can read the review, but not write or delete it
	if (User.Id === Submission.UserId && Action === Actions.Read) return true;

	// Default denies access
	return false;
}

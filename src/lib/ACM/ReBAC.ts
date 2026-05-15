import { db } from "$lib/server/db";
import {
	type UserType,
	Role,
	Actions,
	type Resource,
	ResourceEnum,
	type Course,
	type UserToCourse,
	type Assignments,
	type Submissions,
	type Review
} from "$lib/types.js";
import { Log } from "$lib/server/LogModule.js";

export async function HasAccess(
	User: UserType,
	Action: Actions,
	Resource: Resource
): Promise<boolean> {
	// Allows admin to bypass all checks and return true
	if (User.Role === Role.Admin) {
		await Log.Access("Admin access granted", User, Action, Resource, true);
		return true;
	}
	// Check if attribute school Id matches
	switch (Resource.ResourceEnum) {
		case ResourceEnum.Profile:
			return await HasAccessToProfile(User, Action, Resource.Profile!);
		case ResourceEnum.Course:
			return await HasAccessToCourse(User, Action, Resource.Course!);
		case ResourceEnum.Assignment:
			return await HasAccessToAssignment(User, Action, Resource.Assignment!);
		case ResourceEnum.Submission:
			return await HasAccessToSubmission(User, Action, Resource.Submission!);
		default:
			return false;
	}
}

export async function HasAccessToProfile(
	User: UserType,
	Action: Actions,
	// Resource is simplified to type userType since we are testing if the current user has acces to another profile
	Resource: UserType
): Promise<boolean> {
	// Checks if the user is trying to access their own profile and the action is read, if so return true
	if (User.Id === Resource.Id && Action === Actions.Read) return true;

	// Checks if the user is of type teacher and the actions is read, if so return true
	if (User.Role === Role.Teacher && Action === Actions.Read) {
		// 2 scenarios
		// 1. A teacher trying to get a students info
		// 2. A teacher trying to get the info of another teacher
		if (Resource.Role === Role.Student) {
			// Get the courses for the student and teacher, check if any match
			const StudentCourses = await db.query.UserToCourses.findMany({
				where: {
					UserId: Resource.Id
				}
			});
			const TeacherCourses = await db.query.UserToCourses.findMany({
				where: {
					UserId: User.Id
				}
			});
			return StudentCourses.some((SCourse) =>
				TeacherCourses.some((TCourse) => TCourse.CourseId == SCourse.CourseId)
			);
		}
		if (Resource.Role == Role.Teacher) {
			// TODO: Discuss how this will be handled
			return false;
		}
	}
	return false;
}

export async function HasAccessToCourse(
	User: UserType,
	Action: Actions,
	Course: Course
): Promise<boolean> {
	const UserCourse: UserToCourse | undefined = await db.query.UserToCourses.findFirst({
		where: {
			UserId: User.Id,
			CourseId: Course.Id
		}
	});
	//console.log("UserCourse: ", UserCourse);
	//console.log("User: ", user);
	//console.log("Course: ", Course);
	//console.log("Action: ", action);

	// This checks multiple things
	// If the user is a teacher trying to read a course, this is granted
	// If the user is a teacher trying to write to the course, and if they have a relation with the course, this is granted
	if (User.Role == Role.Teacher) {
		if (Action == Actions.Read) return true;
		if (Action == Actions.Write && UserCourse) return true;
	}

	// This checks if the user has a relation with the course
	// The reason for doing it like this, is to make it easier to add more rules later down the line
	if (UserCourse === undefined) {
		//console.log("User does not have a relation with the course");
		return false;
	}

	// This checks if the user is a student trying to read, this is granded
	if (User.Role == Role.Student && Action == Actions.Read) {
		//console.log("User is a student trying to read the course, access granted");
		return true;
	}

	//console.log("Default case, access denied");

	// Default denies access and return false
	return false;
}

export async function HasAccessToAssignment(
	User: UserType,
	Action: Actions,
	Assignment: Assignments
): Promise<boolean> {
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
		if (Action === Actions.Write && UserCourse) return true;
	}

	// This checks if the user has a relation with the course
	if (UserCourse === undefined) return false;

	// This checks if the user is a student trying to read, this is granded
	if (User.Role === Role.Student && Action === Actions.Read) return true;

	// Default denies access and return false
	return false;
}

export async function HasAccessToSubmission(
	user: UserType,
	action: Actions,
	Submission: Submissions
): Promise<boolean> {
	// This checks if the user is trying to access their own hand in, if so return true
	if (user.Id === Submission.UserId && action === Actions.Read) return true;
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
	console.log("Review: ", Review);
	console.log("Assignment: ", Assignment);
	console.log("User: ", user);
	console.log("Submission: ", Submission);

	if (!Assignment) return false;

	if (user.Id === Assignment.TeacherId && action === Actions.Read) return true;

	if (user.Id != Submission.UserId) return false;

	if (
		Review &&
		(action === Actions.Write || action === Actions.Delete) &&
		new Date() < Assignment?.DueDate
	)
		return true;

	// Default denies access
	return false;
}

export async function HasAccessToReview(
	user: UserType,
	action: Actions,
	Review: Review
): Promise<boolean> {
	// A teacher is allowed everything with their own review
	if (user.Id === Review.TeacherId) return true;

	const Submission = await db.query.Submissions.findFirst({
		where: {
			Id: Review.SubmissionsId
		}
	});

	if (!Submission) return false;

	if (user.Id === Submission.UserId && action == Actions.Read) return true;

	// Default denies access
	return false;
}

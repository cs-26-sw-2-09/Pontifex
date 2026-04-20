import { action, type UserType, Role, type Course } from "$lib/types.js";
import { db, GetUserFromId } from "$lib/server/db/index.js";
import { PgSchema } from "drizzle-orm/pg-core";
// import { permission } from "process";

export function hasAccessCourse(
	user: UserType,
	//relation: Relations,
	actions: action,
	course: Course,
	sessionId = 1 /* Session ID  (Cookie): String*/
): boolean {
	// Compare Session ID from web browser with User ID from Current User
	if (user.Id !== sessionId) {
		return false;
	}
	// Get user type info
	// const UserInfo = GetUserFromId(user.Id, true);
	// if (!UserInfo) {
	// 	// Return false throw error
	// 	return false;
	// }

	// Check if the user and the requested resource belong to the same school if not return false

	// If role is admin return true
	if (user.Role === Role.Admin) {
		return true;
	}

	// If user role is Teacher return True??
	if (user.Role === Role.Teacher) {
		return true;
	}
	// If User role is student check if the user is enrolled in course if not return false
	if (user.Role === Role.Student) {
		// Check if the user is enrolled in the course
		const enrolledCourses = db.query.user_to_courses.findone({
			where: { UserId: user.Id, CourseId: course.Id }
		});
		if (enrolledCourses) {
			return true;
		}
	}
	return false;
}

export function hasAccessProfile(
	user: UserType,
	action: action,
	sessionId = 1 /* Session ID  (Cookie): String*/
): boolean {
	// defalut denies access and return false,
	return false;
}

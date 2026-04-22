import { type UserType, Role, actions, type Course, ResourceType } from "$lib/types.js";
//import * as db from "$lib/server/db";

// TODO: MUST HAVE A WAY TO DEFINE WHAT WE ARE TRYING TO ACCESS;

export function hasAccess(
	user: UserType,
	action: actions,
	reasource: { reasoureType: ResourceType; profile: UserType; course?: Course },
	sessionId = 4 /* Session ID  (Cookie): String*/
): boolean {
	//Defalut denies access and return false,
	//Returns false if the session ID from the web browser does not match the user ID from the current user, this is to prevent users from accessing other users profiles or courses

	if (user.Id !== sessionId) return false;

	// allows admin to bypass all checks and return true
	if (user.Role === Role.Admin) return true;

	// Check if attribute school Id matches

	switch (reasource.reasoureType) {
		case ResourceType.Profile:
			return hasAccessToProfile(user, action, reasource);
		case ResourceType.Course:
			return hasAccessToCourse(user, action, reasource.course!);
		default:
			return false;
	}
}

// Takes the User, the action type, the resource and the session ID, evaluates if the user has access to the profile and returns true or false
function hasAccessToProfile(
	user: UserType,
	action: actions,
	reasource: { reasoureType: ResourceType; profile: UserType; course?: Course }
): boolean {
	// Checks if the user is trying to access their own profile and the action is read, if so return true
	if (user.Id === reasource.profile.Id && action === actions.Read) return true;

	// Checks if the user is of type teacher and the actions is read, if so return true
	if (user.Role === Role.Teacher && action === actions.Read) return true;
	return false;
}

function hasAccessToCourse(user: UserType, action: actions, course: Course): boolean {
	// if the user is a teacher and course is taught by the user (TeacherId) if the action is read or write, return true
	if (
		(user.Role === Role.Teacher && user.Id === course.Teacher && action === actions.Read) ||
		action === actions.Write
	)
		return true;

	// if the user is a student and and the student wants to read the course return true;
	if (user.Role === Role.Student && action === actions.Read) {
		// Check if the student is enrolled in the course, if so return true
		//if (db.(course.Id)) return true;
		return true; // Placeholder, replace with actual check for enrollment in the course
	}

	// Default denies access and return false
	return false;
}

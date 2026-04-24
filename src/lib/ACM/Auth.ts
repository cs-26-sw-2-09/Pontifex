import { type UserType, Role, Actions, type Resource,  ResourceEnum } from "$lib/types.js";

// TODO: MUST HAVE A WAY TO DEFINE WHAT WE ARE TRYING TO ACCESS;

export function hasAccess(
	user: UserType,
	action: Actions,
	resource : Resource,
): boolean {
	// Allows admin to bypass all checks and return true
	if (user.Role === Role.Admin) return true;

	// Check if attribute school Id matches
	switch (resource.resourceEnum) {
		case ResourceEnum.Profile:
			return hasAccessToProfile(user, action, resource.profile);
		case ResourceEnum.Course:
			return hasAccessToCourse(user, action);
		default:
			return false;
	}
}

// Takes the User, the action type, the resource and the session ID, evaluates if the user has access to the profile and returns true or false
function hasAccessToProfile(
	user: UserType,
	action: Actions,
    // Resource is simplified to type userType since we are testing if the current user has acces to another profile
	resource: UserType
): boolean {
	// Checks if the user is trying to access their own profile and the action is read, if so return true
	if (user.Id === resource.Id && action === Actions.Read) return true;

	// Checks if the user is of type teacher and the actions is read, if so return true
	if (user.Role === Role.Teacher && action === Actions.Read) return true;
	return false;
}

function hasAccessToCourse(user: UserType, action: Actions): boolean {
	// If the user is a teacher and course is taught by the user (TeacherId) if the action is read or write, return true
	if (
		(user.Role === Role.Teacher &&
            (action === Actions.Read || action === Actions.Write))
	)
		return true;

	// If the user is a student and and the student wants to read the course return true;
	if (user.Role === Role.Student && action === Actions.Read) {
		// Check if the student is enrolled in the course, if so return true
		// If (db.(course.Id)) return true;
		return true; // Placeholder, replace with actual check for enrollment in the course
	}
	// Default denies access and return false
	return false;
}

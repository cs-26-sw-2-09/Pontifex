import type { User, Course, Resource } from "$lib/types.js";

export function hasAccessCourse(user: User, course: Course /* relation */): boolean {
	//schoolID check Must be of same school to have access to course
	if (Number(user.Attributes.get("SchoolID")) !== course.SchoolID) {
		return false;
	}

	//Admin has access to everything that are within their respective schoolID
	//Checks if user is of role admin and if their schoolID matches the course's SchoolID
	if (user.Role === "Admin" && Number(user.Attributes.get("SchoolID")) === course.SchoolID) {
		return true;
	}
	//Techer has acces to their own courses
	//Checks if user(teacher) is of role teacher and if their id matches the course's teacher Id
	if (user.Role === "Teacher" && user.Id === course.TeacherID) {
		return true;
	}

	//check if student is of type student and are enrolled in course
	if (user.Role === "Student" && user.Courses?.includes(course.Id)) {
		return true;
	}

	return false;
}

//function canAccessProfile(user: User,  )

export function hasAccess(user: User, resource: Resource /* relation */): boolean {
	// Check if the user and the requested resource belong to the same school if not return false
	if (Number(user.Attributes.get("SchoolID")) !== resource.SchoolID) {
		return false;
	}

	return true;
}

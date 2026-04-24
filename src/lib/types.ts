export interface UserType {
	Id: number;
	Name: string;
	Role: Role;
	UserInfo?: UserInfo;
	Assignments?: Assignments[];
	HandedInAssignments?: HandedInAssignment[];
	UsersToCourses?: UserToCourse[];
}

export interface UserInfo {
	// Tottaly fine, I swear
	Id: number;
	UserId: number;
	Gender: Genders;
	Email: string;
	PhoneNumber: string;
	Birthdate: Date;
	CPR: string;
	Address: string;
	User?: UserType;
}

export interface Assignments {
	Id: number;
	CourseId: number;
	Name: string;
	Description: string;
	DueDate: Date;
	TeacherId: number;
	Course?: Course;
	User: UserType;
	HandedInAssignments?: HandedInAssignment[];
}

export interface HandedInAssignment {
	Id: number;
	UserId: number;
	AssignmentId: number;
	HandInDate: Date;
	Grade?: number;
	Feedback?: string;
	AssignmentText: string;
	Assignment?: Assignments;
	User?: UserType;
}

export interface Course {
	Id: number;
	Name: string;
	Description: string;
	Assignments?: Assignments[];
	UsersToCourses?: UserToCourse[];
}

export interface UserToCourse {
	UserId: number;
	CourseId: number;
	Course?: Course;
	User?: UserType;
}

export enum Role {
	Student = "Student",
	Teacher = "Teacher",
	Admin = "Admin"
}

export enum Genders {
	Male,
	Female,
	NonBinary,
	Other
}

export enum actions {
	Read,
	Write,
	Delete
}

// Reasource to handle AUTH what the user is trying to visit of type ResourceType it includes the requested information.
export interface Resource{
 	resourceType : ResourceType;
	profile: UserType;
	course: Course
}

export enum ResourceType {
	Profile = "Profile",
	Course = "Course"
}
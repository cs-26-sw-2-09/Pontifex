export interface UserType {
	Id: number;
	Name: string;
	Role: Role;
	UserInfo?: UserInfo[];
	Assignments?: Assignments[];
	Submissions?: Submissions[];
	UsersToCourses?: UserToCourse[];
}

export interface UserInfo {
	// Tottaly fine, I swear
	Id: number;
	UserId: number;
	Gender: Genders;
	Email: string;
	PhoneNumber: string; // 8 digits, no dashes
	Birthdate: string; // YYYY-MM-DD
	CPR: string; // DDMMYY-XXXX
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
	Submissions?: Submissions[];
}

export interface Submissions {
	Id: number;
	UserId: number;
	AssignmentId: number;
	SubmissionDate: Date;
	AssignmentText: string;
	Assignment?: Assignments;
	User?: UserType;
	Review?: Review;
}

export interface Review {
	Id: number;
	SubmissionsId: number;
	TeacherId: number;
	Grade?: number;
	Feedback?: string;
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
	Male = "Male",
	Female = "Female",
	NonBinary = "NonBinary",
	Other = "Other"
}

export enum Actions {
	Read,
	Write,
	Delete
}

import { User } from "$lib/server/db/schema";

export type UserType = typeof User.$inferInsert;

//export interface UserType {
//	Id: number;
//	Name: string;
//	Attributes: Map<string, string>;
//	Courses: number[];
//	Role: Role;
//	// Tottaly fine, I swear
//	Gender: Genders;
//	Email: string;
//	PhoneNumber: string;
//	Birthdate: Date;
//	CPR: string;
//	Address: string;
//}

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

export interface Course {
	Id: number;
	Name: string;
	Description: string;
	Teacher: number;
}

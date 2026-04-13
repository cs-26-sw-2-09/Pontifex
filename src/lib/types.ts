export interface User {
	Id: number;
	Name?: string;
	Attributes: Map<string, string>;
	Courses?: number[];
	Role: Role;
	// Tottaly fine, I swear
	Gender?: Genders;
	Email?: string;
	PhoneNumber?: string;
	Birthdate?: Date;
	CPR?: string;
	Address?: string;
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
	BigJohn,
	Other
}

export interface Course {
	Id: number;
	Name: string;
	Description: string;
	TeacherID: number;
	SchoolID: number;
}

//adding Resource instead of course for better flexibility in the future,
export enum ResourceType {
	Course,
	Profile,
	Grades,
	Assingments, 
	Schedule
}

export type Resource = {
	type: ResourceType;
	SchoolID: number;
	Name: string;
	OwnerID: number;
	CourseID?: number;
	//evt
	//Attributes: Map<string, string>;
};

export type Relations = {
	teaches: { teacherId: string; courseId: string }[];
	enrolled: { studentId: string; courseId: string }[];
};

//All Actions must be logged somewere som how.
export enum Action{
	Read, //Able to view the specific requested Resource
	Write, //Able to modify and add to existing data
	Create, //Being able to create new data
	Delete //Being able to delete existing Data
}

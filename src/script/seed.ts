import { drizzle } from "drizzle-orm/postgres-js";
import type { Genders, Role } from "../lib/types.ts";
import * as Schema from "../lib/server/db/schema.ts";
import { relations } from "../lib/server/db/relations.ts";
import Assignments from "./Seed Data/assignments.json" with { type: "json" };
import Courses from "./Seed Data/courses.json" with { type: "json" };
import HandedInAssignments from "./Seed Data/handed_in_assignments.json" with { type: "json" };
import UserInfo from "./Seed Data/user_info.json" with { type: "json" };
import UserToCourses from "./Seed Data/user_to_courses.json" with { type: "json" };
import Users from "./Seed Data/users.json" with { type: "json" };

// This function will see the database with the data from the JSON files.
export async function seed() {
	// Inserting users
	for (const user of Users) {
		console.log(`Inserting user: ${user.Name} with role ${user.Role}`);
		await db.insert(Schema.User).values({
			Name: user.Name,
			Role: user.Role as Role,
			Id: user.Id
		});
	}

	// Inserting courses
	for (const course of Courses) {
		console.log(`Inserting course: ${course.Name}`);
		await db.insert(Schema.Course).values({
			Id: course.Id,
			Name: course.Name,
			Description: course.Description
		});
	}

	// Inserting assignments
	for (const assignment of Assignments) {
		console.log(`Inserting assignment: ${assignment.Name} for course ${assignment.CourseId}`);
		await db.insert(Schema.Assignments).values({
			Id: assignment.Id,
			CourseId: assignment.CourseId,
			Name: assignment.Name,
			Description: assignment.Description,
			DueDate: new Date(assignment.DueDate)
		});
	}

	// Linking users to courses
	for (const userToCourse of UserToCourses) {
		console.log(`Linking user ${userToCourse.UserId} to course ${userToCourse.CourseId}`);
		await db.insert(Schema.UserToCourses).values({
			UserId: userToCourse.UserId,
			CourseId: userToCourse.CourseId
		});
	}

	// Inserting handed in assignments
	for (const handedInAssignment of HandedInAssignments) {
		console.log(
			`Inserting handed in assignment for user ${handedInAssignment.UserId} for assignment ${handedInAssignment.AssignmentId}`
		);
		await db.insert(Schema.HandedInAssignments).values({
			Id: handedInAssignment.Id,
			AssignmentId: handedInAssignment.AssignmentId,
			UserId: handedInAssignment.UserId,
			HandInDate: new Date(handedInAssignment.HandInDate),
			AssignmentText: handedInAssignment.AssignmentText,
			Grade: handedInAssignment.Grade,
			Feedback: handedInAssignment.Feedback
		});
	}

	// Inserting user info
	for (const userInfo of UserInfo) {
		console.log(`Inserting user info for user ${userInfo.UserId}`);
		await db.insert(Schema.UserInfo).values({
			Id: userInfo.Id,
			UserId: userInfo.UserId,
			Gender: userInfo.Gender as Genders,
			Birthdate: new Date(userInfo.Birthdate),
			Address: userInfo.Address,
			CPR: userInfo.CPR,
			Email: userInfo.Email,
			PhoneNumber: userInfo.PhoneNumber
		});
	}
}

// Creating a connection to the datbase using the CI credentials.
// This will only work on the CI.
export const db = drizzle("postgres://user:password@localhost:5432/db-name", { relations });

// Run the seed function and exit the process when it's done.
seed().then(() => {
	console.log("Seeding complete");
	process.exit(0);
});

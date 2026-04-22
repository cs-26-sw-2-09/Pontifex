import { drizzle } from "drizzle-orm/postgres-js";
import type { Genders, Role } from "../lib/types.ts";
import * as Schema from "../lib/server/db/schema.ts";
import { relations } from "../lib/server/db/relations.ts";
import Assignments from "./assignments.json" with { type: "json" };
import Courses from "./courses.json" with { type: "json" };
import HandedInAssignments from "./handed_in_assignments.json" with { type: "json" };
import UserInfo from "./user_info.json" with { type: "json" };
import UserToCourses from "./user_to_courses.json" with { type: "json" };
import Users from "./users.json" with { type: "json" };

export async function seed() {
	for (const user of Users) {
		await db.insert(Schema.User).values({
			Name: user.Name,
			Role: user.Role as Role,
			Id: user.Id
		});
	}

	for (const course of Courses) {
		await db.insert(Schema.Course).values({
			Id: course.Id,
			Name: course.Name,
			Description: course.Description
		});
	}

	for (const assignment of Assignments) {
		await db.insert(Schema.Assignments).values({
			Id: assignment.Id,
			CourseId: assignment.CourseId,
			Name: assignment.Name,
			Description: assignment.Description,
			DueDate: new Date(assignment.DueDate)
		});
	}

	for (const userToCourse of UserToCourses) {
		await db.insert(Schema.UserToCourses).values({
			UserId: userToCourse.UserId,
			CourseId: userToCourse.CourseId
		});
	}

	for (const handedInAssignment of HandedInAssignments) {
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

	for (const userInfo of UserInfo) {
		await db.insert(Schema.UserInfo).values({
			//Id: userInfo.Id,
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

export const db = drizzle("postgres://user:password@localhost:5432/db-name", { relations });

seed();

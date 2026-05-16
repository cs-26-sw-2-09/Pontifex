// import { type UserType, Role, actions, ResourceType } from "$lib/types.js";
import {
	HasAccessToAssignment,
	HasAccessToCourse,
	HasAccessToProfile,
	HasAccessToSubmission
} from "$lib/acm";
import { db, GetUserFromId } from "$lib/server/db";
import {
	Actions,
	type Assignments,
	type Course,
	type Submissions,
	type UserType
} from "$lib/types";
import { describe, it, expect } from "vitest";
// import * as authZ from "$lib/ACM/Auth";
// import * as db from "$lib/server/db";

//base test for succes in PR
describe("Student check ACM", () => {
	it("Student has a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
	it("Student does not have a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 5
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(false);
	});

	it("Student write to a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(false);
	});

	it("Student read to an assignment", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToAssignment(User, Action, Assignments)).toBe(true);
	});

	it("Student write to an assignment", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToAssignment(User, Action, Assignments)).toBe(false);
	});

	it("Student read to an assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 5
			}
		});

		expect(await HasAccessToAssignment(User, Action, Assignments)).toBe(false);
	});

	it("Student write to an assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 2
			}
		});

		expect(await HasAccessToAssignment(User, Action, Assignments)).toBe(false);
	});

	it("Student read a submission they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Submission: Submissions = await db.query.Submissions.findFirst({
			where: {
				Id: 4
			}
		});

		expect(await HasAccessToSubmission(User, Action, Submission)).toBe(false);
	});

	it("Student read a submission they have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Submission: Submissions = await db.query.Submissions.findFirst({
			where: {
				Id: 2
			}
		});

		expect(await HasAccessToSubmission(User, Action, Submission)).toBe(true);
	});

	it("Student write a submission they have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Submission: Submissions = await db.query.Submissions.findFirst({
			where: {
				Id: 12
			}
		});

		expect(await HasAccessToSubmission(User, Action, Submission)).toBe(true);
	});

	it("Student write a submission they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Submission: Submissions = await db.query.Submissions.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToSubmission(User, Action, Submission)).toBe(false);
	});

	it("Student write a submission after a review has been made", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Submission = await db.query.Submissions.findFirst({
			where: {
				Id: 2
			}
		});

		expect(await HasAccessToSubmission(User, Action, Submission)).toBe(false);
	});
});

describe("Teacher check ReBAC", () => {
	it("Teacher read has a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 2
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
	it("Teacher write has a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 2
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
	it("Teacher write does not have a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(false);
	});
	it("Teacher read does not have a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
});
describe("Admin check ReBAC", () => {
	it("Admin read course", async () => {
		const User: UserType = await GetUserFromId(1, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
	it("Admin write course", async () => {
		const User: UserType = await GetUserFromId(1, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});

		expect(await HasAccessToCourse(User, Action, Course)).toBe(true);
	});
});

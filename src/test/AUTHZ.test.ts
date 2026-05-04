// import { type UserType, Role, actions, ResourceType } from "$lib/types.js";
import { HasAccess } from "$lib/ACM/ReBAC";
import { db, GetUserFromId } from "$lib/server/db";
import {
	Actions,
	ResourceEnum,
	type Assignments,
	type Course,
	type Resource,
	type UserType
} from "$lib/types";
import { describe, it, expect } from "vitest";
// import * as authZ from "$lib/ACM/Auth";
// import * as db from "$lib/server/db";

//base test for succes in PR
describe("Student check ReBAC", () => {
	it("Student has a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});
	it("Student does not have a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student write to a course", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student read to an assignment", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Assignment,
			Assignment: Assignments!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});

	it("Student write to an assignment", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Assignment,
			Assignment: Assignments!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student read to an assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Assignment,
			Assignment: Assignments!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student write to an assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const Assignments: Assignments = await db.query.Assignments.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Assignment,
			Assignment: Assignments!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student read a hand in assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const HandIn = await db.query.HandedInAssignments.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.HandedInAssignment,
			HandedInAssignment: HandIn!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});

	it("Student read a hand in assignment they have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Read;
		const HandIn = await db.query.HandedInAssignments.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.HandedInAssignment,
			HandedInAssignment: HandIn!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});

	it("Student write a hand in assignment they have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const HandIn = await db.query.HandedInAssignments.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.HandedInAssignment,
			HandedInAssignment: HandIn!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});

	it("Student write a hand in assignment they do not have access to", async () => {
		const User: UserType = await GetUserFromId(5, true);
		const Action = Actions.Write;
		const HandIn = await db.query.HandedInAssignments.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.HandedInAssignment,
			HandedInAssignment: HandIn!
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
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
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});
	it("Teacher write has a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 2
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});
	it("Teacher write does not have a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(false);
	});
	it("Teacher read does not have a course", async () => {
		const User: UserType = await GetUserFromId(10, true);
		const Action = Actions.Read;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
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
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});
	it("Admin write course", async () => {
		const User: UserType = await GetUserFromId(1, true);
		const Action = Actions.Write;
		const Course: Course = await db.query.Course.findFirst({
			where: {
				Id: 1
			}
		});
		const Resource: Resource = {
			ResourceEnum: ResourceEnum.Course,
			Course: Course
		};

		expect(await HasAccess(User, Action, Resource)).toBe(true);
	});
});

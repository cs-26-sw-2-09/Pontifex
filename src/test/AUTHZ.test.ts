// import { type UserType, Role, actions, ResourceType } from "$lib/types.js";
import { hasAccess } from "$lib/ACM/ReBAC";
import { db, GetUserFromId } from "$lib/server/db";
import { Actions, ResourceEnum, type Course, type Resource, type UserType } from "$lib/types";
import { describe, it, expect } from "vitest";
// import * as authZ from "$lib/ACM/Auth";
// import * as db from "$lib/server/db";

//base test for succes in PR
describe("Student check ReBAC", () => {
  it("User has a course", async () => {
    let user: UserType = await GetUserFromId(5, true);
    let action = Actions.Read;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 1
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
  it("User does not have a course", async () => {
    let user: UserType = await GetUserFromId(5, true);
    let action = Actions.Read;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 2
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(false);
  })
});

describe("Teacher check ReBAC", () => {
  it("Teacher read has a course", async () => {
    let user: UserType = await GetUserFromId(10, true);
    let action = Actions.Read;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 2
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
  it("Teacher write has a course", async () => {
    let user: UserType = await GetUserFromId(10, true);
    let action = Actions.Write;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 2
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
  it("Teacher write does not have a course", async () => {
    let user: UserType = await GetUserFromId(10, true);
    let action = Actions.Write;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 1
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(false);
  });
  it("Teacher read does not have a course", async () => {
    let user: UserType = await GetUserFromId(10, true);
    let action = Actions.Read;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 1
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
});
describe("Admin check ReBAC", () => {
  it("Admin read course", async () => {
    let user: UserType = await GetUserFromId(1, true);
    let action = Actions.Read;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 1
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
  it("Admin write course", async () => {
    let user: UserType = await GetUserFromId(1, true);
    let action = Actions.Write;
    let course: Course = await db.query.Course.findFirst({
      where: {
        Id: 1
      }
    });
    let resource: Resource = {
      resourceEnum: ResourceEnum.Course,
      course: course
    }

    expect(await hasAccess(user, action, resource)).toBe(true);
  });
});

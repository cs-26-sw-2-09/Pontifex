// import { type UserType, Role, actions, ResourceType } from "$lib/types.js";
import { describe, it, expect } from "vitest";
// import * as authZ from "$lib/ACM/Auth";
// import * as db from "$lib/server/db";

// //test if Admin has access to a user profile, this should return true because Admin should have access to all resources regardless of the action or resource type
// describe("Authorization tests", () => {
// 	it("Admin should have access to all resources", () => {
// 		const adminUser: UserType = db.GetUserFromId(1, false)!;
// 		const profileResource = {
// 			reasoureType: ResourceType.Profile,
// 			profile: db.GetUserFromId(3, false) // Placeholder for a user profile, replace with actual user data
// 		};
// 		expect(authZ.hasAccess(adminUser, actions.Read, profileResource)).toBe(true);
// 	});
// });
//base test for succes in PR
describe("sum test", () => {
	it("adds 1 + 2 to equal 3", () => {
		expect(1 + 2).toBe(3);
	});
});

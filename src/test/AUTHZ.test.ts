import { type UserType, Role, actions, ResourceType } from "$lib/types.js";
import { describe, it, expect } from "vitest";
import * as authZ from "$lib/ACM/Auth";
import { Users } from "$lib/index.js";

//test if Admin has access to a user profile, this should return true because Admin should have access to all resources regardless of the action or resource type
describe("Authorization tests", () => {
	it("Admin should have access to all resources", () => {
		const adminUser: UserType = Users.find((u) => u.Role === Role.Admin)!;
		const profileResource = {
			reasoureType: ResourceType.Profile,
			profile: Users.find((u) => u.Id === 1)
		};
		expect(authZ.hasAccess(adminUser, actions.Read, profileResource)).toBe(true);
	});
});

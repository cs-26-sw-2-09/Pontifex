import { describe, it, expect } from "vitest";
import {
	GetUserFromId,
	GetUsersWithRole,
	CreateUser,
	UpdateUser,
	DeleteUser
} from "$lib/server/db";
import { Genders, Role } from "$lib/types";
import type { UserType } from "$lib/types";

describe("Get user with user info", () => {
	it("User id of 1 should give Big John", async () => {
		expect(await GetUserFromId(1, true)).toStrictEqual({
			Id: 1,
			Name: "Big John",
			Role: "Admin",
			UserInfo: [
				{
					Id: 1,
					UserId: 1,
					Gender: "Other",
					Email: "Big@John.com",
					PhoneNumber: "12345678",
					Birthdate: "0001-01-01",
					CPR: "0101010000",
					Address: "In the mine"
				}
			],
			Course: []
			//"HandedInAssignments": []
		});
	});
});

describe("Get user without user info", () => {
	it("User id of 5 should give John Pork", async () => {
		expect(await GetUserFromId(5)).toStrictEqual({
			Id: 5,
			Name: "John Pork",
			Role: "Student",
			Course: [
				{
					Id: 1,
					Name: "English",
					Description: null
				}
			]
		});
	});
});
//TODO: #48 THIS TEST BREAKS WHEN DATABASE IS CHANGED, FIX IT
describe("Get all users with role of Student", () => {
	it("Should return all students", async () => {
		console.log(await GetUsersWithRole(Role.Student));

		expect(await GetUsersWithRole(Role.Student)).toStrictEqual([
			{
				Id: 8,
				Name: "Big Chungus",
				Role: "Student",
				Course: []
			},
			{
				Id: 9,
				Name: "Charlie Kirk",
				Role: "Student",
				Course: []
			},
			{
				Id: 11,
				Name: "Maga Morten",
				Role: "Student",
				Course: []
			},
			{
				Id: 12,
				Name: "Tobias Kaa",
				Role: "Student",
				Course: []
			},
			{
				Id: 13,
				Name: "Labre Larve",
				Role: "Student",
				Course: []
			},
			{
				Id: 14,
				Name: "Dorthe Donut",
				Role: "Student",
				Course: []
			},
			{
				Id: 15,
				Name: "King Tutankhamon",
				Role: "Student",
				Course: []
			},
			{
				Id: 5,
				Name: "John Pork",
				Role: "Student",
				Course: [
					{
						Id: 1,
						Name: "English",
						Description: null
					}
				]
			},
			{
				Id: 4,
				Name: "Bob the builder",
				Role: "Student",
				Course: [
					{
						Id: 1,
						Name: "English",
						Description: null
					}
				]
			},
			{
				Id: 7,
				Name: "James Doakes",
				Role: "Student",
				Course: []
			}
		]);
	});
});

describe("Get all users with role of Teacher", () => {
	it("Should return all teachers", async () => {
		expect(await GetUsersWithRole(Role.Teacher)).toStrictEqual([
			{
				Id: 3,
				Name: "Caleb Hane",
				Role: "Teacher",
				Course: []
			},
			{
				Id: 6,
				Name: "Hanne Pande",
				Role: "Teacher",
				Course: []
			},
			{
				Id: 10,
				Name: "Ole Larsen",
				Role: "Teacher",
				Course: [
					{
						Id: 2,
						Name: "Math",
						Description: null
					}
				]
			}
		]);
	});
});

describe("Get user with non existing id", () => {
	it("Should return null", async () => {
		expect(await GetUserFromId(999)).toBeUndefined();
	});
});

//Create, update and delete user test
describe("Create, update and delete user", () => {
	let newUser: UserType = {
		Name: "Test User",
		Role: Role.Student,
		Id: 999999,
		UserInfo: [
			{
				Gender: Genders.Other,
				Email: "test@user.com",
				PhoneNumber: "87654321",
				Birthdate: "0001-01-01",
				CPR: "0101010000",
				Address: "Test Address",
				//These values are not used when creating the user, but they are required in the UserInfo type, so random values are assigned to them
				Id: 999999,
				UserId: 999999
			}
		]
	};

	it("Should create a new user with the following data", async () => {
		const newUserId = await CreateUser(newUser);
		newUser.Id = newUserId;
		newUser.UserInfo[0].UserId = newUserId;

		expect(await GetUserFromId(newUserId, false)).toStrictEqual({
			Id: newUserId,
			Name: "Test User",
			Role: Role.Student,
			Course: []
		});
	});

	it("Should update the created user to have the name Updated Test User", async () => {
		newUser.Name = "Updated Test User";
		await UpdateUser(newUser);

		expect(await GetUserFromId(newUser.Id, false)).toStrictEqual({
			Id: newUser.Id,
			Name: "Updated Test User",
			Role: Role.Student,
			Course: []
		});
	});

	it("Should delete the created user", async () => {
		await DeleteUser(newUser.Id);
		expect(await GetUserFromId(newUser.Id, false)).toBeUndefined();
	});
});

import { drizzle } from "drizzle-orm/postgres-js";
//import postgres from "postgres";
//import * as schema from "./schema";
import { relations } from "./relations.ts";
import { env } from "$env/dynamic/private";
import type { Role, UserType } from "$lib/types";
import { User, UserInfo } from "./schema.ts";
import { eq } from "drizzle-orm";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

//const client = postgres(env.DATABASE_URL);

export const db = drizzle(env.DATABASE_URL, { relations });

export async function GetUserFromId(
	Id: number,
	withUserInfo: boolean = false
): Promise<UserType | undefined> {
	return db.query.User.findFirst({
		where: {
			Id: Id
		},
		with: {
			UserInfo: withUserInfo,
			Course: true
		}
	}) as unknown as UserType | undefined; // Type assertion to match the expected return type
}

export async function GetUsersWithRole(
	Role: Role,
	withUserInfo: boolean = false
): Promise<UserType[] | undefined> {
	return db.query.User.findMany({
		where: {
			Role: Role
		},
		orderBy: {
			Id: "asc"
		},
		with: {
			UserInfo: withUserInfo,
			Course: true
		}
	}) as unknown as UserType[] | undefined; // Type assertion to match the expected return type
}

// finds a specific users courses and returns it as an array
export async function GetCoursesFromUserId(userId: number) {
	const user = await db.query.User.findFirst({
		where: {
			Id: userId
		},
		orderBy: {
			Id: "asc"
		},
		with: {
			Course: true
		}
	});
	// if user does not have any courses returns empty array
	return user?.Course ?? [];
}

// Creat User and UserInfo in the database,
// first create the user and then use the created users id to create the userinfo
export async function CreateUser(userData: UserType): Promise<number> {
	const createdUser = await db
		.insert(User)
		.values({
			Name: userData.Name,
			Role: userData.Role
		})
		.returning(); // Returns the inserted users ID
	if (userData.UserInfo) {
		await db.insert(UserInfo).values({
			UserId: createdUser[0].Id,
			Gender: userData.UserInfo[0].Gender,
			Email: userData.UserInfo[0]?.Email,
			PhoneNumber: userData.UserInfo[0]?.PhoneNumber,
			Birthdate: userData.UserInfo[0]?.Birthdate,
			CPR: userData.UserInfo[0]?.CPR,
			Address: userData.UserInfo[0]?.Address
		});
	}
	return createdUser[0].Id;
}

// Finds and updates a user where the given Id matches the Id in the user table,
export async function UpdateUser(userData: UserType) {
	// First Updates Table User with name and role
	await db
		.update(User)
		.set({
			Name: userData.Name,
			Role: userData.Role
		})
		.where(eq(User.Id, userData.Id));
	// Second table update of userInfo
	if (userData.UserInfo) {
		await db
			.update(UserInfo)
			.set({
				Gender: userData.UserInfo[0]?.Gender,
				Email: userData.UserInfo[0]?.Email,
				PhoneNumber: userData.UserInfo[0]?.PhoneNumber,
				Birthdate: userData.UserInfo[0]?.Birthdate,
				CPR: userData.UserInfo[0]?.CPR,
				Address: userData.UserInfo[0]?.Address
			})
			.where(eq(UserInfo.UserId, userData.Id));
	}
}

//Delets a user from the table of Users where the user.Id mathces the userId
export async function DeleteUser(userId: number) {
	await db.delete(User).where(eq(User.Id, userId));
}

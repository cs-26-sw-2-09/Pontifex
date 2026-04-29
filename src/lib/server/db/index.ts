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

export async function GetUserFromId(Id: number, withUserInfo: boolean = false) {
	return await db.query.User.findFirst({
		where: {
			Id: Id
		},
		with: {
			UserInfo: withUserInfo,
			Course: true
		}
	});
}

export async function GetUsersWithRole(Role: Role, withUserInfo: boolean = false) {
	return await db.query.User.findMany({
		where: {
			Role: Role
		},
		with: {
			UserInfo: withUserInfo,
			Course: true
		}
	});
}

// finds a specific users courses and returns it as an array
export async function GetCoursesFromUserId(userId: number) {
	const user = await db.query.User.findFirst({
		where: {
			Id: userId
		},
		with: {
			Course: true
		}
	});
	// if user does not have any courses returns empty array
	return user?.Course ?? [];
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
	await db
		.update(UserInfo)
		.set({
			Gender: userData.UserInfo?.Gender,
			Email: userData.UserInfo?.Email,
			PhoneNumber: userData.UserInfo?.PhoneNumber,
			Birthdate: userData.UserInfo?.Birthdate,
			CPR: userData.UserInfo?.CPR,
			Address: userData.UserInfo?.Address
		})
		.where(eq(UserInfo.UserId, userData.Id));
}

//Delets a user from the table of Users where the user.Id mathces the userId
export async function DeleteUser(userId: number) {
	await db.delete(User).where(eq(User.Id, userId));
}

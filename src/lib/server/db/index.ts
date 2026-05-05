import { drizzle } from "drizzle-orm/postgres-js";
//import postgres from "postgres";
//import * as schema from "./schema";
import { relations } from "./relations.ts";
import { env } from "$env/dynamic/private";
import type { Role, UserType } from "$lib/types";

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
		with: {
			Course: true
		}
	});
	// if user does not have any courses returns empty array
	return user?.Course ?? [];
}

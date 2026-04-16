import { drizzle } from "drizzle-orm/postgres-js";
//import postgres from "postgres";
//import * as schema from "./schema";
import { relations } from "./relations";
import { env } from "$env/dynamic/private";
import type { UserType } from "$lib/types";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

//const client = postgres(env.DATABASE_URL);

export const db = drizzle(env.DATABASE_URL, { relations });


// TODO: An example of how to query the database for an user user with the name "John Doe"
// This gets all fields
// db.select().from(schema.user).where(eq(schema.user.Name, "John Doe"))
// If you only want specific fields, this is the same but with only certain fields
// let user: { id: number, courses: number[] } = db.select({ id: schema.User.id, courses: schema.User.Courses() }).from(schema.User).where(eq(schema.User.Name, "John Doe"))


export function CheckForPermission(User: UserType) {
}

export async function GetUserFromId(Id: number, withUserInfo: boolean = false) {
  let temp = await db.query.User.findFirst({
    where: {
      Id: Id
    },
    with: {
      UserInfo: withUserInfo,
      Course: true
    }
  })
  return temp
}

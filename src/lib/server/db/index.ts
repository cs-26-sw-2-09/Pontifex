import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

// TODO: An example of how to query the database for an user user with the name "John Doe"
// This gets all fields
// db.select().from(schema.user).where(eq(schema.user.Name, "John Doe"))
// If you only want specific fields, this is the same but with only certain fields
// let user: {id: number, courses: number[]} = db.select({id: schema.user.id, courses: schema.user.Courses()}).from(schema.user).where(eq(schema.user.Name, "John Doe"))
// 
//

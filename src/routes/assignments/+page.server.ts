import { db } from "$lib/server/db";
import { Assignments } from "$lib/server/db/schema";

export async function load() {
  const assignments = await db.select().from(Assignments);

  return {
    assignments
  };
}
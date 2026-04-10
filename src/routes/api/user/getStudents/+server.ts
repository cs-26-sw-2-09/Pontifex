// localhost:8123/api/user/getStudents/
//
// Get all student ids
// return all ids as an array

//initial commit

import { db } from "$lib/server/db";
import { User } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  // Insert of test Data,
  //const { Users } = await import("$lib/index");

  // Filters through users who has the student role, then maps the Id to an array of numbers
  //const students: number[] = Users.filter((user) => user.Role === "Student").map(
  //	(student) => student.Id
  //);
  const students: { Id: number }[] = db.select({ Id: User.Id }).from(User).where(eq(User.Id, 1))

  // Retuns Json object including student users ID
  return new Response(JSON.stringify(students), {
    headers: { "Content-Type": "application/json" }
  });
}

// localhost:8123/api/user/getStudents/
//
// Get all student ids
// return all ids as an array

//initial commit

import { db, GetUsersWithRole } from "$lib/server/db";
import { Role } from "$lib/types";

export async function GET() {
  // Insert of test Data,
  //const { Users } = await import("$lib/index");

  // Filters through users who has the student role, then maps the Id to an array of numbers
  //const students: number[] = Users.filter((user) => user.Role === "Student").map(
  //	(student) => student.Id
  //);
  const students = await GetUsersWithRole(Role.Student);

  // Retuns Json object including student users ID
  return new Response(JSON.stringify(students), {
    headers: { "Content-Type": "application/json" }
  });
}

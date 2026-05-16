// localhost:8123/api/user/getTeachers/
//
// Get all teacher ids
// return all ids as an array

import { HasAccessToProfile } from "$lib/acm";
import { GetUserFromId, GetUsersWithRole } from "$lib/server/db";
import { Actions, Role } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";

export async function GET({ cookies }) {
  const userId: number = Number(cookies.get("user"));

  if (!userId) {
    redirect(303, "/");
  }

  // fetches user from database
  const user = await GetUserFromId(Number(userId));

  if (!user) {
    redirect(303, "/");
  }

  const teachers = await GetUsersWithRole(Role.Teacher);

  if (!teachers) {
    return new Response(
      JSON.stringify({
        status: 404,
        message: "No students found"
      }),
      { status: 404 }
    );
  }

  teachers.forEach(async (student) => {
    if (!(await HasAccessToProfile(user, Actions.Read, student)))
      throw error(403, "You do not have access to this profile");
  }); // Retuns Json object including student users ID
  return new Response(JSON.stringify(teachers), {
    headers: { "Content-Type": "application/json" }
  });
}

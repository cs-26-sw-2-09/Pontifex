import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

// gets the cookie, if not redirected to frontpage
export const load: PageServerLoad = async ({ cookies }) => {
  const userId = cookies.get("user");

  if (!userId) {
    redirect(303, "/");
  }

  const user = await db.GetUserFromId(Number(userId));
  return user;
};

import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/db";

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = Number(cookies.get("user"));
    const user = await db.GetUserFromId(userId);
    return { user: user ?? null };
};
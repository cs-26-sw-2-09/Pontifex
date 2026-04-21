import * as db from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { type UserType, Role } from "$lib/types";

export const load: PageServerLoad = async () => {
	const users: UserType[] = await db.GetUsersWithRole(Role.Student, false);
	//console.log(users);
	return {
		posts: users
	};
};

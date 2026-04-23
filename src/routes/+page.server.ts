import * as db from "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { Role } from "$lib/types";
import { redirect, error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: PageServerLoad = async () => {
	const [students, teachers, admins] = await Promise.all([
		db.GetUsersWithRole(Role.Student),
		db.GetUsersWithRole(Role.Teacher),
		db.GetUsersWithRole(Role.Admin)
	]);

	return { students, teachers, admins };
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get("id");
		if (!id) error(400, "ID not found");
		const role = data.get("role") as string;

		cookies.set("user", id.toString(), {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 24 * 30
		});

		redirect(303, `/${role.toLowerCase()}`);
	}
};

import type { PageServerLoad } from "./$types";
import { GetUserFromId, UpdateUser } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Role, type UserType } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, cookies }) => {
	const userId = Number(params.id);
	const currentUserId: number = Number(cookies.get("user"));

	if (!currentUserId) {
		redirect(303, "/");
	}
	// Check if user is of role admin
	const currentUser = await GetUserFromId(currentUserId, false);
	if (currentUser?.Role !== Role.Admin) {
		redirect(303, "/");
	}

	const user: UserType | undefined = await GetUserFromId(userId, true);
	if (!user) {
		error(404, "User not found");
	}
	console.log(user);
	return {
		user: user
	};
};

export const actions = {
	saveUser: async ({ request, params }) => {
		const userId = Number(params.id);
		if (!userId) {
			return;
		}
		const data = await request.formData();
		// Format Data
		const name = data.get("name") as string;
		const role = data.get("role") as Role;
		// Update user in database
		console.log(data);

		await UpdateUser(userId, { Name: name, Role: role });

		redirect(303, "/admin");
	},
	deleteUser: async () => {}
};

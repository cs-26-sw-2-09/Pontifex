import type { PageServerLoad } from "./$types";
import { GetUserFromId, UpdateUser, DeleteUser } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { Genders, Role, type UserType } from "$lib/types";
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
		const userinfo = {
			Email: data.get("email") as string,
			Address: data.get("address") as string,
			PhoneNumber: data.get("phonenumber") as string,
			Gender: data.get("gender") as Genders,
			CPR: data.get("cpr") as string,
			Birthdate: new Date(data.get("birthday") as string),
			Id: Number(data.get("userinfo-id") as string),
			UserId: userId as number //assings userinfo userid as the userid that is beeing edditet
		};

		const user: UserType = {
			Name: data.get("name") as string,
			Role: data.get("role") as Role,
			Id: userId,
			UserInfo: userinfo
		};

		// Update user in database
		console.log(data);

		await UpdateUser(user);

		redirect(303, "/admin");
	},
	deleteUser: async ({ params }) => {
		const userId = Number(params.id);
		if (!userId) {
			return;
		}
		await DeleteUser(userId);
		redirect(303, "/admin");
	}
};

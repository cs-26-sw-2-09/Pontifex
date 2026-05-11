import { redirect, type Actions } from "@sveltejs/kit";
import { CreateUser, GetUserFromId } from "$lib/server/db";
import type { UserType, Genders, UserInfo } from "$lib/types";
import { Role } from "$lib/types";
import { error } from "@sveltejs/kit";

export const actions: Actions = {
	createUser: async ({ request, cookies }) => {
		const currentUserId: number = Number(cookies.get("user"));

		if (!currentUserId) {
			redirect(303, "/");
		}

		const currentUser = await GetUserFromId(currentUserId, false);
		if (currentUser?.Role !== Role.Admin) {
			redirect(303, "/");
		}
		const data = await request.formData();
		const name = String(data.get("name")).trim();
		const role = data.get("role") as Role;

		if (!name || !role) {
			return error(400, {
				message: "Name and role are required."
			});
		}

		// Format Data
		const userinfo: UserInfo = {
			Gender: data.get("gender") as Genders,
			Email: data.get("email") as string,
			Address: data.get("address") as string,
			PhoneNumber: data.get("phoneNumber") as string,
			CPR: data.get("cpr") as string,
			Birthdate: new Date(data.get("birthday") as string).toDateString(),
			// Temporay variable and are overwritten in the createUser function
			Id: 0,
			UserId: 0
		};

		const user: UserType = {
			Name: name,
			Role: role,
			UserInfo: [userinfo],
			// Temporay variable and are overwritten in the createUser function
			Id: 0
		};
		await CreateUser(user);
		redirect(303, "/admin");
	}
};

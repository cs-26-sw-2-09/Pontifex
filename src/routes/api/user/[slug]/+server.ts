import { HasAccessToProfile } from "$lib/acm";
import { GetUserFromId } from "$lib/server/db/index.js";
import { Actions } from "$lib/types.js";
import { error, redirect } from "@sveltejs/kit";

// Return allowed data
export async function GET({ params, cookies }) {
	const userId: number = Number(cookies.get("user"));

	if (!userId) {
		redirect(303, "/");
	}

	// fetches user from database
	const user = await GetUserFromId(Number(userId));

	if (!user) {
		redirect(303, "/");
	}
	// Checks if Id is number else returns response Id not number,
	const Id = Number(params.slug);
	if (isNaN(Id)) {
		// Return new Response();
		return new Response(
			JSON.stringify({
				status: 400,
				message: "Id is not a number"
			}),
			{ status: 400 }
		);
	}

	// Find the right user
	//const User: User | undefined = Users.find((User) => User.Id === Id);

	const ResUser = await GetUserFromId(Id, true);
	console.log(ResUser);

	// Check if User is valid else return user not found.
	if (!ResUser) {
		return new Response(
			JSON.stringify({
				status: 404,
				message: "User not found"
			}),
			{ status: 404 }
		);
	}

	// Check for allowed data (later)
	if (!(await HasAccessToProfile(user, Actions.Read, ResUser)))
		throw error(403, "You do not have access to this assignment");

	// Return data
	return new Response(JSON.stringify(ResUser), {
		headers: { "Content-Type": "application/json" }
	});
}

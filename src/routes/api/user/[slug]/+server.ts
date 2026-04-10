// localhost:8123/api/user/123/
//
// Get param on get function
// the param is a number of the if of the user
// Get the info about the user
// Check if the user is allowed the info

import type { User } from "$lib/types.js";

// Return allowed data
export async function GET({ params }) {
	const { Users } = await import("$lib/index");
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
	const User: User | undefined = Users.find((User) => User.Id === Id);

	// Check if User is valid else return user not found.
	if (!User) {
		return new Response(
			JSON.stringify({
				status: 404,
				message: "User not found"
			}),
			{ status: 404 }
		);
	}

	// Check for allowed data (later)

	// Return data
	return new Response(JSON.stringify(User), {
		headers: { "Content-Type": "application/json" }
	});
}

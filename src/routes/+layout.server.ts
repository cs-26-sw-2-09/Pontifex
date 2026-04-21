//ENDPOint for db
// import * as db from "$lib/server/db";
// import type { LayoutServerLoad } from "./$types";
// const sessionId = 2; // Placeholder for session ID, replace with actual session management logic

// export const load: LayoutServerLoad = async () => {
// 	const user = await db.GetUserFromId(sessionId, true);
// 	return new Response(JSON.stringify(user), {
// 		//posts: await db.GetUserFromId(sessionId, true)
// 		headers: { "Content-Type": "application/json" }
// 	});
// };

// export const load: PageServerLoad = async ({ params }) => {
// 	return {
// 		post: await db.getPost(params.slug)
// 	};
// };

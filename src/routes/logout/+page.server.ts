import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

// when logging out cookie is deleted and user redirected to frontpage
export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete("user", { path: "/" });
		redirect(303, "/");
	}
};

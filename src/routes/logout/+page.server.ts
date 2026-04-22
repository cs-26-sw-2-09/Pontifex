import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ cookies }) => {
        cookies.delete("user", { path: "/" });
        redirect(303, "/");
    }
};
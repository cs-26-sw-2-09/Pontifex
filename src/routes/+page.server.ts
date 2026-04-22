import * as db from "$lib/server/db";
import type { PageServerLoad, Actions } from "./$types";
import { Role } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const [students, teachers, admins] = await Promise.all([
        db.GetUsersWithRole(Role.Student, true),
        db.GetUsersWithRole(Role.Teacher, true),
        db.GetUsersWithRole(Role.Admin, true),
    ]);

    return { students, teachers, admins };
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = Number(data.get("id"));
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
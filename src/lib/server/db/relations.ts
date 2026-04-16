import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	Course: {
		Users: r.many.User({
			from: r.Course.Id.through(r.UserToCourses.CourseId),
			to: r.User.Id.through(r.UserToCourses.UserId)
		})
	},
	User: {
		Course: r.many.Course({
			from: r.User.Id.through(r.UserToCourses.UserId),
			to: r.Course.Id.through(r.UserToCourses.CourseId)
		}),
		Permissions: r.many.Permissions(),
		UserInfo: r.many.UserInfo()
	},
	Permissions: {
		User: r.one.User({
			from: r.Permissions.UserId,
			to: r.User.Id
		})
	},
	UserInfo: {
		User: r.one.User({
			from: r.UserInfo.UserId,
			to: r.User.Id
		})
	}
}));

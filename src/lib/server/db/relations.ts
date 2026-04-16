import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  Course: {
    Teacher: r.one.User({
      from: r.Course.TeacherId,
      to: r.User.Id
    }),
    Students: r.many.User({ alias: "student" }),
  },
  User: {
    Course: r.many.Course(),
    Lessons: r.many.Course({
      from: r.User.Id.through(r.StudentsToCourses.UserId),
      to: r.Course.Id.through(r.StudentsToCourses.CourseId)
    }),
    Permissions: r.many.Permissions(),
    UserInfo: r.many.UserInfo(),
  },
  Permissions: {
    User: r.one.User({
      from: r.Permissions.UserId,
      to: r.User.Id
    }),
  },
  UserInfo: {
    User: r.one.User({
      from: r.UserInfo.UserId,
      to: r.User.Id
    }),
  },
}))

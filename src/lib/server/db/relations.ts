import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  Course: {
    Users: r.many.User({
      from: r.Course.Id.through(r.UserToCourses.CourseId),
      to: r.User.Id.through(r.UserToCourses.UserId)
    }),
    Assignments: r.many.Assignments({
      from: r.Course.Id,
      to: r.Assignments.CourseId
    })
  },
  User: {
    Course: r.many.Course({
      from: r.User.Id.through(r.UserToCourses.UserId),
      to: r.Course.Id.through(r.UserToCourses.CourseId)
    }),
    UserInfo: r.many.UserInfo(),
    HandedInAssignments: r.many.HandedInAssignments({
      from: r.User.Id,
      to: r.HandedInAssignments.UserId
    })
  },
  UserInfo: {
    User: r.one.User({
      from: r.UserInfo.UserId,
      to: r.User.Id
    })
  },
  Assignments: {
    Course: r.one.Course({
      from: r.Assignments.CourseId,
      to: r.Course.Id
    }),
    HandedInAssignments: r.many.HandedInAssignments({
      from: r.Assignments.Id,
      to: r.HandedInAssignments.AssignmentId
    }),
  },
  HandedInAssignments: {
    User: r.one.User({
      from: r.HandedInAssignments.UserId,
      to: r.User.Id
    }),
    Assignment: r.one.Assignments({
      from: r.HandedInAssignments.AssignmentId,
      to: r.Assignments.Id
    })
  }
}));

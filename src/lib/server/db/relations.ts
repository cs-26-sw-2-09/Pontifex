import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.ts";

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
    Submissions: r.many.Submissions({
      from: r.User.Id,
      to: r.Submissions.UserId
    }),
    Review: r.many.Review({
      from: r.User.Id,
      to: r.Review.TeacherId
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
    Submissions: r.many.Submissions({
      from: r.Assignments.Id,
      to: r.Submissions.AssignmentId
    })
  },
  Submissions: {
    User: r.one.User({
      from: r.Submissions.UserId,
      to: r.User.Id
    }),
    Assignment: r.one.Assignments({
      from: r.Submissions.AssignmentId,
      to: r.Assignments.Id
    })
  },
  Review: {
    Teacher: r.one.User({
      from: r.Review.TeacherId,
      to: r.User.Id
    }),
    Submission: r.one.Submissions({
      from: r.Review.SubmissionsId,
      to: r.Submissions.Id
    })
  }
}));

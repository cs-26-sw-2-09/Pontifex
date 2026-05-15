import { drizzle } from "drizzle-orm/postgres-js";
import type { Genders, Role } from "../lib/types.ts";
import * as Schema from "../lib/server/db/schema.ts";
import { relations } from "../lib/server/db/relations.ts";
import Assignments from "./Seed Data/assignments.json" with { type: "json" };
import Courses from "./Seed Data/courses.json" with { type: "json" };
import Submissions from "./Seed Data/submission.json" with { type: "json" };
import UserInfo from "./Seed Data/user_info.json" with { type: "json" };
import UserToCourses from "./Seed Data/user_to_courses.json" with { type: "json" };
import Users from "./Seed Data/users.json" with { type: "json" };
import Review from "./Seed Data/review.json" with { type: "json" };

// This function will see the database with the data from the JSON files.
export async function seed() {
  console.log("Seeding database...");
  await db.insert(Schema.User).values(
    Users.map((user) => ({
      Name: user.Name,
      Role: user.Role as Role,
      Id: user.Id
    }))
  );
  console.log("Inserted users");

  await db.insert(Schema.UserInfo).values(
    UserInfo.map((userInfo) => ({
      Id: userInfo.Id,
      UserId: userInfo.UserId,
      Gender: userInfo.Gender as Genders,
      Birthdate: new Date(userInfo.Birthdate).toISOString(),
      Address: userInfo.Address,
      CPR: userInfo.CPR,
      Email: userInfo.Email,
      PhoneNumber: userInfo.PhoneNumber
    }))
  );
  console.log("Inserted user info");

  await db.insert(Schema.Course).values(
    Courses.map((course) => ({
      Id: course.Id,
      Name: course.Name,
      Description: course.Description
    }))
  );
  console.log("Inserted courses");

  await db.insert(Schema.UserToCourses).values(
    UserToCourses.map((userToCourse) => ({
      UserId: userToCourse.UserId,
      CourseId: userToCourse.CourseId
    }))
  );
  console.log("Linked users to courses");

  await db.insert(Schema.Assignments).values(
    Assignments.map((assignment) => ({
      Id: assignment.Id,
      CourseId: assignment.CourseId,
      Name: assignment.Name,
      Description: assignment.Description,
      DueDate: new Date(assignment.DueDate)
    }))
  );
  console.log("Inserted assignments");

  await db.insert(Schema.Submissions).values(
    Submissions.map((submission) => ({
      Id: submission.Id,
      AssignmentId: submission.AssignmentId,
      UserId: submission.UserId,
      SubmissionDate: new Date(submission.SubmissionDate),
      AssignmentText: submission.AssignmentText
    }))
  );
  console.log("Inserted submissions");

  await db.insert(Schema.Review).values(
    Review.map((review) => ({
      Id: review.Id,
      SubmissionsId: review.SubmissionsId,
      TeacherId: review.TeacherId,
      Feedback: review.Feedback,
      Grade: review.Grade
    }))
  );
  console.log("Inserted reviews");
}

// Creating a connection to the datbase using the CI credentials.
// This will only work on the CI.
export const db = drizzle("postgres://user:password@localhost:5432/db-name", { relations });

// Run the seed function and exit the process when it's done.
seed().then(() => {
  console.log("Seeding complete");
  process.exit(0);
});

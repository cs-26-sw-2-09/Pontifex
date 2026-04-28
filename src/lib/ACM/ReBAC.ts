import { db } from "$lib/server/db";
import {
  type UserType,
  Role,
  Actions,
  type Resource,
  ResourceEnum,
  type Course,
  type UserToCourse
} from "$lib/types.js";

export async function hasAccess(user: UserType, action: Actions, resource: Resource): Promise<boolean> {
  // Allows admin to bypass all checks and return true
  if (user.Role === Role.Admin) return true;

  // Check if attribute school Id matches
  switch (resource.resourceEnum) {
    case ResourceEnum.Profile:
      return await hasAccessToProfile(user, action, resource.profile!);
    case ResourceEnum.Course:
      return await hasAccessToCourse(user, action, resource.course!);
    default:
      return false;
  }
}

async function hasAccessToProfile(
  user: UserType,
  action: Actions,
  // Resource is simplified to type userType since we are testing if the current user has acces to another profile
  resource: UserType
): Promise<boolean> {
  // Checks if the user is trying to access their own profile and the action is read, if so return true
  if (user.Id === resource.Id && action === Actions.Read) return true;

  // Checks if the user is of type teacher and the actions is read, if so return true
  if (user.Role === Role.Teacher && action === Actions.Read) {
    // 2 scenarios
    // 1. A teacher trying to get a students info
    // 2. A teacher trying to get the info of another teacher
    if (resource.Role === Role.Student) {
      // Get the courses for the student and teacher, check if any match
      let StudentCourses = await db.query.UserToCourses.findMany({
        where: {
          UserId: resource.Id
        }
      });
      let TeacherCourses = await db.query.UserToCourses.findMany({
        where: {
          UserId: user.Id
        }
      });
      return StudentCourses.some((SCourse) =>
        TeacherCourses.some((TCourse) => TCourse.CourseId == SCourse.CourseId)
      );
    }
    if (resource.Role == Role.Teacher) {
      // TODO: Discuss how this will be handled
      return false;
    }
  }
  return false;
}

async function hasAccessToCourse(
  user: UserType,
  action: Actions,
  Course: Course
): Promise<boolean> {
  let UserCourse: UserToCourse | undefined = await db.query.UserToCourses.findFirst({
    where: {
      UserId: user.Id,
      CourseId: Course.Id
    }
  });
  //console.log("UserCourse: ", UserCourse);
  //console.log("User: ", user);
  //console.log("Course: ", Course);
  //console.log("Action: ", action);

  // This checks multiple things
  // If the user is a teacher trying to read a course, this is granted
  // If the user is a teacher trying to write to the course, and if they have a relation with the course, this is granted
  if (user.Role == Role.Teacher) {
    if (action == Actions.Read) return true;
    if (action == Actions.Write && UserCourse) return true;
  }

  // This checks if the user has a relation with the course
  // The reason for doing it like this, is to make it easier to add more rules later down the line
  if (UserCourse === undefined) {
    //console.log("User does not have a relation with the course");
    return false;
  };

  // This checks if the user is a student trying to read, this is granded
  if (user.Role == Role.Student && action == Actions.Read) {
    //console.log("User is a student trying to read the course, access granted");
    return true;
  };

  //console.log("Default case, access denied");

  // Default denies access and return false
  return false;
}

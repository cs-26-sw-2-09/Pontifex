import { pgTable, serial, integer, text, date, pgEnum, char } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const RoleEnum = pgEnum("role", ["Student", "Teacher", "Admin"]);
export const GendersEnum = pgEnum("gender", ["Male", "Female", "NonBinary", "Other"]);
export const ActionsEnum = pgEnum("actions", ["Read", "Write", "Delete"]);

export const User = pgTable("users", {
  Id: serial().primaryKey(),
  Name: text().notNull()
  // TODO: Drizzle (ie. prostgress) does not support maps, hence we need to figure out an other way
  // Attributes: ,
});

export const UserInfo = pgTable("user_info", {
  UserId: integer().references(() => User.Id, { onDelete: "cascade" }).notNull(),
  Role: RoleEnum().notNull(),
  Gender: GendersEnum().notNull(),
  Email: text().notNull(),
  PhoneNumber: char({ length: 8 }).notNull(),
  Birthdate: date().notNull(),
  CPR: char({ length: 10 }).notNull(),
  Address: text().notNull()
});

export const Course = pgTable("courses", {
  Id: serial().primaryKey(),
  Name: text().notNull(),
  Description: text(),
  // TODO: Now with foreignKeys. Havent done this yet, cus no wifi, cus plane ✈️
  TeacherId: integer().references(() => User.Id)
  // Students: foreignKey()
});

export const Permissions = pgTable("permissions", {
  Id: serial().primaryKey(),
  UserId: integer().references(() => User.Id, { onDelete: "cascade" }),
  //object: foreignKey(), I dont really know what this will have a relation with yet
  Action: ActionsEnum()
});

export const UserRelations = relations(User, ({ one, many }) => ({
  UserInfo: one(UserInfo),
  Courses: many(Course, { relationName: "student" })
}));

export const UserInfoRelations = relations(UserInfo, ({ one }) => ({
  User: one(User, {
    fields: [UserInfo.UserId],
    references: [User.Id]
  })
}));

export const CourseRelations = relations(Course, ({ one, many }) => ({
  Teacher: one(User, {
    fields: [Course.TeacherId],
    references: [User.Id]
  }),
  Students: many(User, { relationName: "student" })
}));

export const PermissionsRelations = relations(Permissions, ({ one }) => ({
  User: one(User, {
    fields: [Permissions.UserId],
    references: [User.Id]
  })
}));

import {
	pgTable,
	serial,
	integer,
	text,
	date,
	pgEnum,
	char,
	primaryKey,
	timestamp
} from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("role", ["Student", "Teacher", "Admin"]);
export const GendersEnum = pgEnum("gender", ["Male", "Female", "NonBinary", "Other"]);
export const ActionsEnum = pgEnum("actions", ["Read", "Write", "Delete"]);

export const User = pgTable("users", {
	Id: serial().primaryKey(),
	Name: text().notNull(),
	Role: RoleEnum().notNull()
	// TODO: Drizzle (ie. prostgress) does not support maps, hence we need to figure out an other way
	// Attributes: ,
});

export const UserInfo = pgTable("user_info", {
	Id: serial().primaryKey(),
	UserId: integer()
		.references(() => User.Id, { onDelete: "cascade" })
		.notNull(),
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
	Description: text()
	// TeacherId: integer().references(() => User.Id) // OLD, teachers just go to the course table
});

export const UserToCourses = pgTable(
	"user_to_courses",
	{
		UserId: integer()
			.notNull()
			.references(() => User.Id),
		CourseId: integer()
			.notNull()
			.references(() => Course.Id)
	},
	(t) => [primaryKey({ columns: [t.UserId, t.CourseId] })]
);

export const Assignments = pgTable("assignments", {
	Id: serial().primaryKey(),
	TeacherId: integer().references(() => User.Id, { onDelete: "cascade" }),
	CourseId: integer().references(() => Course.Id, { onDelete: "cascade" }),
	Name: text().notNull(),
	Description: text().notNull(),
	DueDate: timestamp().notNull()
});

export const Submissions = pgTable("submissions", {
	Id: serial().primaryKey(),
	UserId: integer()
		.notNull()
		.references(() => User.Id, { onDelete: "cascade" }),
	AssignmentId: integer()
		.notNull()
		.references(() => Assignments.Id, { onDelete: "cascade" }),
	SubmissionDate: timestamp().defaultNow().notNull(),
	AssignmentText: text()
});

export const Review = pgTable("review", {
	Id: serial().primaryKey(),
	SubmissionsId: integer()
		.notNull()
		.references(() => Submissions.Id),
	TeacherId: integer()
		.notNull()
		.references(() => User.Id),
	Grade: integer(),
	Feedback: integer()
});

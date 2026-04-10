import { pgTable, serial, integer, text, date, foreignKey } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  Id: serial("id").primaryKey(),
  Name: text("name").notNull(),
  // TODO: Need to figure out how maps work with drizzle. Might have to do something else  
  // Attributes: ,
  Courses: integer().array(),
  // TODO: Need to figure out how enums work with drizzle
  // Role: Role.Student,
  // Gender: Genders.Male,
  Email: text().notNull(),
  PhoneNumber: text().notNull(),
  Birthdate: date().notNull(),
  CPR: text().notNull(),
  Address: text().notNull()
});

export const Course = pgTable("courses", {
  Id: integer().primaryKey(),
  Name: text().notNull(),
  Description: text(),
  // TODO: Now with foreignKeys. Havent done this yet, cus no wifi, cus plane ✈️
  // Teacher: foreignKey(),
  // Students: foreignKey()
})

export const Permissions = pgTable("permissions", {
  Id: integer().primaryKey(),
  //user: foreignKey(),
  //object: foreignKey(), I dont really know what this will have a relation with yet
  //action: enum?
})

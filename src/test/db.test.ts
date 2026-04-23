import { describe, it, expect } from "vitest";
import { GetUserFromId, GetUsersWithRole } from "$lib/server/db";
import { Role } from "$lib/types";

describe("Get user with user info", () => {
  it("User id of 1 should give Big John", async () => {
    expect(await GetUserFromId(1, true)).toStrictEqual({
      Id: 1,
      Name: "Big John",
      Role: "Admin",
      UserInfo: [
        {
          Id: 1,
          UserId: 1,
          Gender: "Other",
          Email: "Big@John.com",
          PhoneNumber: "12345678",
          Birthdate: "0001-01-01",
          CPR: "0101010000",
          Address: "In the mine"
        }
      ],
      Course: []
      //"HandedInAssignments": []
    });
  });
});

describe("Get user without user info", () => {
  it("User id of 5 should give John Pork", async () => {
    expect(await GetUserFromId(5)).toStrictEqual({
      Id: 5,
      Name: "John Pork",
      Role: "Student",
      Course: [
        {
          Id: 1,
          Name: "English",
          Description: null
        }
      ]
    });
  });
});

describe("Get all users with role of Student", () => {
  it("Should return all students", async () => {
    expect(await GetUsersWithRole(Role.Student)).toStrictEqual([
      {
        Id: 4,
        Name: "Bob the builder",
        Role: "Student",
        Course: [
          {
            Id: 1,
            Name: "English",
            Description: null
          }
        ]
      },
      {
        Id: 5,
        Name: "John Pork",
        Role: "Student",
        Course: [
          {
            Id: 1,
            Name: "English",
            Description: null
          }
        ]
      },
      {
        Id: 7,
        Name: "James Doakes",
        Role: "Student",
        Course: []
      },
      {
        Id: 8,
        Name: "Big Chungus",
        Role: "Student",
        Course: []
      },
      {
        Id: 9,
        Name: "Charlie Kirk",
        Role: "Student",
        Course: []
      },
      {
        Id: 11,
        Name: "Maga Morten",
        Role: "Student",
        Course: []
      },
      {
        Id: 12,
        Name: "Tobias Kaa",
        Role: "Student",
        Course: []
      },
      {
        Id: 13,
        Name: "Labre Larve",
        Role: "Student",
        Course: []
      },
      {
        Id: 14,
        Name: "Dorthe Donut",
        Role: "Student",
        Course: []
      },
      {
        Id: 15,
        Name: "King Tutankhamon",
        Role: "Student",
        Course: []
      }
    ]);
  });
});

describe("Get all users with role of Teacher", () => {
  it("Should return all teachers", async () => {
    expect(await GetUsersWithRole(Role.Teacher)).toStrictEqual([
      {
        Id: 3,
        Name: "Caleb Hane",
        Role: "Teacher",
        Course: []
      },
      {
        Id: 6,
        Name: "Hanne Pande",
        Role: "Teacher",
        Course: []
      },
      {
        Id: 10,
        Name: "Ole Larsen",
        Role: "Teacher",
        Course: [
          {
            Id: 2,
            Name: "Math",
            Description: null
          }
        ]
      }
    ]);
  });
});

describe("Get user with non existing id", () => {
  it("Should return null", async () => {
    expect(await GetUserFromId(999)).toBeNull();
  })
})

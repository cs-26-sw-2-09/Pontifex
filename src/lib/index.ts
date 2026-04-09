// place files you want to import through the `$lib` alias in this folder.
import type { User } from './types';
import { Role, Genders } from './types';




export let Users: User[] = [
  {
    Id: 1,
    Name: 'John Doe',
    Attributes: new Map([['hobby', 'coding'], ['favoriteColor', 'blue']]),
    Courses: [101, 102],
    Role: Role.Student,
    Gender: Genders.Male,
    Email: 'balls@uni.com',
    PhoneNumber: '123-456-7890',
    Birthdate: new Date('2000-01-01'),
    CPR: '010100-1234',
    Address: '123 Main St'
  },
  {
    Id: 2,
    Name: 'Jane Smith',
    Attributes: new Map([['hobby', 'painting'], ['favoriteColor', 'red']]),
    Courses: [101],
    Role: Role.Teacher,
    Gender: Genders.Female,
    Email: 'fuck@uni.com',
    PhoneNumber: '987-654-3210',
    Birthdate: new Date('1985-05-15'),
    CPR: '150585-5678',
    Address: '456 Elm St'
  }, {
    Id: 3,
    Name: 'Admin User',
    Attributes: new Map([['hobby', 'managing'], ['favoriteColor', 'green']]),
    Courses: [],
    Role: Role.Admin,
    Gender: Genders.NonBinary,
    Email: 'admin@uni.com',
    PhoneNumber: '555-555-5555',
    Birthdate: new Date('1970-01-01'),
    CPR: '010170-0000',
    Address: '789 Oak St'
  },
  {
    Id: 4,
    Name: 'Alex Johnson',
    Attributes: new Map([['hobby', 'gaming'], ['favoriteColor', 'purple']]),
    Courses: [102],
    Role: Role.Student,
    Gender: Genders.Other,
    Email: 'Ehh@uni.com',
    PhoneNumber: '321-654-0987',
    Birthdate: new Date('1995-10-20'),
    CPR: '201095-4321',
    Address: '321 Pine St'
  }
]

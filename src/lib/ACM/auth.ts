import {Action, type User, type Resource, type Relations, Role } from "$lib/types.js";
import {db} from "$lib/server/db/index.js"
import { User } from '../types';
import { PgSchema } from "drizzle-orm/pg-core";
import { permission } from "process";

export function hasAccess(user: User, resource: Resource, relation : Relations, action : Action, sessionId = 1/* Session ID  (Cookie): String*/): boolean {
	
	//Compare Session ID from web browser with User ID from Current User
	if(user.Id !== sessionId) { return false }
	
	// Check if the user and the requested resource belong to the same school if not return false
	if (Number(user.Attributes.get("SchoolID")) !== resource.SchoolID) {
		return false;
	}

	//if role is admin return true
	if (user.Role === Role.Admin) { return true; }

	/*
	If resource.type === skema && resource.ownerID == user.ID  return true;

	*/


	// Get user Permisions from DataBase
	// db.select().from(schema.user).where(eq(schema.user.Name, "John Doe"))
	// needs changing
	// Access Database, select from (table) where feild user id === current user.Id
	// permisions [] = db.select().from(PgSchema.permisions()).where(eq(PgSchema.user.Id, user.Id))
	
	//validate if permisions is empty
	//if(permisions undefined)
	// permission ?? return false;
	
	// Compare Action With usersepermissions
	
	// Filter on Action for array
	// actionPermList = permisions.filter(action)
	// resourcePermList = actionPermList.filter("resource.resourceType")

	// if(resourcePermList.filter(resource.resourceId).value()) {return true;}
	// else {return false}


	switch( resource.type ){
		// All sub authorization modules and functions.
		// One for each type of reasource
		
		// Check if users is allow to see a specifi Course
		

		// Check if User is allow to see, another profile,


		// Check if User is allow to see their own or others Assignments
		// Teachers should be able to see and Add/edit/delete Assingments for cources and individual students based on their relation

		
		// Check if user is allowed to see own or others grades
		// Teachers should be able to see and edit/change students grades based on their relation
		
		// Check if user is allowed to view their own or others schedule, 
		// Schedule should be compiled from the 

		default: 
		//throw error and return false
		return false;
	}
}
import { Action, type User, type Resource, type Relations, Role } from "$lib/types.js";

export function hasAccess(user: User, resource: Resource, relation : Relations, action : Action): boolean {
	// Check if the user and the requested resource belong to the same school if not return false
	if (Number(user.Attributes.get("SchoolID")) !== resource.SchoolID) {
		return false;
	}
	if (user.Role === Role.Admin) { return true; }

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
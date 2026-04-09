// localhost:8123/api/user/getTeachers/
//
// Get all teacher ids
// return all ids as an array

export async function GET() {
    // Insert of test DB,
    const { Users } = await import("$lib/index");
    
    // Filters through users who has the teacher role, then maps the Id to an array of numbers
    const teachers: number[] = Users.filter(user => user.Role === "Teacher").map(teacher => teacher.Id);
    
    // Retuns Json object including student users ID  
    return new Response(JSON.stringify(teachers), {
        headers: { "Content-Type": "application/json" }
    });
}
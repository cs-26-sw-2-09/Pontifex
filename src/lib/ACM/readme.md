# ACM

I think we need a way to handle acm like the touples, but maybe we should use the database for that.
A way would be having rows in the database that are like:

```
| id | User ID | Object ID | Action |
|----|---------|-----------|--------|
| 1  | 123     | 456       | read   |
| 2  | 123     | 789       | write  |
```

Then we can query the database to check if a user has permission to perform an action on an object. For example, to check if user 123 has read permission on object 456 (a course), we can run a query like:

```sql
SELECT * FROM permissions WHERE user_id = 123 AND object_id = 456 AND action = 'read';
```

If there is a result, then the user has the permission.
We can just check the database for each action.

When a new user is created we can have a function to create a group of permissions
We also need function to remove these permissions in a fast and easy way.

To optimize this, we need to use a relational database, since then on the user we can a list of all permissions the user has.
This is going to be the hard part, since we need to implement RBAC, ABAC & ReBAC, in some way that creates these entries in the database.

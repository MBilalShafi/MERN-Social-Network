# Node API Documentation


Available Routes:

# User:

/login [POST]
Will return a user (you will send email and password or username and password in arguments)

/users [GET]
Will return all users in JSON Array

/users [POST]
Will add a new user to the DB and return response object in JSON.

/users/:id [PUT]
Will update a user in DB

/users/:id [DELETE]
Will return all users in JSON Array


# Post:

/posts/user/:userId [GET]
get all posts by a user (arguments: userId)

/posts/tag/:tagId [GET] (not completed yet)
get all posts by a tagId (arguments: tagId [whenever you get a TAG JSON, you will get names + IDs])

/post [POST] (not completed yet)
Do a new post (see post.model.js for schema)

These docs will be updated as new features are added.

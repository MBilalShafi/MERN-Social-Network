const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const db = require("./app/database/db");


const app=express();

//mongoose.connect('mongodb://localhost/usersdb');
//mongoose.Promise = global.Promise;
db.conn();

// static files middleware (to serve static files like index.html)
app.use(express.static('www')); // static files will be fetched from www folder

// body Parser to parse all requests
//app.use(multer({dest:'./uploads/'}).single());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// routing API calls
app.use('/api', require("./app/routes/post.route"));
app.use('/api', require("./app/routes/user.route"));


// error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

app.listen(4000, function(){
    console.log("Listening on port 4000");
});

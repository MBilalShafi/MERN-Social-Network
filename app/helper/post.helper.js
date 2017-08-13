//Model
var UserProfile = require('../model/user.model');
var Post = require('../model/post.model');
var fs = require('fs');
var extend = require('util')._extend;

// Adding Post
exports.CreatePost = function (req, res) {


var newPath="";
if(req.file){
newPath = __dirname+"/../../www/uploads/"+req.file.filename+req.file.originalname.slice(req.file.originalname.length-4, req.file.originalname.length);
  fs.readFile(req.file.path, function (err, data) {
    // ...
    console.log(err);

    fs.writeFile(newPath, data, function (err) {
      console.log(err);
    });
  });

}

var sendPath="";
if (req.file)
  sendPath=req.file.filename+req.file.originalname.slice(req.file.originalname.length-4, req.file.originalname.length);
//var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
var ts=Date.now()
req.body.createdTimestamp=ts;
req.body.image=sendPath;
console.log("New Path: "+newPath);

//console.log();
Post.create(req.body).then(function (post) {
    if (!post) {
        res.json({STATUS: false, MESSAGE: "Error Creating Post: "+ err.message});
    } else {
      var jsonObj=JSON.parse(JSON.stringify(post));
      var o=extend({}, jsonObj);
      extend(o, {"STATUS": true, "MESSAGE": "Post has been Created"});
      console.log(o);
      res.send(o);
    }
});
//res.json({STATUS: false, MESSAGE: "Wrote file to "+newPath});
  //console.log(req);
  //console.log("In Post Helper");

    /*let user = new UserProfile();

    var query = UserProfile
        .find({
          $or: [{'username': req.body.username}, {'email': req.body.email}]
        }).exec();

    query.then(function (userFindData) {
        if (userFindData.length != 0) {
            res.json({STATUS: false, MESSAGE: "Duplicate usernames or emails not allowed."});
        } else {
            return UserProfile.create(req.body).then(function (userRes) {
                if (!user) {
                    res.json({STATUS: false, MESSAGE: "Fatal Error: "+ err.message});
                } else {
                    var jsonObj=JSON.parse(JSON.stringify(userRes));
                    var o=extend({}, jsonObj);
                    extend(o, {"STATUS": true, "MESSAGE": "User has been Created"});
                    console.log(o);
                    //jsonObj.concat({"STATUS": true, "MESSAGE": "User has been Created"});
                  //jsonUserRes=JSON.parse(userRes);
                  //console.log(JSON.stringify(jsonUserRes));
                  //var jsonRes=JSON.parse({STATUS: true, MESSAGE: "User has been Created"});
                  //console.log(JSON.stringify(jsonRes));
                    //res.json({STATUS: true, MESSAGE: "User has been Created"});
                    res.send(o);
                }
            });
            }
        })
        .catch(function (err) {
            if (err) {
                res.json({STATUS: false, MESSAGE: "Fatal Error: "+ err});
            }
        });

  */
}

//Model
var UserProfile = require('../model/user.model');
var Post = require('../model/post.model');
var extend = require('util')._extend;


// Adding Post
exports.CreatePost = function (req, res) {

  //console.log(req);
  //console.log("In Post Helper");
  //res.json({STATUS: false, MESSAGE: "Speaking from post.helper.js"});
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

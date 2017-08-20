//Model
var UserProfile = require('../model/user.model');
var Post = require('../model/post.model');
var extend = require('util')._extend;


// Adding Users
exports.CreateUser = function (req, res) {
    let user = new UserProfile();

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
}

exports.findUserById = function(id){
  return UserProfile.findOne({_id: id});
}

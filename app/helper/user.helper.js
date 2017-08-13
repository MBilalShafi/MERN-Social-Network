//Model
var UserProfile = require('../model/user.model');
var extend = require('util')._extend;

// Adding Users
exports.CreateUser = function (req, res) {
    let user = new UserProfile();
    user.username = req.body.username;
    user.password = req.body.password;
    user.gender = req.body.gender;
    user.email = req.body.email;
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
}

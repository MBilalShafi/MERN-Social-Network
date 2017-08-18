//Model
var UserProfile = require('../model/user.model');
var Post = require('../model/post.model');
var Tag = require('../model/tag.model');
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
//console.log("New Path: "+newPath);

req.body.tags=new Array();
// tags logic
var tagArray=req.body.tagsText;
var newArray=tagArray.split(',');
newArray.forEach(function(element) {
  element = element.replace(/\s+/g, ''); // remove white spaces
    console.log(element);

    var tagCreator=Tag.findOne({"name": element}).exec();
    tagCreator.then(function (taG) {
      //console.log("Tag: "+taG);
        if (taG) {
            //res.json({STATUS: false, MESSAGE: "Duplicate usernames or emails not allowed."});
            // tag create
            //console.log("tagfound");
            req.body.tags.push(taG._id);
            //console.log("Pushing: "+taG._id);
            if (req.body.tags.length==newArray.length){
              //console.log("Dumping before post: "+ req.body.tags);
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
            }
            console.log("Tag Arr length: "+req.body.tags.length);
        } else {
          Tag.create({"name":element}).then(function(tag){
            console.log("Tag 2: "+tag);
            req.body.tags.push(tag._id);
            console.log("Pushing: "+tag._id);
            if (req.body.tags.length==newArray.length){
              console.log("Dumping before post: "+ req.body.tags);
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
            }
          });
          console.log("tagNotfound");

        }
      })


      .catch(function(err){
        console.log(err.message);
      });

});



//console.log();

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

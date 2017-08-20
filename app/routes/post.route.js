const express = require("express");
const router = express.Router();
var multer = require('multer');

const Post = require("../model/post.model");
const Tag = require("../model/tag.model");

//Middleware
var postMiddleware = require('../middleware/post.middleware');

//Controller
var postController = require('../controller/post.controller');

// Helper
var commentHelper = require('../helper/comment.helper');
var userHelper = require('../helper/user.helper');
var tagHelper = require('../helper/tag.helper');

// get by username nd password
/*
router.get('/post', function(req, res, next){
  User.find({
    $or
    {
      username: req.query.username, password: req.query.password
    },
    {
      email: req.query.email, password: req.query.password
    }
    }).then(function(err, user){
    if (err) throw err;
    console.log(user);
    res.send(user);
  }).catch(function(){
    console.log('promise rejected');
    res.status(422).send("Error handling your request");
  });
});
*/

// get all posts by userId

router.get('/posts/user/:userId', function(req, res, next){
//  console.log('get request recvd');
Post.find({owner: req.params.userId}).sort('-createdTimestamp').exec(function(err, posts) {
  if (!err){
    res.send(posts);
  } else {
    console.log('/posts/user/:userId promise rejected');
    res.status(422).send(err);
  }
});
/*
  Post.find({owner: req.params.userId}).then(function(posts){


  }).catch(function(err){
    console.log('/posts/user/:userId promise rejected');
    res.status(422).send(err);
  });
*/
});

router.get('/post/:postId', function(req, res){
//  console.log('get request recvd');
  Post.findOne({_id: req.params.postId}).then(function(post){
    //post.ownername="";
    console.log("comments: "+post.comments.length)

      userHelper.findUserById(post.owner).then(function(userA){
        //console.log("User: "+userA);
        if(userA){
          post.owner=userA.username;
        }
        tagHelper.FindTags(post.tags).then(function(tagS){
          if(tagS){
            tagS=tagS.map(function(element){
              return element.name;
            });
            post.tags=tagS;
          } else{
            post.tags=[];
          }
            //console.log("comments: "+post.comments.length)
            commentHelper.GetComments(post.comments).then(function(comments){

              if (comments){
                post.comments=comments;
                console.log(comments);
              }
              else{
                post.comments=[];
              }

              res.send({post:post, user:userA, comments: comments});
              }).catch(function(err){
                console.log('comments search promise rejected');
                res.status(422).send(err);
              });
          //console.log("Post.route: Post: "+ post);
        });

      });


    //console.log("Post.route: Comments: "+ comments);




  }).catch(function(err){
    console.log('/post/:postId promise rejected '+ err);
    res.status(422).send(err);
  });
});



// get all posts by tag
/*    TODO     */

router.get('/posts/tag/:tagName', function(req, res, next){
//  console.log('get request recvd');
Tag.findOne({name: req.params.tagName}).then(function(tag){
  Post.find({tags: tag._id}).then(function(posts){
    res.send(posts);
  }).catch(function(err){
    console.log('/posts/tag/:tagName promise rejected');
    res.status(422).send(err);
  });
}).catch(function(err){
  console.log('promise rejected');
  res.status(422).send(err);
});

});

/*
router.post('/users', function(req, res, next){
  console.log(req.body);
  //var user = new User(req.body);
  //user.save();

  User.create(req.body).then(function(user){
    res.send(user);
  }).catch(next);

});
*/


router.post('/post', multer({ dest: __dirname+'/../../www/uploads/' }).single('image'),
/*
function(req, res, next){
  console.log(req.body);
  next();
},
*/
postMiddleware.validatePostRequest,
postController.controlPostRequest);


/*
router.put('/users/:id', function(req, res, next){
  User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    User.findOne({_id: req.params.id}).then(function(user){
        res.send(user);
    });
  });
});

router.delete('/users/:id', function(req, res, next){
  User.findByIdAndRemove({_id: req.params.id}).then(function(user){
    res.send(user);
  });

});
*/
module.exports=router;

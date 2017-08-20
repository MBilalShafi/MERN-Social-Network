const express = require("express");
const router = express.Router();
var multer = require('multer');

const Post = require("../model/post.model");
const Comment = require("../model/comment.model");


//Middleware
var commentMiddleware = require('../middleware/comment.middleware');

//Controller
var commentController = require('../controller/comment.controller');

// get comments against a post
router.get('/comments/:postId', commentMiddleware.validateCommentGet, commentController.controlMessageGet);

// get comments against an array of posts
router.post('/comments/', function(req, res, next){

    Comment.find({_id: post.comments}).then(function(comments){
      res.send(comments);
    }).catch(function(err){
      console.log('comment search promise rejected');
      res.status(422).send(err);
    });
});

//toggle thanks of a user on a comment
router.post('/comment/thanks', function(req, res, next){
//  console.log('get request recvd');
  var commID=req.body.commentId;
  var userId=req.body.userId;
  Comment.findOne({_id: commID, thanks: userID}).then(function(comment){
    if (comment){
      // already said thanks, remove thanks
      Comment.findByIdAndUpdate({_id: commID}, { $pull : { thanks: userID } } );
    } else {
      // add thanks
      Comment.findByIdAndUpdate({_id: commID}, { $push : { thanks: userID } } );
    }

  }).catch(function(err){
    console.log('post search promise rejected');
    res.status(422).send(err);
  });
});



// add a new comment on a post
router.post('/comment/', function(req, res, next){
  // req.body should contain authorID and body and postID

  Comment.create(req.body).then(function(comment){
    if(!comment){
      res.json({STATUS: false, MESSAGE: "Error Creating Comment "});
    } else {

      var jsonObj=JSON.parse(JSON.stringify(comment));

      // comment created, add the comment ID to the post
      Post.findByIdAndUpdate({_id: req.body.postID}, { $push : { comments: jsonObj._id } } )
      .then(function(){
        var o=extend({}, jsonObj);
        extend(o, {"STATUS": true, "MESSAGE": "Comment has been Created"});
        console.log(o);
        res.send(o);
      }).catch(function(err){
        console.log('comment b promise rejected');
        res.status(422).send(err);
      });

    }

  }).catch(function(err){
    console.log('comment a promise rejected');
    res.status(422).send(err);
  });
});

//router.post('/post', multer({ dest: __dirname+'/../../www/uploads/' }).single('image'),
//postMiddleware.validatePostRequest,
//postController.controlPostRequest);


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

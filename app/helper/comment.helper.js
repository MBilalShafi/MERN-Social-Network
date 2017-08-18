//Model
var UserProfile = require('../model/user.model');
var Post = require('../model/post.model');
var Comment = require('../model/comment.model');
var extend = require('util')._extend;

// Getting Comments
exports.GetCommentsForAPost =
function(req, res){
  var commentsArr=[];
//  console.log('get request recvd');
  Post.findOne({_id: req.params.postId}).then(function(post){
    // found post with returned ID
    if(post.comments.length>0){
      // fetch comments
      Comment.find({_id: post.comments}).then(function(comments){
        //res.send(comments);
        if (comments)
          commentsArr=comments;
        return commentsArr;
      }).catch(function(err){
        console.log('comment search promise rejected');
        res.status(422).send(err);
      });
    } else {
      //res.send({STATUS: "false", MESSAGE: "No Comments Found for post ID "+req.params.postId});
      return commentsArr;
    }
  }).catch(function(err){
    console.log('post search promise rejected');
    res.status(422).send(err);
  });
}

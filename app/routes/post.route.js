const express = require("express");
const router = express.Router();
var multer = require('multer');

const Post = require("../model/post.model");

//Middleware
var postMiddleware = require('../middleware/post.middleware');

//Controller
var postController = require('../controller/post.controller');

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
  Post.find({owner: req.params.userId}).then(function(posts){
    res.send(posts);
  }).catch(function(err){
    console.log('promise rejected');
    res.status(422).send(err);
  });
});



// get all posts by tag
/*    TODO     */

router.get('/posts/tag/:tag', function(req, res, next){
//  console.log('get request recvd');
  Post.find({owner: req.params.tag}).then(function(posts){
    res.send(posts);
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

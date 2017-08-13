const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

//Middleware
var userMiddleware = require('../middleware/user.middleware');

//Controller
var userController = require('../controller/user.controller');

// get by ID
/*
router.get('/users', function(req, res, next){
  User.findById({_id: req.query.id}).then(function(err, user){
    if (err) throw err;
    console.log(user);
    res.send(user);
  }).catch(function(){
    console.log('promise rejected');
    res.status(422).send("Error handling your request");
  });
});
*/

// get all

router.get('/users', function(req, res, next){
//  console.log('get request recvd');
  User.find({}).then(function(users){
    res.send(users);
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


router.post('/users', userMiddleware.validateUserRequest, userController.controlUserRequest);

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

module.exports=router;

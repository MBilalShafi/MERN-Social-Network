const express = require("express");
const router = express.Router();

const Tag = require("../model/tag.model");


// get all tags
router.get('/tags/', function(req, res, next){
//  console.log('get request recvd');
  Tag.find({}).then(function(tags){
    res.send(tags);
  }).catch(function(err){
    console.log('promise rejected');
    res.status(422).send(err);
  });
});


module.exports=router;

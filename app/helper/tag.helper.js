//Model

var Tag = require('../model/tag.model');
var extend = require('util')._extend;

// Getting Comments
exports.FindTags =
function(tagArr){
  return Tag.find({_id: tagArr});
  
}

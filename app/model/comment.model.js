const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: [true, "A comment must have an author."]
  },
  body: {
    type: String,
    required: [true, "A comment must have a body."]
  },
  thanks: {
    type: [Number]
    // a list of user IDs who say thanks
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports=Comment;

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
  createdTimestamp:{
    type: Number,
    required: [true, "A comment must be published on some time"]
  },
  thanks: {
    type: [String]
    // a list of user IDs who say thanks
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports=Comment;

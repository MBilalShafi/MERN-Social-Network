const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { // _id of post submittor
    type: Number,
    required: [true, "A post must have an owner"]
  }
  title: {
    type: String,
    required: [true, "Title is reqd"]
  },
  content: {
    type: String,
    required: [true, "Content is reqd"]
  },
  image: {
    type: String
  },
  comments: {
    type: [Number]
  },
  tags: {
    type: [Number],
    required: [true, "At least one tag is reqd"]
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports=Post;

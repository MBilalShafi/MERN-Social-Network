const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { // _id of post submittor
    type: String,
    required: [true, "A post must have an owner"]
  },
  title: {
    type: String,
    required: [true, "Title is reqd"]
  },
  content: {
    type: String,
    required: [true, "Content is reqd"]
  },
  image: {
    type: String,
    default: ""
  },
  comments: {
    type: [Number],
    default: []
  },
  tags: {
    type: [String], //ids of TAGS
    //required: [true, "At least one tag is reqd"]
  },
  createdTimestamp:{
    type: Number,
    required: [true, "A post must be published on some time"]
  }
});

const Post = mongoose.model('post', PostSchema);

module.exports=Post;

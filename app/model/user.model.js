const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  
  username: {
    type: String,
    required: [true, "Username is reqd"]
  },
  password: {
    type: String,
    required: [true, "Password is reqd"]
  },
  gender: {
    type: String,
    required: [true, "Gender is reqd"]
  },
  email: {
    type: String,
    required: [true, "Email is reqd"]
  }
});

const User = mongoose.model('user', UsersSchema);

module.exports=User;

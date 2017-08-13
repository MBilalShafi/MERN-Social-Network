var mongoose = require('mongoose');

module.exports = {
  conn: function(){
    mongoose.connect('mongodb://localhost/SocialNetwork'),
    mongoose.Promise = global.Promise;
  }
}

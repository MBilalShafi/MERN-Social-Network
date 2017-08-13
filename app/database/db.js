var mongoose = require('mongoose');

module.exports = {
  conn: function(){
    mongoose.connect('mongodb://localhost/usersdb'),
    mongoose.Promise = global.Promise;
  }
}

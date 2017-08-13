//Helper
var helperPost = require('../helper/post.helper');

//Create Credentials for User
exports.controlPostRequest = function(req, res) {
    return helperPost.CreatePost(req, res);
}

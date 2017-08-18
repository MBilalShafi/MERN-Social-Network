//Helper
var helperComment = require('../helper/comment.helper');


exports.controlMessageGet = function(req, res) {
    return helperComment.GetCommentsForAPost(req, res);
}

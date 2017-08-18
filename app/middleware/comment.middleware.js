const util = require('util')



exports.validateCommentGet = function(req, res, next) {
    var comment = req.body;

    console.log("comment.middleware: ");
    //console.log(util.inspect(req.body, false, null));
    if (!comment.author /*|| !user.name.match(Exp) */) {
        return res.json({ STATUS: false, MESSAGE: "Invalid Author" });
    }

    if (!comment.body ) {
        return res.json({ STATUS: false, MESSAGE: "Enter some comment please" });
    }

    //if (!user.createdTimestamp || !user.email.match(pattern)) {
      //  return res.json({ STATUS: false, MESSAGE: "Please Enter Valid Email Address." });
    //}

    // timestamp will be stored on node end
    next();
}

const util = require('util')



exports.validatePostRequest = function(req, res, next) {
    var post = req.body;
    var Exp = /^[A-Za-z]$/;
    var Age = /^[0-9]+$/;

    //var PhNo = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    //var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // email pattern
    console.log("post.middleware: ");
    console.log(util.inspect(req.body, false, null));
    if (!post.title /*|| !user.name.match(Exp) */) {
        return res.json({ STATUS: false, MESSAGE: "Invalid Title" });
    }

    if (!post.content ) {
        return res.json({ STATUS: false, MESSAGE: "Invalid Content" });
    }

    if (!post.tags /*|| !user.gender.match(Exp)*/) {
        return res.json({ STATUS: false, MESSAGE: "At least one tag should present" });
    }

    //if (!user.createdTimestamp || !user.email.match(pattern)) {
      //  return res.json({ STATUS: false, MESSAGE: "Please Enter Valid Email Address." });
    //}

    // timestamp will be stored on node end
    next();
}

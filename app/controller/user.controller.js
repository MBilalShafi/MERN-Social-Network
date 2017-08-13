//Helper
var helperAdmin = require('../helper/user.helper');

//Create Credentials for User
exports.controlUserRequest = function(req, res) {
    return helperAdmin.CreateUser(req, res);
}

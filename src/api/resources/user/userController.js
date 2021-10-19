var { generateControllers } = require("../../modules/query");
var { User } = require("./userModel");
generateControllers = generateControllers(User);
module.exports = generateControllers;

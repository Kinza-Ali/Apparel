var mongoose = require("mongoose");
var appConfig = require("./config/index");
mongoose.Promise = global.Promise;
console.log(appConfig);
const connect = (config = appConfig) => {
  return mongoose
    .connect(config.db.url, {
      useMongoClient: true,
    })
    .then(() => {
      consol.log("connected to database");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = connect;

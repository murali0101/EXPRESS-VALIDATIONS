const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://muralimv:1234@expressvalidations.6rfmb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};
module.exports = connect;

const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASS } = process.env;
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASS}@ds155268.mlab.com:55268/usersdb`;
//Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  //console.log("Connected to mongodb @ 27017");
});
mongoose.connection.on("error", err => {
  if (err) {
    console.log("Error " + err);
  }
});

module.exports = mongoose;

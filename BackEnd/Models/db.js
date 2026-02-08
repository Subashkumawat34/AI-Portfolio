const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("mongoDB connected successfully...");
  })
  .catch((err) => {
    console.error("mongoDB connection error: ", err.message);
    process.exit(1);
  });

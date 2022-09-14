const mongoose = require("mongoose");

const articleFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
module.exports = mongoose.model("articlescontactus", articleFormSchema);

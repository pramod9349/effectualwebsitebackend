const mongoose = require("mongoose");

const careerformSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,
});
module.exports = mongoose.model("careerforms", careerformSchema);

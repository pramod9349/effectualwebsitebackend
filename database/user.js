const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  service_for_enquiry: String,
  email: String,
  phone: String,
  message: String,
});
module.exports = mongoose.model("contactus", formSchema);

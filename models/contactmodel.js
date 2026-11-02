const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  contactMail: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const contactmodel = mongoose.model("contact", contactSchema);

module.exports = contactmodel;
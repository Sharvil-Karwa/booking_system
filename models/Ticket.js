const mongoose = require("mongoose");

const schema = mongoose.Schema({
  booked: Boolean,
  number: Number,
  price: Number,
  owner: String,
  ownerEmail: String,
});

module.exports = mongoose.model("Ticket", schema);

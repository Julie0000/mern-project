const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    requires: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    minlengh: 3,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, //Primary key
    ref: "User",
  },
  students: {
    type: [String],
    defualt: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);

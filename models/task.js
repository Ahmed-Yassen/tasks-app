const mongoose = require("mongoose");

module.exports = mongoose.model("task", {
  description: {
    type: String,
    required: [true, `Task's description is required.`],
    trim: true,
    lowercase: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

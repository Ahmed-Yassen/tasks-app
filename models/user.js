const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      "Please fill in a valid Email.",
    ],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be atleast 8 characters."],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(
          "Weak password! Password shouldnt contain the word password"
        );
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
      },
      _id: false,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();
  delete password;
  delete tokens;
  return userObject;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid Email or Password!");

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) throw new Error("Invalid Email or Password!");

    const token = jwt.sign({ _id: user._id.toString() }, "mylittlesecret", {
      expiresIn: "1 day",
    });

    user.tokens.push({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const newUser = await new User(req.body);
    const token = jwt.sign({ _id: newUser._id }, "mylittlesecret", {
      expiresIn: "1 day",
    });
    newUser.tokens.push({ token });
    await newUser.save();
    res.send({ newUser, token });
  } catch (error) {
    next(error);
  }
};

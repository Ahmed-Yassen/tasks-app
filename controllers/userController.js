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
    res.send({ msg: "Logged In!", user, token });
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
    res.status(201).send({ msg: "User Created!", newUser, token });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ msg: "Logged out!", user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ msg: "Logged all out!", user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.send(req.user);
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedFields = ["name", "email", "password", "age"];
    const isValidUpdate = updates.every((update) =>
      allowedFields.includes(update)
    );
    if (!isValidUpdate) throw new Error("Invalid Field(s)!");

    updates.forEach((update) => (req.user[update] = req.body[update]));
    req.user.save();
    res.send({ msg: "User updated successfully!", user: req.user });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

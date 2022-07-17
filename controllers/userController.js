const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");
const emailHandler = require("../emails/emailHandler");

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
    emailHandler.sendWelcomeEmail(newUser.email, newUser.name);
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

module.exports.getUserProfile = async (req, res) => {
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
    await req.user.save();
    res.send({ msg: "User updated successfully!", user: req.user });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports.removeUserProfile = async (req, res, next) => {
  try {
    await req.user.remove();
    emailHandler.sendCancelationEmail(req.user.email, req.user.name);
    res.send({ msg: "User removed successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.uploadUserImg = async (req, res, next) => {
  try {
    const resizedImage = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250,
      })
      .png()
      .toBuffer();

    req.user.image = resizedImage;
    await req.user.save();
    res.send({ msg: "Image uploaded successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.removeUserImg = async (req, res, next) => {
  try {
    if (!req.user.image) throw new Error("There is no image to be removed!");
    req.user.image = undefined;
    await req.user.save();
    res.send({ msg: "Image removed successfully!" });
  } catch (error) {
    next(error);
  }
};

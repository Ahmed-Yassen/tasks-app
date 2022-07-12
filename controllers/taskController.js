const Task = require("../models/task");

module.exports.createTask = async (req, res, next) => {
  try {
    const task = await new Task({
      ...req.body,
      userId: req.user._id,
    });
    await task.save();
    res.status(201).send({ msg: "Task Created!", task });
  } catch (error) {
    next(error);
  }
};

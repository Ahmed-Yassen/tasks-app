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

module.exports.getUserTasks = async (req, res, next) => {
  try {
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (error) {
    next(error);
  }
};

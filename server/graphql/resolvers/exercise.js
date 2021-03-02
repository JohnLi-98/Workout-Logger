const checkAuth = require("../../utils/check-auth");
const Exercise = require("../../models/Exercise");

module.exports = {
  Query: {
    async getAllExerciseLogs(_, __, context) {
      const user = checkAuth(context);
      try {
        const allExerciseLogs = await Exercise.find({
          user: user.id,
        }).sort({ createdAt: -1 });
        if (allExerciseLogs) {
          return allExerciseLogs;
        } else {
          throw new Error("Unable to fetch exercise logs");
          s;
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getExerciseLog(_, { exerciseId }, context) {
      const user = checkAuth(context);
      try {
        const exerciseLog = await Exercise.findById(exerciseId);
        if (exerciseLog && exerciseLog.user == user.id) {
          return exerciseLog;
        } else {
          throw new Error("Log for this exercise not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async addExercise(_, { exerciseName }, context) {
      const user = checkAuth(context);
      if (exerciseName.trim() === "") {
        throw new UserInputError("Empty Field", {
          errors: {
            exerciseName: "Enter a exercise name",
          },
        });
      }
      const exerciseLog = await Exercise.find({
        user: user.id,
        exerciseName,
        username: user.username,
      });
      if (exerciseLog.length !== 0) {
        throw new Error("Already Exists", {
          errors: {
            exerciseName: "This exercise already exists in your logs",
          },
        });
      } else {
        const newExercise = new Exercise({
          exerciseName,
          user: user.id,
        });
        const exercise = await newExercise.save();
        return exercise;
      }
    },
  },
};

const { UserInputError } = require("apollo-server");

const { validateLogSetInput } = require("../../utils/validators");
const checkAuth = require("../../utils/check-auth");
const Set = require("../../models/Set");
const Exercise = require("../../models/Exercise");
const Workout = require("../../models/Workout");

const createExerciseLog = async (user, exerciseName) => {
  const newExercise = new Exercise({
    user: user.id,
    exerciseName,
    username: user.username,
  });
  const exerciseLog = await newExercise.save();
  return exerciseLog;
};

const addSetToExerciseLog = async (exerciseLog, set) => {
  exerciseLog.sets.unshift(set);
  return await exerciseLog.save();
};

const createWorkoutLog = async (user, exerciseId, exerciseName) => {
  const newWorkout = new Workout({
    user: user.id,
    username: user.username,
    createdAt: Date.now(),
    exercises: [
      {
        _id: exerciseId,
        exerciseName,
      },
    ],
  });
  const workoutLog = await newWorkout.save();
  return workoutLog;
};

const addSetToWorkoutLog = async (
  workoutLog,
  exerciseId,
  exerciseName,
  set
) => {
  const exerciseExists = workoutLog.exercises.some(
    (exercise) => exercise.id === exerciseId
  );
  if (!exerciseExists) {
    workoutLog.exercises.unshift({
      _id: exerciseId,
      exerciseName,
    });
  }

  const exercise = workoutLog.exercises.find(
    (exercise) => exercise.id === exerciseId
  );
  if (exercise) {
    exercise.sets.unshift(set);
    await workoutLog.save();
  }
};

module.exports = {
  Mutation: {
    async logSet(
      _,
      { logSetInput: { exerciseName, weight, reps, notes } },
      context
    ) {
      const { errors, valid } = validateLogSetInput(exerciseName, weight, reps);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = checkAuth(context);
      const set = new Set({
        weight,
        reps,
        createdAt: Date.now(),
        notes,
      });

      let exerciseLog = await Exercise.findOne({
        exerciseName,
        user: user.id,
      });
      if (!exerciseLog) {
        exerciseLog = await createExerciseLog(user, exerciseName);
      }
      await addSetToExerciseLog(exerciseLog, set);

      let workoutLog = await Workout.findOne({ user: user.id }).sort({
        createdAt: -1,
      });
      const expiredWorkout =
        workoutLog && Date.now() > workoutLog.createdAt + 14400000;
      if (!workoutLog || expiredWorkout) {
        workoutLog = await createWorkoutLog(user, exerciseLog.id, exerciseName);
      }
      await addSetToWorkoutLog(workoutLog, exerciseLog.id, exerciseName, set);

      return set;
    },

    async deleteSet(_, { exerciseId, setId }, context) {
      const user = checkAuth(context);
      const exerciseLog = await Exercise.findOne({
        _id: exerciseId,
        user: user.id,
      });
      if (exerciseLog) {
        const setIndex = exerciseLog.sets.findIndex((set) => set.id === setId);
        if (setIndex >= 0) {
          exerciseLog.sets.splice(setIndex, 1);
          await exerciseLog.save();
        } else {
          throw new Error("Set not found");
        }
      } else {
        throw new Error("Exercise log not found");
      }

      // Gets the correct workout.
      const workoutLog = await Workout.findOne({
        user: user.id,
        "exercises._id": exerciseId,
        "exercises.sets._id": setId,
      });
      if (workoutLog) {
        ("");
        const exercise = workoutLog.exercises.find(
          (exercise) => exercise.id === exerciseId
        );
        const setIndex = exercise.sets.findIndex((set) => set.id === setId);
        exercise.sets.splice(setIndex, 1);
        await workoutLog.save();
      } else {
        throw new Error("Workout log not found");
      }
    },

    async editSet(
      _,
      { editSetInput: { exerciseId, setId, weight, reps, notes } },
      context
    ) {
      const user = checkAuth(context);
      const log = await Exercise.updateOne(
        {
          user: user.id,
          "sets._id": setId,
        },
        {
          "sets.$.weight": weight,
          "sets.$.reps": reps,
          "sets.$.notes": notes,
        }
      ).exec();

      // const workout = await Workout.find({
      //   user: user.id,
      //   "exercises.sets._id": setId,
      // });
      // console.log(workout);

      const workout = await Workout.updateOne(
        {
          user: user.id,
          "exercises.sets._id": setId,
        },
        {
          "exercises.$[i].sets.$[j].weight": weight,
          "exercises.$[i].sets.$[j].reps": reps,
          "exercises.$[i].sets.$[j].notes": notes,
        },
        {
          arrayFilters: [
            {
              "i._id": exerciseId,
            },
            {
              "j._id": setId,
            },
          ],
        }
      ).exec();
      console.log(workout + "workout");
      /*
      let exerciseLog = await Exercise.findOne({
        _id: exerciseId,
        user: user.id,
        "sets._id": setId,
      });
      if (exerciseLog) {
        const set = exerciseLog.sets.find((set) => set.id === setId);
        if (set) {
          const newSet = {
            _id: set.id,
            weight,
            reps,
            createdAt: set.createdAt,
            notes,
          };
          console.log(newSet);
          console.log("Space between");
          console.log(set);

          const setIndex = exerciseLog.sets.findIndex(
            (set) => set.id === setId
          );
          exerciseLog.sets.splice(setIndex, 1, newSet);
          await exerciseLog.save();
        }
      } else {
        throw new Error("Set not found");
      }
      */
    },
  },
};

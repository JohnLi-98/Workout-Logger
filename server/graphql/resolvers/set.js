const { UserInputError } = require("apollo-server");

const { validateLogSetInput } = require("../../utils/validators");
const checkAuth = require("../../utils/check-auth");
const Set = require("../../models/Set");
const Exercise = require("../../models/Exercise");
const Workout = require("../../models/Workout");

const createNewWorkout = (user, exerciseId, exerciseName) => {
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
  return newWorkout;
};

const addExercisetoWorkout = () => {};

const getExerciseLog = async (exerciseName, user) => {
  let exercise = await Exercise.findOne({
    exerciseName,
    user: user.id,
  });
  if (!exercise) {
    const newExercise = new Exercise({
      exerciseName,
      user: user.id,
      username: user.username,
    });
    exercise = await newExercise.save();
  }
  return exercise;
};

const addSetToExerciseLog = async (exercise, set) => {
  exercise.sets.unshift(set);
  await exercise.save();
  return exercise;
};

const getWorkoutLog = async (user, exerciseId, exerciseName) => {
  console.log(exerciseId + " getWorkout");
  console.log(exerciseName + " getWorkout");
  let workout = await Workout.findOne({ user: user.id }).sort({
    createdAt: -1,
  });

  const expiredWorkout = workout && Date.now() > workout.createdAt + 14400000;
  if (!workout || expiredWorkout) {
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
    workout = newWorkout.save();
  }
  return { workout, exerciseId };
};

const addSetToWorkoutLog = async (data, exerciseName, set) => {
  console.log(data + " before addworkoutset");
  const { workout, exerciseId } = data;
  console.log(exerciseId + " after addworkoutset");
  const exerciseExists = workout.exercises.some(
    (exercise) => exercise._id === exerciseId
  );
  if (!exerciseExists) {
    console.log("adding exercise");
    workout.exercises.unshift({
      _id: exerciseId,
      exerciseName,
    });
    console.log(workout.exercises);
  }

  const exercise = workout.exercises.find(
    (exercise) => exercise.id === exerciseId
  );
  console.log(workout.exercises);
  console.log(exercise);
  if (exercise) {
    exercise.sets.unshift(set);
    await workout.save();
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

      const exerciseLog = await getExerciseLog(exerciseName, user);
      await addSetToExerciseLog(exerciseLog, set);

      const workoutLog = await getWorkoutLog(
        user,
        exerciseLog.id,
        exerciseLog.exerciseName
      );
      await addSetToWorkoutLog(exerciseLog, exerciseName, set);

      // getExerciseLog(exerciseName, user).then((exercise) => {
      //   addSetToExerciseLog(exercise, set).then((exercise) => {
      //     getWorkoutLog(user, exercise.id, exercise.exerciseName).then(
      //       (data) => {
      //         addSetToWorkoutLog(data, exerciseName, set);
      //       }
      //     );
      //   });
      // });
      return set;
    },
  },
};

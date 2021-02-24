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

      let exercise = getExerciseLog(exerciseName, user).then((exercise) => {
        addSetToExerciseLog(exercise, set).then((exercise) => {
          console.log(exercise.id);
        });
      });

      //addSetToExerciseLog(exercise, set);
      const exerciseId = exercise.id;
      console.log(exerciseId);

      // let exercise = await Exercise.findOne({
      //   exerciseName: exerciseName,
      //   user: user.id,
      // });
      // if (!exercise) {
      //   const newExercise = new Exercise({
      //     exerciseName,
      //     user: user.id,
      //     username: user.username,
      //   });
      //   exercise = await newExercise.save();
      // }
      // const set = {
      //   weight,
      //   reps,
      //   createdAt: Date.now(),
      //   notes,
      // };
      // exercise.sets.unshift(set);
      // await exercise.save();
      // const exerciseId = exercise.id;
      // console.log(exerciseId);

      // let workout = await Workout.findOne({ user: user.id }).sort({
      //   createdAt: -1,
      // });
      // const expiredWorkout =
      //   workout && Date.now() > workout.createdAt + 14400000;

      // if (!workout || expiredWorkout) {
      //   workout = createNewWorkout(user, exerciseId, exerciseName);
      //   console.log("new workout " + workout.exercises[0].id);
      // }

      // const found = workout.exercises.some(
      //   (el) => el.exerciseName === exerciseName
      // );
      // if (!found) {
      //   workout.exercises.unshift(newExercise);
      // }

      // let exerciseMatch = workout.exercises.find(
      //   (e) => e.exerciseName === exerciseName
      // );
      // exerciseMatch.sets.unshift(set);
      // await workout.save();
      return set;
    },
  },
};

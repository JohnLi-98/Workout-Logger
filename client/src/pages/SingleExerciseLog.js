import React from "react";

const ExerciseLog = (props) => {
  const exerciseId = props.match.params.exerciseId;
  console.log(exerciseId);
  return <div>I'm the exercise log page</div>;
};

export default ExerciseLog;

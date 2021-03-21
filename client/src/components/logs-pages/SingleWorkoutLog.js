import React, { useState } from "react";
import { Container, Link, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";

import styles from "./styles";
import { GET_WORKOUT_LOG } from "../../util/graphql-operations";
import { convertToDateTime } from "../../util/common-functions";

export const SingleWorkoutLog = ({ props }) => {
  const classes = styles();
  const workoutId = props.match.params.workoutId;
  const [error, setError] = useState({});
  const { loading, data: { getWorkoutLog: workout } = {} } = useQuery(
    GET_WORKOUT_LOG,
    {
      onError(err) {
        console.log(err);
      },
      variables: {
        workoutId,
      },
    }
  );

  return (
    <Container maxWidth="md" className={classes.container}>
      {loading ? (
        <Paper className={classes.loading}>
          <h1>Retrieving Log...</h1>
        </Paper>
      ) : (
        <>
          {workout ? (
            <Paper className={classes.heading}>
              <h1>{convertToDateTime(workout.createdAt)}</h1>
              <p>
                {`View your progression and set history for the workout below.`}
              </p>
            </Paper>
          ) : (
            <Paper className={classes.heading}>
              <h1>Error</h1>
              <p>
                {`${error}. `}
                <Link component={RouterLink} to="/my-workout-logs">
                  Back to List of Logs
                </Link>
              </p>
            </Paper>
          )}

          <Paper className={classes.paper}>
            {workout.exercises.map((exercise) => (
              <h2>{exercise.exerciseName}</h2>
            ))}
          </Paper>
        </>
      )}
    </Container>
  );
};

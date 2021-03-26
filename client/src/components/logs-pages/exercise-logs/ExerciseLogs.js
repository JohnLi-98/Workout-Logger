import React from "react";
import { Container, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { GET_EXERCISE_LOGS } from "../../../util/graphql-operations";
import LogsTable from "./LogsTable";

import styles from "../styles";

export const ExerciseLogs = () => {
  const classes = styles();

  const {
    loading,
    data: { getAllExerciseLogs: exerciseLogs } = {},
  } = useQuery(GET_EXERCISE_LOGS, { fetchPolicy: "cache-and-network" });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper className={classes.heading}>
        <h1>Exercise Logs</h1>
        <p>
          View your progression and set history for each exercise by clicking on
          it below.
        </p>
      </Paper>

      {loading ? (
        <Paper className={classes.centerContent}>
          <h1>Retrieving Logs...</h1>
        </Paper>
      ) : (
        <LogsTable exercises={exerciseLogs} />
      )}
    </Container>
  );
};

import React from "react";
import { Container, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { GET_EXERCISE_LOGS } from "../../util/graphql-operations";
import LogsTable from "./LogsTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
  },
}));

export const ExerciseLogs = () => {
  const classes = useStyles();

  const {
    loading,
    data: { getAllExerciseLogs: exerciseLogs } = {},
  } = useQuery(GET_EXERCISE_LOGS, { fetchPolicy: "cache-and-network" });

  return (
    <Container maxWidth="md">
      <Paper>
        <h1>Exercise Logs</h1>
      </Paper>

      {loading ? (
        <Paper className={classes.paper}>
          <h1>Retrieving Logs...</h1>
        </Paper>
      ) : (
        <LogsTable exercises={exerciseLogs} />
      )}
    </Container>
  );
};

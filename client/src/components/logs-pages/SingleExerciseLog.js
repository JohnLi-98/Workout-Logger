import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Link,
  Paper,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link as RouterLink } from "react-router-dom";

import styles from "./styles";
import { GET_EXERCISE_LOG } from "../../util/graphql-operations";
import { convertToDateTime } from "../../util/common-functions";

export const SingleExerciseLog = ({ props }) => {
  const classes = styles();
  const [error, setError] = useState();
  const exerciseId = props.match.params.exerciseId;
  const { loading, data: { getExerciseLog: exercise } = {} } = useQuery(
    GET_EXERCISE_LOG,
    {
      onError(err) {
        console.log(err);
        setError(err.graphQLErrors[0].message);
      },
      variables: {
        exerciseId,
      },
    }
  );

  return (
    <Container maxWidth="md">
      {loading ? (
        <Paper className={classes.loading}>
          <h1>Retrieving Log...</h1>
        </Paper>
      ) : (
        <>
          {exercise ? (
            <Paper className={classes.heading}>
              <h1>{exercise.exerciseName}</h1>
              <p>
                {`View your progression and set history for ${exercise.exerciseName} below.`}
              </p>
            </Paper>
          ) : (
            <Paper className={classes.heading}>
              <h1>Error</h1>
              <p>
                {`${error}. `}
                <Link component={RouterLink} to="/my-exercise-logs">
                  Back to List of Logs
                </Link>
              </p>
            </Paper>
          )}

          <Paper className={classes.paper}>
            <div className={classes.accordionContainer}>
              {exercise.sets[0] ? (
                exercise.sets.map((set) => {
                  return (
                    <Accordion key={set.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                      >
                        <p>{convertToDateTime(set.createdAt)}</p>
                      </AccordionSummary>

                      <AccordionDetails>
                        <div>{set.weight}</div>
                        <div>{set.reps}</div>
                        <div>{set.notes}</div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              ) : (
                <Paper className={classes.centerContent}>
                  <p>No sets logged yet</p>
                </Paper>
              )}
            </div>
          </Paper>
        </>
      )}
    </Container>
  );
};

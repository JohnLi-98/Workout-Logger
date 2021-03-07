import React, { useState } from "react";
import { Container, Grid, IconButton, makeStyles } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import workoutImage from "../../images/workout.png";
import exerciseImage from "../../images/exercise.png";
import LogSetModal from "./LogSetModal";
import ImageButton from "./ImageButton";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    transform: "scale(2.5)",
  },
  icon: {
    color: "white",
  },
}));

const AuthHome = ({ user }) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalChange = (show) => {
    setModalOpen(show);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <div className={classes.heading}>
            <h1>Welcome back, {user.username}.</h1>
          </div>
        </Grid>

        <Grid item xs={2} className={classes.iconContainer}>
          <IconButton
            aria-label="Log a Set"
            className={classes.icon}
            title="Log a Set"
            onClick={() => handleModalChange(true)}
          >
            <AddCircleIcon />
          </IconButton>
          <LogSetModal
            modalOpen={modalOpen}
            handleModalChange={handleModalChange}
          />
        </Grid>

        <Grid item xs={6}>
          <ImageButton
            image={workoutImage}
            url="/my-workout-logs"
            text="Workout Logs"
          />
        </Grid>

        <Grid item xs={6}>
          <ImageButton
            image={exerciseImage}
            url="/my-exercise-logs"
            text="Exercise Logs"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthHome;

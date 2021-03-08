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
    marginTop: "30px",
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
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalChange = (show) => {
    setErrors({});
    setModalOpen(show);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.heading}>
          <h1>Welcome back, {user.username}.</h1>
          <div className={classes.iconContainer}>
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
              errors={errors}
              setErrors={setErrors}
              handleModalChange={handleModalChange}
            />
          </div>
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

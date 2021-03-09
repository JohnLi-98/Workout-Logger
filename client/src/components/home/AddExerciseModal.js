import React from "react";
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";

import { useForm } from "../../util/form-hooks";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    color: theme.palette.common.black,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(4, 5),
    height: "80vh",
    width: "70%",
  },
  paper2: {
    padding: theme.spacing(4, 5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "30px",
  },
  addButton: {
    margin: "0 10px",
    color: "green",
    borderColor: "green",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
  cancelButton: {
    color: "red",
    borderColor: "red",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },
}));

const AddExerciseModal = ({ exerciseModalOpen, exerciseModalChange }) => {
  const classes = useStyles();
  const callbackFunc = () => {
    console.log(values);
  };
  const { onSubmit, onChange, resetFormValues, values } = useForm(
    callbackFunc,
    {
      exerciseName: "",
    }
  );

  return (
    <Modal
      className={classes.modal}
      open={exerciseModalOpen}
      onClose={() => {
        exerciseModalChange(false);
        resetFormValues();
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={exerciseModalOpen}>
        {/* <div className={classes.paper}>I am the exercise modal</div> */}
        <Paper className={classes.paper2}>
          <div>
            <h2>Add Exercise</h2>
            <p>Add a new exercise to your logs.</p>
            <form
              onSubmit={onSubmit}
              id="addExerciseForm"
              noValidate
              autoComplete="off"
            >
              <TextField
                id="exerciseName"
                name="exerciseName"
                label="Exercise Name"
                type="text"
                value={values.exerciseName}
                onChange={onChange}
                variant="outlined"
                fullWidth
                required
              />
            </form>
          </div>

          <div className={classes.buttonsDiv}>
            <Button
              type="submit"
              form="addExerciseForm"
              variant="outlined"
              className={classes.addButton}
            >
              Add
            </Button>

            <Button
              variant="outlined"
              className={classes.cancelButton}
              onClick={() => {
                exerciseModalChange(false);
                resetFormValues();
              }}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default AddExerciseModal;

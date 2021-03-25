import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import { useForm } from "../../util/form-hooks";
import {
  GET_USER_EXERCISES,
  ADD_EXERCISE,
} from "../../util/graphql-operations";

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
    width: "300px",
  },
  formInput: {
    margin: theme.spacing(1, 0),
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
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});
  const closeExerciseModal = () => {
    resetFormValues();
    setErrors({});
    exerciseModalChange(false);
  };
  const addExerciseCallback = () => addExercise();
  const { onSubmit, onChange, resetFormValues, values } = useForm(
    addExerciseCallback,
    {
      exerciseName: "",
    }
  );
  const [addExercise] = useMutation(ADD_EXERCISE, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_USER_EXERCISES,
      });
      proxy.writeQuery({
        query: GET_USER_EXERCISES,
        data: {
          getAllExerciseLogs: [
            result.data.addExercise,
            ...data.getAllExerciseLogs,
          ],
        },
      });
      closeExerciseModal();
      enqueueSnackbar("Exercise Added", { variant: "success" });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <Modal
      className={classes.modal}
      open={exerciseModalOpen}
      onClose={() => closeExerciseModal()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={exerciseModalOpen}>
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
                className={classes.formInput}
                error={errors.exerciseName ? true : false}
                required
              />
            </form>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className={classes.formInput}>
              <Alert variant="filled" severity="error">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </Alert>
            </div>
          )}

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
              onClick={() => closeExerciseModal()}
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

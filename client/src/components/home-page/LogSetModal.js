import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  Grid,
  MenuItem,
  Modal,
  TextField,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import { GET_USER_EXERCISES, LOG_SET } from "../../util/graphql-operations";
import AddExerciseModal from "./AddExerciseModal";

const LogSetModal = ({ logSetModalOpen, logSetModalChange }) => {
  const classes = styles();
  const [errors, setErrors] = useState({});
  const closeLogSetModal = () => {
    logSetModalChange(false);
    setErrors({});
    resetFormValues();
  };

  const { data: { getAllExerciseLogs: exercises } = {} } = useQuery(
    GET_USER_EXERCISES
  );
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const exerciseModalChange = (show) => {
    setExerciseModalOpen(show);
    logSetModalChange(!show);
  };
  const { enqueueSnackbar } = useSnackbar();

  const registerSet = () => logSet();
  const { onChange, onSubmit, resetFormValues, values } = useForm(registerSet, {
    exerciseName: "",
    weight: 0,
    reps: 0,
    notes: "",
  });
  const [logSet] = useMutation(LOG_SET, {
    update() {
      resetFormValues();
      setErrors({});
      logSetModalChange(false);
      enqueueSnackbar("Set logged successfully", { variant: "success" });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <>
      <AddExerciseModal
        exerciseModalOpen={exerciseModalOpen}
        exerciseModalChange={exerciseModalChange}
      />
      <Modal
        className={classes.modal}
        open={logSetModalOpen}
        onClose={() => {
          closeLogSetModal();
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={logSetModalOpen}>
          <div className={classes.paper}>
            <div>
              <h3>Log a Set</h3>
              <p>Add a set to your account with this form.</p>
              <form
                onSubmit={onSubmit}
                id="logSetForm"
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="exerciseName"
                  name="exerciseName"
                  label="Exercise Name"
                  variant="outlined"
                  fullWidth
                  select
                  className={classes.formInput}
                  value={values.exerciseName}
                  error={errors.exerciseName ? true : false}
                  onChange={onChange}
                >
                  <MenuItem
                    onClick={() => exerciseModalChange(true)}
                    value={""}
                    className={classes.addExerciseItem}
                  >
                    <span>Add Exercise</span>
                    <AddCircleIcon />
                  </MenuItem>

                  {exercises &&
                    exercises.map((exercise) => (
                      <MenuItem key={exercise.id} value={exercise.exerciseName}>
                        {exercise.exerciseName}
                      </MenuItem>
                    ))}
                </TextField>

                <Grid container className={classes.formInput}>
                  <Grid item xs={6} className={classes.gridLeft}>
                    <TextField
                      id="weight"
                      name="weight"
                      label="Weight"
                      type="number"
                      min="0"
                      variant="outlined"
                      fullWidth
                      value={values.weight}
                      error={errors.weight ? true : false}
                      onChange={onChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={6} className={classes.gridRight}>
                    <TextField
                      id="reps"
                      name="reps"
                      label="Reps"
                      type="number"
                      min="0"
                      variant="outlined"
                      fullWidth
                      value={values.reps}
                      error={errors.reps ? true : false}
                      onChange={onChange}
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="notes"
                  name="notes"
                  label="Notes (Optional)"
                  type="text"
                  variant="outlined"
                  fullWidth
                  multiline={true}
                  rows="4"
                  className={classes.formInput}
                  value={values.notes}
                  onChange={onChange}
                />
              </form>
            </div>

            <div className={classes.buttonsDiv}>
              <Button
                type="submit"
                form="logSetForm"
                variant="outlined"
                className={classes.addButton}
              >
                Log Set
              </Button>

              <Button
                variant="outlined"
                className={classes.cancelButton}
                onClick={() => {
                  closeLogSetModal();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default LogSetModal;

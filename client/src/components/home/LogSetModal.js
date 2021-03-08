import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  Grid,
  makeStyles,
  MenuItem,
  Modal,
  TextField,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";

import { useForm } from "../../util/form-hooks";
import { LOG_SET } from "../../util/graphql-operations";

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
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
    [theme.breakpoints.up("xl")]: {
      height: "50vh",
      width: "30%",
    },
  },
  formInput: {
    margin: theme.spacing(1, 0),
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "15px 0",
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

const LogSetModal = ({ modalOpen, errors, setErrors, handleModalChange }) => {
  const classes = useStyles();
  const registerSet = () => logSet();
  const { onChange, onSubmit, resetLogSetValues, values } = useForm(
    registerSet,
    {
      exerciseName: "",
      weight: 0,
      reps: 0,
      notes: "",
    }
  );
  const [logSet] = useMutation(LOG_SET, {
    update() {
      console.log("Set added");
      resetLogSetValues();
      setErrors({});
      handleModalChange(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <Modal
      className={classes.modal}
      open={modalOpen}
      onClose={() => handleModalChange(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
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
                <MenuItem key="Bench Press" value="Bench Press">
                  Bench Press
                </MenuItem>

                <MenuItem key="Deadlift" value="Deadlift">
                  Deadlift
                </MenuItem>

                <MenuItem key="Squat" value="Squat">
                  Squat
                </MenuItem>

                <MenuItem key="Military Press" value="Military Press">
                  Military Press
                </MenuItem>
              </TextField>

              <Grid container spacing={1} className={classes.formInput}>
                <Grid item xs={6}>
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

                <Grid item xs={6}>
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
              onClick={() => handleModalChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default LogSetModal;

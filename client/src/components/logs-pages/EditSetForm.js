import React, { useState } from "react";
import { Button, DialogActions, Grid, TextField } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import { EDIT_SET, GET_EXERCISE_LOG } from "../../util/graphql-operations";

const EditSetForm = ({ exerciseId, set, handleClose }) => {
  const { id } = set;
  const classes = styles();
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const editSetCallback = () => editSet();
  const { onChange, onSubmit, values } = useForm(editSetCallback, {
    weight: set.weight,
    reps: set.reps,
    notes: set.notes,
  });
  const [editSet] = useMutation(EDIT_SET, {
    update(proxy) {
      const data = proxy.readQuery({
        query: GET_EXERCISE_LOG,
        variables: {
          exerciseId,
        },
      });
      proxy.writeQuery({
        query: GET_EXERCISE_LOG,
        variables: {
          exerciseId,
        },
        data: {
          getExerciseLog: data,
        },
      });
      enqueueSnackbar("Set edited", { variant: "success" });
      handleClose();
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      exerciseId,
      setId: id,
      weight: values.weight,
      reps: values.reps,
      notes: values.notes,
    },
  });

  return (
    <>
      <form onSubmit={onSubmit} id="editSetForm" noValidate autoComplete="off">
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

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="editSetForm" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default EditSetForm;

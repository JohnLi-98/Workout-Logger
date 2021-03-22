import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import {
  DELETE_SET,
  GET_EXERCISE_LOG,
  GET_WORKOUT_LOG,
} from "../../util/graphql-operations";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteSetButton = ({ workoutId, exerciseId, setId }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const [deleteSet] = useMutation(DELETE_SET, {
    update(proxy) {
      setOpen(false);

      if (workoutId) {
        const data = proxy.readQuery({
          query: GET_WORKOUT_LOG,
          variables: {
            workoutId,
          },
        });
        proxy.writeQuery({
          query: GET_WORKOUT_LOG,
          variables: {
            workoutId,
          },
          data: {
            getWorkoutLog: data,
          },
        });
      } else {
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
            getExerciseLog: data.getExerciseLog.sets.filter(
              (set) => set.id !== setId
            ),
          },
        });
      }
      enqueueSnackbar("Set deleted successfully", { variant: "success" });
    },
    variables: {
      exerciseId,
      setId,
    },
  });

  return (
    <div>
      <IconButton
        aria-label="delete set"
        title="Delete Set"
        className={classes.deleteButton}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>Remove Set From Logs?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to delete this set from your logs. Once done,
            this deletion can NOT be undone. Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={deleteSet} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteSetButton;

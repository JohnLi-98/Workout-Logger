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
import EditIcon from "@material-ui/icons/Edit";

import styles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditSetButton = ({ exerciseId, set }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="edit set"
        title="Edit Set"
        className={classes.editButton}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>Edit Set</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the current set below</DialogContentText>
          {
            // Add Form Here
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditSetButton;

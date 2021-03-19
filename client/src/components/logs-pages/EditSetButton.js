import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import styles from "./styles";
import EditSetForm from "./EditSetForm";

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
        onClose={handleClose}
      >
        <DialogTitle>Edit Set</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the current set below</DialogContentText>
          <EditSetForm
            exerciseId={exerciseId}
            set={set}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSetButton;

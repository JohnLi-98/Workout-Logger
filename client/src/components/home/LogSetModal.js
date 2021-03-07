import React from "react";
import { Backdrop, Button, Fade, makeStyles, Modal } from "@material-ui/core";

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
  modalButtonsDiv: {
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

const LogSetModal = ({ modalOpen, handleModalChange }) => {
  const classes = useStyles();

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
          <div>Modal</div>
          <div className={classes.modalButtonsDiv}>
            <Button
              type="submit"
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

import React from "react";
import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.up("sm")]: {
      height: 250,
    },
    [theme.breakpoints.up("md")]: {
      height: 300,
    },
    [theme.breakpoints.up("lg")]: {
      height: 350,
    },
    width: "100%",
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.6,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const ImageButton = ({ image, url, text }) => {
  const classes = useStyles();

  return (
    <ButtonBase
      key="Workout"
      className={classes.image}
      component={RouterLink}
      to={url}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <span className={classes.imageBackdrop} />
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.imageTitle}
        >
          {text}
          <span className={classes.imageMarked} />
        </Typography>
      </span>
    </ButtonBase>
  );
};

export default ImageButton;

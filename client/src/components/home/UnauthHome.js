import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 80px)",
    "& h1": {
      fontSize: "9vw",
    },
    "& h2": {
      fontSize: "5vw",
    },
    [theme.breakpoints.up("md")]: {
      "& h1": {
        fontSize: "7vw",
      },
      "& h2": {
        fontSize: "4vw",
      },
    },
    [theme.breakpoints.up("lg")]: {
      "& h1": {
        fontSize: "5vw",
      },
      "& h2": {
        fontSize: "3vw",
      },
    },
    [theme.breakpoints.up("xl")]: {
      "& h1": {
        fontSize: "3vw",
      },
      "& h2": {
        fontSize: "2vw",
      },
    },
    "& a": {
      color: "#7289da",
    },
    "& a:hover": {
      color: "#99aab5",
    },
  },
}));

const UnauthHome = () => {
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <Container maxWidth="md">
        <h2>Welcome to your</h2>
        <h1>WORKOUT LOGGER</h1>
        <p>
          We know the importance of tracking your progress while working out has
          on motivating you to continiously improve. Accelerate your development
          with our flexible application designed to help you view and update
          your progress with ease.
        </p>
        <p>
          Get started by{" "}
          <RouterLink to="/account/register">creating an account</RouterLink> or{" "}
          <RouterLink to="/account/login">signing in</RouterLink>.
        </p>
      </Container>
    </div>
  );
};

export default UnauthHome;

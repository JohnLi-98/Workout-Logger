import React from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";

const RegisterForm = () => {
  const classes = styles();

  const callbackFunc = () => {
    console.log("Running callback function");
  };

  const {
    onChange,
    onSubmit,
    passwordVisibility,
    confirmPasswordVisibility,
    values,
  } = useForm(callbackFunc, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  return (
    <>
      <Container maxWidth="md">
        <div className={classes.heading}>
          <h1>REGISTER</h1>
          <p>Fill in all fields to create an account</p>
        </div>

        <form
          onSubmit={onSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          <div className={classes.formInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle fontSize="large" />
              </Grid>

              <Grid item className={classes.gridItem}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  value={values.username}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  className={classes.input}
                  required
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.formInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <EmailIcon fontSize="large" />
              </Grid>

              <Grid item className={classes.gridItem}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={onChange}
                  variant="outlined"
                  fullWidth
                  className={classes.input}
                  required
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.formInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <LockIcon fontSize="large" />
              </Grid>

              <Grid item className={classes.gridItem}>
                <FormControl
                  className={classes.input}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          className={classes.visibilityIcon}
                        ></IconButton>
                      </InputAdornment>
                    }
                    labelWidth={90}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div className={classes.formInput}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <LockIcon fontSize="large" />
              </Grid>

              <Grid item className={classes.gridItem}>
                <FormControl
                  className={classes.input}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          className={classes.visibilityIcon}
                        ></IconButton>
                      </InputAdornment>
                    }
                    labelWidth={160}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div className={classes.formInput}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default RegisterForm;

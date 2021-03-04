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
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";

const LoginForm = () => {
  const classes = styles();

  const callbackFunc = () => {
    console.log("running callback function");
  };

  const { onChange, onSubmit, passwordVisibility, values } = useForm(
    callbackFunc,
    {
      username: "",
      password: "",
      showPassword: false,
    }
  );

  return (
    <Container maxWidth="md">
      <div className={classes.heading}>
        <h1>LOGIN</h1>
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
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        className={classes.visibilityIcon}
                        onClick={passwordVisibility}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <div className={classes.formInput}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;

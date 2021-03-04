import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  form: {
    paddingBottom: "40px",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
  },
  formInput: {
    margin: theme.spacing(2),
  },
  gridItem: {
    flexGrow: 1,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "100px 0 30px",
    "& h1": {
      marginBottom: "-5px",
    },
  },
  input: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: 2,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#99aab5",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#7289da",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336",
    },
    "& .MuiOutlinedInput-input": {
      color: "#ffffff",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#99aab5",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#7289da",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-input": {
      color: "#f44336",
    },
    "& .MuiInputLabel-outlined": {
      color: "#ffffff",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#99aab5",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#7289da",
    },
    "& .MuiInputLabel-outlined.Mui-error": {
      color: "#f44336",
    },
  },
  visibilityIcon: {
    color: "white",
  },
}));

export default styles;

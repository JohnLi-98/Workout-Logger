import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemText,
  withStyles,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem"; // Needed for style overrides
import { Menu } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: "250px",
    height: "100%",
    backgroundColor: "#7289da",
    color: "#ffffff;",
    padding: "0 !important",
  },
  item: {
    "& span": {
      fontSize: "20px",
    },
  },
});

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#2c2f33",
    },
    "&$selected:hover": {
      backgroundColor: "#2c2f33",
    },
    "&:hover": {
      backgroundColor: "#2c2f33",
    },
  },
  selected: {},
})(MuiListItem);

const SideDrawer = ({ selectedItem, setSelectedItem }) => {
  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  const handleItemClick = (event, selected) => {
    setSelectedItem(selected);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const drawerList = (
    <List component="nav" style={{ padding: "0" }}>
      <ListItem
        button
        component={RouterLink}
        to="/account/login"
        selected={selectedItem === "account/login"}
        onClick={(event) => handleItemClick(event, "account/login")}
      >
        <ListItemText className={classes.item} primary="Login" />
      </ListItem>

      <ListItem
        button
        component={RouterLink}
        to="/account/register"
        selected={selectedItem === "account/register"}
        onClick={(event) => handleItemClick(event, "account/register")}
      >
        <ListItemText className={classes.item} primary="Register" />
      </ListItem>
    </List>
  );

  const myDrawer = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {drawerList}
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        aria-label="Menu"
        onClick={toggleDrawer("right", true)}
      >
        <Menu fontSize="large" style={{ color: "white" }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        style={{ backgroundColor: "#2c2f33" }}
      >
        {myDrawer("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;

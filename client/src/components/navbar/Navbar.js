import React, { useState } from "react";
import {
  AppBar,
  Container,
  Fab,
  Hidden,
  List,
  ListItemText,
  makeStyles,
  Toolbar,
  withStyles,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem"; // Needed for style overrides
import NavigationIcon from "@material-ui/icons/Navigation";
import { Link as RouterLink } from "react-router-dom";

import HideNavOnScroll from "./HideNavOnScroll";
import SideDrawer from "./SideDrawer";
import ScrollToTop from "./ScrollToTop";

const styles = makeStyles({
  navbar: {
    backgroundColor: "#7289da",
    height: "80px",
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  navListDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
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
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
    "&$selected:hover": {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
    "&:hover": {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
  },
  selected: {},
})(MuiListItem);

const Navbar = () => {
  const classes = styles();

  const pathname = window.location.pathname;
  const path = pathname === "" ? "" : pathname.substr(1);
  const [selectedItem, setSelectedItem] = useState(path);

  const handleItemClick = (event, selected) => {
    setSelectedItem(selected);
  };

  return (
    <>
      <HideNavOnScroll>
        <AppBar position="fixed">
          <Toolbar component="nav" className={classes.navbar}>
            <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
              <List>
                <ListItem
                  button
                  component={RouterLink}
                  to="/"
                  selected={selectedItem === ""}
                  onClick={(event) => handleItemClick(event, "")}
                >
                  <ListItemText className={classes.item} primary="Home" />
                </ListItem>
              </List>

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navListDisplayFlex}
                >
                  <ListItem
                    button
                    component={RouterLink}
                    to="/account/login"
                    selected={selectedItem === "account/login"}
                    onClick={() => setSelectedItem("account/login")}
                  >
                    <ListItemText className={classes.item} primary="Login" />
                  </ListItem>

                  <ListItem
                    button
                    component={RouterLink}
                    to="/account/register"
                    selected={selectedItem === "account/register"}
                    onClick={(event) =>
                      handleItemClick(event, "account/register")
                    }
                  >
                    <ListItemText className={classes.item} primary="Register" />
                  </ListItem>
                </List>
              </Hidden>

              <Hidden mdUp>
                <SideDrawer
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideNavOnScroll>

      <Toolbar id="scroll-to-top-anchor" />

      <ScrollToTop>
        <Fab aria-label="Scroll back to top">
          <NavigationIcon />
        </Fab>
      </ScrollToTop>
    </>
  );
};

export default Navbar;

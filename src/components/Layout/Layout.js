import React, { Component, useState } from "react";
import Auxilary from "../../hoc/Auxilary";
import Toolbar from "../Navigation/Toolbar/Toolbar.js";
import classes from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  const SideDrawerCloseHandler = () => {
    setshowSideDrawer(false);
  };

  const SideDrawerToggleeHandler = () => {
    setshowSideDrawer(!showSideDrawer);
  };

  return (
    <Auxilary>
      <Toolbar SideDrawerToggleClicked={SideDrawerToggleeHandler} />
      <SideDrawer
        open={showSideDrawer}
        closed={SideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxilary>
  );
};

export default Layout;

import { Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../../Store/Action/index";

const Logout = (props) => {
 const {onLogout}= props
  useEffect(() => {
   onLogout();
  }, [onLogout]);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);

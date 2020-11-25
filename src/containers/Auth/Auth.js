import React, { setState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../Store/Action/AuthActioCreator";
import { updateObject, checkValidity } from "../../Shared/Utility";
import { useState } from "react";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      validation: {
        require: true,
        isEmail: true,
      },
      value: "",
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      validation: {
        require: true,
        minLength: 4,
      },
      value: "",
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);

  const {buildingBurger, authRedirectPath, OnSetAuthRedirectPath}= props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") OnSetAuthRedirectPath();
  }, [buildingBurger, authRedirectPath, OnSetAuthRedirectPath]);

  const switchAuthModelHnadler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangeHandler = (event, InputIdentifier) => {
    const updateOrederFormitem = updateObject(controls[InputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        controls[InputIdentifier].value,
        controls[InputIdentifier].validation
      ),
    });

    const updateOrederForm = updateObject(controls, {
      [InputIdentifier]: updateOrederFormitem,
    });
    setControls(updateOrederForm);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  let formInput = Object.keys(controls).map((formElement) => (
    <Input
      key={formElement}
      elementType={controls[formElement].elementType}
      elementConfig={controls[formElement].elementConfig}
      value={controls[formElement].value}
      isValid={controls[formElement].valid}
      shouldValidate={controls[formElement].validation}
      touched={controls[formElement].touched}
      changed={(event) => inputChangeHandler(event, formElement)}
    ></Input>
  ));
  if (props.loading) formInput = <Spinner />;
  if (props.isAthenticated) {
    formInput = <Redirect to={props.authRedirectPath} />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error} </p>;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {formInput}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModelHnadler}>
        {isSignUp ? "SWITCH TO SIGN IN" : "SWITCH TO SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAthenticated: state.auth.token !== null,
    bulding: state.auth.bulding,
    authRedirectPath: state.auth.authRedirectPath,
    buildingBurger: state.burgerbuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
    OnSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

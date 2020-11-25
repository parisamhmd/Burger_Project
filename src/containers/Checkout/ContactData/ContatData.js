import React, { useState } from "react";
import axios from "../../../axios-order";
import { connect } from "react-redux";
import * as action from "../../../Store/Action/index";

import { updateObject, checkValidity } from "../../../Shared/Utility";
import Button from "../../../components/UI/Button/Button.js";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = (props) => {
  const [OrderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      validation: {
        require: true,
      },
      value: "",
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      validation: {
        require: true,
      },
      value: "",
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Code",
      },
      validation: {
        require: true,
        minLength: 4,
        maxLength: 8,
      },
      value: "",
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      validation: {},
      value: "",
      valid: false,
      touched: false,
    },
    mail: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Mail",
      },
      validation: {
        require: true,
      },
      value: "",
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
    },
  });
  const [FormIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (event, InputIdentifier) => {
    const updateOrederFormitem = updateObject(OrderForm[InputIdentifier], {
      value: event.target.value,
      touched: true,
      valid: checkValidity(
        OrderForm[InputIdentifier].value,
        OrderForm[InputIdentifier].validation
      ),
    });

    const updateOrederForm = updateObject(OrderForm, {
      [InputIdentifier]: updateOrederFormitem,
    });

    let formIsValid = true;
    const updateOrederForm_keys = Object.keys(updateOrederForm);
    updateOrederForm_keys.map((input) => {
      formIsValid = updateOrederForm[input].valid && formIsValid;
    });

    setFormIsValid(formIsValid);
    setOrderForm(updateOrederForm);
  };

  const OrderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    const formData_keys = Object.keys(OrderForm);
    formData_keys.map((formElementIdentifer) => {
      formData[formElementIdentifer] = OrderForm[formElementIdentifer].value;
    });

    const order = {
      ingredients: props.ings,
      price: props.total_price,
      orderData: formData,
      userID: props.userID,
    };
    props.onOrderBurger(order);
  };

  const orderform_keys = Object.keys(OrderForm);
  let form = (
    <form onSubmit={OrderHandler}>
      {orderform_keys.map((formElement) => (
        <Input
          key={formElement}
          elementType={OrderForm[formElement].elementType}
          elementConfig={OrderForm[formElement].elementConfig}
          value={OrderForm[formElement].value}
          isValid={OrderForm[formElement].valid}
          shouldValidate={OrderForm[formElement].validation}
          touched={OrderForm[formElement].touched}
          changed={(event) => inputChangeHandler(event, formElement)}
        ></Input>
      ))}
      <Button btnType="Success" disabled={!FormIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) form = <Spinner />;

  return (
    <div className={classes.ContactData}>
      <h4> Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    total_price: state.burgerbuilder.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
    userID: state.auth.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (formData) => dispatch(action.PurchaseBurgerStart(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

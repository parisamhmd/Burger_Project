import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContatData from "./ContactData/ContatData";
import Spinner from "../../components/UI/Spinner/Spinner";

const Checkout = (props) => {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  const PurchaesdRedirect = props.purchased ? <Redirect to="/" /> : null;
  if (props.ings) {
    summary = (
      <div>
        {PurchaesdRedirect}
        <CheckoutSummary
          ingredient={props.ings}
          checkoutCancelled={checkoutCancelHandler}
          checkoutContinued={checkoutContinueHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContatData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerbuilder.ingredients,
    total_price: state.burgerbuilder.totalPrice,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);

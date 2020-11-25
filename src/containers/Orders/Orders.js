import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../Store/Action/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  const { onFetchOReders} = props; 
  useEffect(() => {
    onFetchOReders(props.userID);
  }, [onFetchOReders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    userID: state.auth.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOReders: (userID) => dispatch(actions.FetchOrders(userID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));

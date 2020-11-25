import * as actionType from "../Action/ActionType";
import { updateObject } from "../../Shared/Utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const PurchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.id });
  return updateObject(state, {
    purchased: true,
    loading: false,
    orders: state.orders.concat(newOrder),
  });
};

const PurchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const PurchaseBurgerLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const FetchDataSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orderData,
  });
};

const FetchDataFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.Purchase_Init:
      return purchaseInit(state, action);
    case actionType.PurchaseBurger_Success:
      return PurchaseBurgerSuccess(state, action);
    case actionType.PurchaseBurger_Fail:
      return PurchaseBurgerFail(state, action);
    case actionType.PurchaseBurger_Loading:
      return PurchaseBurgerLoading(state, action);
    case actionType.FetchData_Success:
      return FetchDataSuccess(state, action);
    case actionType.FetchData_Fail:
      return FetchDataFail(state, action);
    default:
      return state;
  }
};

export default Reducer;

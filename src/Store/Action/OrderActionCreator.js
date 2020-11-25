import axios from "../../axios-order";
import * as actionType from "./ActionType";

export const PurchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axios
      .post("/orders", orderData)
      .then((response) => {
        dispatch(PurchaseBurgerSuccess(response.data.name, orderData));
    
      })
      .catch((error) => dispatch(PurchaseBurgereFail(error)));
  };
};

export const PurchaseInit=()=>{
    return {
        type:actionType.Purchase_Init
    }
}

export const PurchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PurchaseBurger_Success,
    orderData: orderData,
    orderId: id,
  };
};

export const PurchaseBurgereFail = (error) => {
  return {
    type: actionType.PurchaseBurger_Fail,
    error: error,
  };
};

export const PurchaseLoading=()=>{
    return {
        type:actionType.PurchaseBurger_Loading
    }
}

export const FetchOrders=(userID)=>{
    return (dispatch)=>{
        axios.get("/orders?userID="+userID)
      .then((res) => {
          dispatch(FetchDataSuccess(res.data))
      })
      .catch((e) => {
        dispatch(FetchDataFail(e))
      });
    }
}

export const FetchDataSuccess=(orderData)=>{
    return{
        type:actionType.FetchData_Success,
        orderData:orderData 
    }
}

export const FetchDataFail=(error)=>{
    return{
        type:actionType.FetchData_Fail, 
        error:error
    }
}

import * as actionType from "../Action/ActionType";
import { updateObject } from "../../Shared/Utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGRIDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.8,
  cheese: 0.6,
  meat: 1.2,
};

const addIngredient = (state, action) => {
  const updateIngs = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  return updateObject(state, {
    ingredients: updateIngs,
    totalPrice: state.totalPrice + INGRIDIENT_PRICE[action.ingredientName],
    building:true
  });
};

const removeIngredient = (state, action) => {
  {
    const updateIngs = updateObject(state.ingredients, {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    });
    return updateObject(state, {
      ingredients: updateIngs,
      totalPrice: state.totalPrice - INGRIDIENT_PRICE[action.ingredientName],
      building:true
    });
  }
};

const setingredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building:false
  });
};

const FailedFetchData = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionType.ADD_INGREDIENT:
      return  addIngredient(state, action);

    case actionType.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionType.SET_INGREDIENTS:
      return setingredients(state, action);

    case actionType.Failed_FetchData:
      return FailedFetchData(state, action);

    default:
      return state;
  }
};

export default reducer;

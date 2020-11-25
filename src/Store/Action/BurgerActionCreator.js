import axios from "../../axios-order";
import * as actionType from "./ActionType";

export const addIngredient = (name) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredients) => {
  return {
    type: actionType.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const failedFetchedData = () => {
  return {
    type: actionType.Failed_FetchData,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:8000/ingredients')
      .then((response) => {
      
        dispatch(setIngredient(response.data));
        
      })
      .catch((error) => {
        dispatch(failedFetchedData());
      });
  };
};

import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Auxilary from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import Buildcontrols from "../../components/Burger/Buildcontrols/Burgercontrols";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../Store/Action/index";

const INGRIDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.6,
    meat: 1.2,
};

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector((state) => state.burgerbuilder.ingredients);
    const total_price = useSelector((state) => state.burgerbuilder.totalPrice);
    const error = useSelector((state) => state.burgerbuilder.error);
    const isAthenticated = useSelector((state) => state.auth.token !== null);

    const dispatch = useDispatch();

    const onIngredientAdded = (ing) => dispatch(actions.addIngredient(ing));
    const onIngredientRemoved = (ing) => dispatch(actions.removeIngredient(ing));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredient()), [dispatch]);
    const onPurchaseInit = () => dispatch(actions.PurchaseInit());
    const OnSetAuthRedirectPath = (path) =>
        dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseContinueHandler = () => {
        props.history.push("/checkout");
        onPurchaseInit();
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseHandler = () => {
        if (isAthenticated) setPurchasing(true);
        else {
            OnSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    };

    const UpdatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((el) => {
                return ingredients[el];
            })
            .reduce((acc, el) => acc + el, 0);
        return sum > 0;
    };

    const disableitem = { ...ings };
    const disableitem_key = Object.keys(disableitem);
    disableitem_key.map((key) => (disableitem[key] = disableitem[key] <= 0));

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't loaded</p> : <Spinner />;

    if (ings) {
        burger = (
            <Auxilary>
                <Burger ingredient={ings} />
                <Buildcontrols
                    ingredientadded={onIngredientAdded}
                    ingredientremoved={onIngredientRemoved}
                    disable={disableitem}
                    purchaseable={UpdatePurchaseState(ings)}
                    price={total_price}
                    isAuth={isAthenticated}
                    ordered={purchaseHandler}
                />
            </Auxilary>
        );

        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={total_price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );
    }

    return (
        <Auxilary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxilary>
    );
};

export default withErrorHandler(BurgerBuilder, axios);

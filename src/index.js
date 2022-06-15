import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
// import firebase from 'firebase'

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import BurgerReducer from "./Store/Reducer/BurgerBuilderReducer";
import OrderReducer from "./Store/Reducer/OrderReducer";
import AuthReducer from "./Store/Reducer/AuthReducer";
import { initializeApp } from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyAu3otO1i6hf376HoaNk7BdF9wKA-fQVoY",
    authDomain: "burger-fb02e.firebaseapp.com",
    databaseURL: "https://burger-fb02e-default-rtdb.firebaseio.com",
    projectId: "burger-fb02e",
    storageBucket: "burger-fb02e.appspot.com",
    messagingSenderId: "915447308957",
    appId: "1:915447308957:web:26bcf7e8476785d2812a74"

});

// const auth = firebase.default.auth();
// const db = firebase.firestore();

// db.settings({ timestampInSnapshot: true });

const rootReducer = combineReducers({
    burgerbuilder: BurgerReducer,
    order: OrderReducer,
    auth: AuthReducer,
});

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>{app}</React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

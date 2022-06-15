import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import firebase from "firebase";

import Layout from "./components/Layout/Layout";
import BurgerBuiler from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/logout/logout";
import * as actions from "./Store/Action/index";
import Spinner from "./components/UI/Spinner/Spinner";

const CheckOut = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth");
})

const App = (props) => {
    // const firebaseApp = firebase.apps[0];
    const { OnTryAutoSignUp } = props;
    useEffect(() => {
        OnTryAutoSignUp();
    }, [OnTryAutoSignUp]);
    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" exact component={BurgerBuiler} />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAthenticated)
        routes = (
            <Switch>
                <Route path="/checkout" render={(props) => <CheckOut {...props} />} />
                <Route path="/orders" render={(props) => <Orders {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/" exact component={BurgerBuiler} />
                <Redirect to="/" />
            </Switch>
        );
    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner />}>{routes}</Suspense>
            </Layout>
            {/* <code>
                <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
            </code> */}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        OnTryAutoSignUp: () => dispatch(actions.AuthCheckState()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

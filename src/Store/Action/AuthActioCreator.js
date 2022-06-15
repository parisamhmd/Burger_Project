import axios from "axios";
import * as actionType from "./ActionType";

export const AuthStart = () => {
    return {
        type: actionType.Auth_Start,
    };
};

export const AuthSuccess = (idToken, localId) => {
    return {
        type: actionType.Auth_Success,
        idToken: idToken,
        userID: localId,
    };
};

export const AuthFail = (error) => {
    return {
        type: actionType.Auth_Fail,
        error: error,
    };
};

export const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("userID");
    // localStorage.removeItem("ExpirationDate");
    return {
        type: actionType.Auth_LogOut,
    };
};

export const checkAuthTimeouts = (ExpireTime) => {
    return (dispatch) => {
        setTimeout(() => dispatch(logout()), ExpireTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.Set_Auth_Redirect_Path,
        path: path,
    };
};

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(AuthStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let userID = null;
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAu3otO1i6hf376HoaNk7BdF9wKA-fQVoY";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAu3otO1i6hf376HoaNk7BdF9wKA-fQVoY";
        }
        axios
            .post(url, authData)
            .then((response) => {
                dispatch(AuthSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeouts(response.data.expiresIn))
            })
            .catch((error) => {
                console.log(error.response.data.error.message);
                dispatch(AuthFail(error.response.data.error.message));
            });
    };
};

export const AuthCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) dispatch(logout());
        else {
            const expirationTime = new Date(localStorage.getItem("ExpirationDate"));
            if ((expirationTime) => new Date()) {
                dispatch(AuthSuccess(token));
                dispatch(
                    checkAuthTimeouts(
                        expirationTime.getTime() - new Date().getTime() / 1000
                    )
                );
            } else {
                dispatch(logout());
            }
        }
    };
};

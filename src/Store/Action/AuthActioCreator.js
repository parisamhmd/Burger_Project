import axios from "axios";
import * as actionType from "./ActionType";

export const AuthStart = () => {
  return {
    type: actionType.Auth_Start,
  };
};

export const AuthSuccess = (token, userID) => {
  return {
    type: actionType.Auth_Success,
    idToken: token,
    userID: userID,
  };
};

export const AuthFail = (error) => {
  return {
    type: actionType.Auth_Fail,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("ExpirationDate");
  return {
    type: actionType.Auth_LogOut,
  };
};

export const checkExpireTime = (ExpireTime) => {
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
    };
    let userID = null;
    let url = "http://localhost:8000/register";
    if (!isSignUp) {
      url = "http://localhost:8000/login";
    }
    axios
      .post(url, authData)
      .then((response) => {
        axios
          .get("http://localhost:8000/users")
          .then((res) => {
            res.data.forEach((user) => {
              if (user.email === authData.email) {
                userID = user.id;
                const ExpirationDate = new Date(new Date().getTime() + 3600); //3600=expirationTime
                localStorage.setItem("token", response.data["accessToken"]);
                localStorage.setItem("userID", userID);
                localStorage.setItem("ExpirationDate", ExpirationDate);
                dispatch(AuthSuccess(response.data["accessToken"], userID));
                dispatch(checkExpireTime(3600));
              }
            });
          });
      })
      .catch((error) => {
        dispatch(AuthFail(error.response?.data));
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
          checkExpireTime(
            expirationTime.getTime() - new Date().getTime() / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

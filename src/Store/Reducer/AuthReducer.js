import * as actionType from "../Action/ActionType";
import { updateObject } from "../../Shared/Utility";
const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userID: action.userID,
        loading: false,
        error: null,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userID: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path,
    });
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.Auth_Start:
            return authStart(state, action);
        case actionType.Auth_Success:
            return authSuccess(state, action);
        case actionType.Auth_Fail:
            return authFail(state, action);
        case actionType.Auth_LogOut:
            return authLogout(state, action);
        case actionType.Set_Auth_Redirect_Path:
            return setAuthRedirectPath(state, action);
        default:
            return state;
            break;
    }
};
export default Reducer;

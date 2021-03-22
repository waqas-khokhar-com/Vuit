import {combineReducers} from "redux";
import {actionTypes} from "../../../../Redux/actionTypes";

const {
    BIOMETRIC_LOADING,
    BIOMETRIC_SUCCESS,
    BIOMETRIC_FAIL,
    DEACTIVATE_ACCOUNT_LOADING,
    DEACTIVATE_ACCOUNT_FAIL,
    DEACTIVATE_ACCOUNT_SUCCESS
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    data: {},
};

const biometric = (
    state = initialState,
    action
) => {
    const {type: actionType, message, code} = action;

    switch (actionType) {
        case BIOMETRIC_LOADING:
            return {
                isLoading: true,
            };

        case BIOMETRIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case BIOMETRIC_FAIL:
            return {
                ...state,
                isLoading: false,
                message,
            };
        default:
            return state;
    }
};
const deactivateAccount = (
    state = initialState,
    action
) => {
    const {type: actionType, message, code} = action;

    switch (actionType) {
        case DEACTIVATE_ACCOUNT_LOADING:
            return {
                isLoading: true,
            };

        case DEACTIVATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case DEACTIVATE_ACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                message,
            };
        default:
            return state;
    }
};
export default combineReducers({
    biometric,
    deactivateAccount
});

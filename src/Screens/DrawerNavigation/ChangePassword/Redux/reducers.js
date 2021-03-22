import {combineReducers} from "redux";
import {actionTypes} from "../../../../Redux/actionTypes";

const {
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_LOADING,
    CHANGE_PASSWORD_SUCCESS,
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    data: {},
};

const changePassword = (
    state = initialState,
    action
) => {
    const { type: actionType, message, code } = action;

    switch (actionType) {
        case CHANGE_PASSWORD_LOADING:
            return {
                isLoading: true,
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case CHANGE_PASSWORD_FAIL:
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
    changePassword,
});
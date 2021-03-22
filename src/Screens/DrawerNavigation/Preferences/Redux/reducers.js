import {combineReducers} from "redux";
import {actionTypes} from "../../../../Redux/actionTypes";

const {
    PREFERENCES_UPDATE_FAIL,
    PREFERENCES_UPDATE_SUCCESS,
    PREFERENCES_UPDATE_LOADING,
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    data: {},
};

const preferences = (
    state = initialState,
    action
) => {
    const { type: actionType, message, code } = action;

    switch (actionType) {
        case PREFERENCES_UPDATE_LOADING:
            return {
                isLoading: true,
            };

        case PREFERENCES_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case PREFERENCES_UPDATE_FAIL:
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
    preferences,
});
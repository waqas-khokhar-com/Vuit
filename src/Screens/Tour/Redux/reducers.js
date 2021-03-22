import {combineReducers} from "redux";
import {actionTypes} from "../../../Redux/actionTypes";

const {
    TOUR_SUCCESS,
    TOUR_FAIL,
    TOUR_LOADING,
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    pages: [],
};

const tourPages = (
    state = initialState,
    action
) => {
    const { type: actionType, message, pages } = action;

    switch (actionType) {
        case TOUR_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case TOUR_SUCCESS:
            return {
                ...state,
                pages,
                isLoading: false,
            };

        case TOUR_FAIL:
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
    tourPages,
});

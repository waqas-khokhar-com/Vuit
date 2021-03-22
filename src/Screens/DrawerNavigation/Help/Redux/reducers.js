import {combineReducers} from "redux";
import {actionTypes} from "../../../../Redux/actionTypes";

const {
    FAQ_FAIL,
    FAQ_SUCCESS,
    FAQ_LOADING,
    CONTACT_US_FAIL,
    CONTACT_US_SUCCESS,
    CONTACT_US_LOADING
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    data: {},
};

const faq = (
    state = initialState,
    action
) => {
    const {type: actionType, message, faqList} = action;

    switch (actionType) {
        case FAQ_LOADING:
            return {
                isLoading: true,
            };

        case FAQ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                faqList,
            };

        case FAQ_FAIL:
            return {
                ...state,
                isLoading: false,
                message,
            };
        default:
            return state;
    }
};

const contactUs = (
    state = initialState,
    action
) => {
    const {type: actionType, message} = action;

    switch (actionType) {
        case CONTACT_US_LOADING:
            return {
                isLoading: true,
            };

        case CONTACT_US_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case CONTACT_US_FAIL:
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
    faq,
    contactUs
});

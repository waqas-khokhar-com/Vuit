import {combineReducers} from "redux";
import {actionTypes} from "../../../Redux/actionTypes";

const {
    POLICY_TYPE_SUCCESS,
    POLICY_TYPE_FAIL,
    POLICY_TYPE_LOADING,
    TUTORIAL_PAGES_FAIL,
    TUTORIAL_PAGES_SUCCESS,
    TUTORIAL_PAGES_LOADING,
    ADD_POLICIES_FAIL,
    ADD_POLICIES_SUCCESS,
    ADD_POLICIES_LOADING
} = actionTypes;

const initialState = {
    status: false,
    code: 0,
    message: "Something happened please try again!",
    data: {},
};

const policyTypes = (
    state = initialState,
    action
) => {
    const {type: actionType, message, types} = action;

    switch (actionType) {
        case POLICY_TYPE_LOADING:
            return {
                isLoading: true,
            };

        case POLICY_TYPE_SUCCESS:
            return {
                ...state,
                types,
                isLoading: false,
            };

        case POLICY_TYPE_FAIL:
            return {
                ...state,
                isLoading: false,
                message,
            };
        default:
            return state;
    }
};

const tutorialPages = (
    state = initialState,
    action
) => {
    const {type: actionType, message, pages} = action;

    switch (actionType) {
        case TUTORIAL_PAGES_LOADING:
            return {
                isLoading: true,
            };

        case TUTORIAL_PAGES_SUCCESS:
            return {
                ...state,
                pages,
                isLoading: false,
            };

        case TUTORIAL_PAGES_FAIL:
            return {
                ...state,
                isLoading: false,
                message,
            };
        default:
            return state;
    }
};
const addPolicies = (
    state = initialState,
    action
) => {
    const {type: actionType, message} = action;

    switch (actionType) {
        case ADD_POLICIES_LOADING:
            return {
                isLoading: true,
            };

        case ADD_POLICIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };

        case ADD_POLICIES_FAIL:
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
    policyTypes,
    tutorialPages,
    addPolicies
});

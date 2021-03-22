import { combineReducers } from "redux";
import { actionTypes } from "../../../../Redux/actionTypes";

const { LEGAL_FAIL, LEGAL_SUCCESS, LEGAL_LOADING } = actionTypes;

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  legal: [],
};

const legal = (state = initialState, action) => {
  const { type: actionType, message, legal } = action;

  switch (actionType) {
    case LEGAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case LEGAL_SUCCESS:
      return {
        ...state,
        legal,
        isLoading: false,
      };

    case LEGAL_FAIL:
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
  legal,
});

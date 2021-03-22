import { combineReducers } from "redux";
import { actionTypes } from "../../../../Redux/actionTypes";

const {
  HOME_FAIL,
  HOME_SUCCESS,
  HOME_LOADING,
  CONFIRM_DOCUMENT_LOADING,
  CONFIRM_DOCUMENT_SUCCESS,
  CONFIRM_DOCUMENT_FAIL,
} = actionTypes;

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const home = (state = initialState, action) => {
  const { type: actionType, message, policies } = action;

  switch (actionType) {
    case HOME_LOADING:
      return {
        isLoading: true,
      };

    case HOME_SUCCESS:
      return {
        ...state,
        policies,
        isLoading: false,
      };

    case HOME_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const confirmDocument = (state = initialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case CONFIRM_DOCUMENT_LOADING:
      return {
        isLoading: true,
      };

    case CONFIRM_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case CONFIRM_DOCUMENT_FAIL:
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
  home,
  confirmDocument,
});

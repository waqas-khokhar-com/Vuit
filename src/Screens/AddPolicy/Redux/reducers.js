import { combineReducers } from "redux";
import { actionTypes } from "../../../Redux/actionTypes";

const {
  UPLOAD_DOCUMENT_LOADING,
  UPLOAD_DOCUMENT_SUCCESS,
  UPLOAD_DOCUMENT_FAIL,
} = actionTypes;

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
  policy_data: [],
  policy: {},
};

const uploadDocument = (state = initialState, action) => {
  const { type: actionType, message, policy_data, policy } = action;

  switch (actionType) {
    case UPLOAD_DOCUMENT_LOADING:
      return {
        isLoading: true,
      };

    case UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        policy,
        policy_data,
        isLoading: false,
      };

    case UPLOAD_DOCUMENT_FAIL:
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
  uploadDocument,
});

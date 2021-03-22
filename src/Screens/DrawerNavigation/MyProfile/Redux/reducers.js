import { combineReducers } from "redux";
import { actionTypes } from "../../../../Redux/actionTypes";

const {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_LOADING,
  UPDATE_PROFILE_PIC_FAIL,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_LOADING,
  PROFILE_PHONE_VERIFICATION_LOADING,
  PROFILE_PHONE_VERIFICATION_SUCCESS,
  PROFILE_PHONE_VERIFICATION_FAIL,
} = actionTypes;

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const verifyPhone = (state = initialState, action) => {
  const { type: actionType, message, id: phoneVerificationId } = action;

  switch (actionType) {
    case PROFILE_PHONE_VERIFICATION_LOADING:
      return {
        isLoading: true,
      };

    case PROFILE_PHONE_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phoneVerificationId,
      };

    case PROFILE_PHONE_VERIFICATION_FAIL:
      return {
        ...state,
        isLoading: false,

        message,
      };
    default:
      return state;
  }
};

const profileUpdate = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case UPDATE_PROFILE_LOADING:
      return {
        isLoading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const profilePicUpdate = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case UPDATE_PROFILE_PIC_LOADING:
      return {
        isLoading: true,
      };

    case UPDATE_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_PROFILE_PIC_FAIL:
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
  profileUpdate,
  profilePicUpdate,
  verifyPhone,
});

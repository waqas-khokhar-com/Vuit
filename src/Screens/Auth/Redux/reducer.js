import { LOGIN, actionTypes } from "../../../Redux/actionTypes";
import { combineReducers } from "redux";

const {
  PHONE_VERIFICATION_FAIL,
  PHONE_VERIFICATION_SUCCESS,
  PHONE_VERIFICATION_LOADING,
  VALIDATE_PHONE_CODE_FAIL,
  VALIDATE_PHONE_CODE_SUCCESS,
  VALIDATE_PHONE_CODE_LOADING,
  SIGN_UP_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_LOADING,
  LOGINED_USER,
  CREATE_PASSWORD_FAIL,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_LOADING,
  EMAIL_VERIFICATION_LOADING,
  EMAIL_VERIFICATION_SUCCESS,
  EMAIL_VERIFICATION_FAIL,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  VERIFY_REFERRAL_FAIL,
  VERIFY_REFERRAL_SUCCESS,
  VERIFY_REFERRAL_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_FAIL,
  UNLOCK_ACCOUNT_FAIL,
  UNLOCK_ACCOUNT_SUCCESS,
  UNLOCK_ACCOUNT_LOADING,
  VERIFY_UNLOCK_ACCOUNT_FAIL,
  VERIFY_UNLOCK_ACCOUNT_SUCCESS,
  VERIFY_UNLOCK_ACCOUNT_LOADING,
  SAVE_PASSWORD_UNLOCK_ACCOUNT_SUCCESS,
  SAVE_PASSWORD_UNLOCK_ACCOUNT_LOADING,
  SAVE_PASSWORD_UNLOCK_ACCOUNT_FAIL,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_LOADING,
  LOGOUT,
  PROFILE_FAIL,
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  REACTIVATE_ACCOUNT_FAIL,
  REACTIVATE_ACCOUNT_LOADING,
  REACTIVATE_ACCOUNT_SUCCESS,
} = actionTypes;
// const authData = (state = {}, action) => {
// const { type: actionType, token, user } = action;

//   switch (actionType) {
//     case AUTH_USER_SUCCESS:
//       return {
//         token: token,
//         user: user,
//         isLoggedIn: true,
//       };

//     case AUTH_USER_FAIL:
//       return {
//         token: null,
//         isLoggedIn: false,
//       };
//     default:
//       return state;
//   }
// };

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const savePasswordUnlockAccount = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case SAVE_PASSWORD_UNLOCK_ACCOUNT_LOADING:
      return {
        isLoading: true,
      };

    case SAVE_PASSWORD_UNLOCK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SAVE_PASSWORD_UNLOCK_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const newPassword = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case NEW_PASSWORD_LOADING:
      return {
        isLoading: true,
      };

    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const verifyUnlockAccount = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case VERIFY_UNLOCK_ACCOUNT_LOADING:
      return {
        isLoading: true,
      };

    case VERIFY_UNLOCK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case VERIFY_UNLOCK_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const unlockAccount = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case UNLOCK_ACCOUNT_LOADING:
      return {
        isLoading: true,
      };

    case UNLOCK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UNLOCK_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const forgotPasswordVerify = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case RESET_PASSWORD_LOADING:
      return {
        isLoading: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const forgotPassword = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case FORGOT_PASSWORD_LOADING:
      return {
        isLoading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const verifyReferralInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const verifyReferral = (state = verifyReferralInitialState, action) => {
  const { type: actionType, message, used_referral_code } = action;

  switch (actionType) {
    case VERIFY_REFERRAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case VERIFY_REFERRAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        used_referral_code,
      };

    case VERIFY_REFERRAL_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const loginInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
  isLoading: false,
};

const authData = (
  state = {
    access_token: "",
    user: { notification: { document: 0, alert: 0 } },
  },
  action
) => {
  const { type: actionType, access_token, user } = action;
  console.log("state", user);
  switch (actionType) {
    case LOGINED_USER:
      return {
        ...state,
        access_token,
        user,
      };
    default:
      return state;
  }
};

const login = (state = loginInitialState, action) => {
  const { type: actionType, message, access_token, user } = action;

  switch (actionType) {
    case LOGOUT:
      return { ...loginInitialState };

    case LOGIN_USER_LOADING:
      return {
        isLoading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const profile = (state = loginInitialState, action) => {
  const { type: actionType, message, access_token, user } = action;

  switch (actionType) {
    case PROFILE_LOADING:
      return {
        isLoading: true,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const verifyPhoneInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const verifyPhone = (state = verifyPhoneInitialState, action) => {
  const { type: actionType, message, id: phoneVerificationId } = action;

  switch (actionType) {
    case PHONE_VERIFICATION_LOADING:
      return {
        isLoading: true,
      };

    case PHONE_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phoneVerificationId,
      };

    case PHONE_VERIFICATION_FAIL:
      return {
        ...state,
        isLoading: false,

        message,
      };
    default:
      return state;
  }
};
const verifyEmailInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const verifyEmail = (state = verifyEmailInitialState, action) => {
  const { type: actionType, message, id: phoneVerificationId } = action;

  switch (actionType) {
    case EMAIL_VERIFICATION_LOADING:
      return {
        isLoading: true,
      };

    case EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phoneVerificationId,
      };

    case EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        isLoading: false,

        message,
      };
    default:
      return state;
  }
};

const signUpInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const signUp = (state = signUpInitialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case SIGN_UP_LOADING:
      return {
        isLoading: true,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};

const validatePhoneCodeInitialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  data: {},
};

const validatePhoneCode = (state = validatePhoneCodeInitialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case VALIDATE_PHONE_CODE_LOADING:
      return {
        isLoading: true,
      };

    case VALIDATE_PHONE_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message,
      };

    case VALIDATE_PHONE_CODE_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const createPassword = (state = validatePhoneCodeInitialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case CREATE_PASSWORD_LOADING:
      return {
        isLoading: true,
      };

    case CREATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message,
      };

    case CREATE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};

const deactivateAccount = (state = initialState, action) => {
  const { type: actionType, message, code } = action;

  switch (actionType) {
    case REACTIVATE_ACCOUNT_LOADING:
      return {
        isLoading: true,
      };

    case REACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case REACTIVATE_ACCOUNT_FAIL:
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
  verifyPhone,
  validatePhoneCode,
  signUp,
  createPassword,
  verifyEmail,
  login,
  verifyReferral,
  authData,
  forgotPassword,
  forgotPasswordVerify,
  unlockAccount,
  verifyUnlockAccount,
  savePasswordUnlockAccount,
  newPassword,
  profile,
  deactivateAccount,
});

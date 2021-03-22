import Axios from "axios";
import {
  ACCOUNT_STATUS_LOCKED,
  ACCOUNT_STATUS_BLOCKED,
  IS_FINGERPRINT_ENABLE,
  showToast,
  FCM_TOKEN,
} from "../../../Helper/constants";
import { actionTypes } from "../../../Redux/actionTypes";
import {
  VERIFY_PHONE_URL,
  VALIDATE_PHONE_CODE,
  VERIFY_EMAIL_URL,
  VERIFY_REFERRAL_URL,
  SIGN_UP_URL,
  CREATE_PASSWORD_URL,
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  FORGOT_PASSWORD_VERIFY_EMAIL_URL,
  UNLOCK_ACCOUNT_URL,
  VERIFY_UNLOCK_ACCOUNT_URL,
  UNLOCK_ACCOUNT_SAVE_PASSWORD_URL,
  FORGOT_PASSWORD_RESET_URL,
  PROFILE_URL,
  REACTIVATE_ACCOUNT_URL,
} from "../../../Redux/Urls";
import { setCredentials } from "../../../Helper/fingerprintLogin";
Axios.defaults.timeout = 1000;

import {
  dispatchError,
  dispatchErrorWithoutMessage,
  NoInternetMsg,
} from "../../../Redux/helper";
import { getData, storeData } from "../../../Helper/SzizleStorage";

export const loginSetup = async (user, access_token, dispatch) => {
  dispatch({
    type: actionTypes.LOGINED_USER,
    access_token,
    user,
  });
};

export const profileRequest = ({ access_token, onSuccess, onError }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PROFILE_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(PROFILE_URL, config);
      console.log(response);
      const {
        data: {
          data: {
            user,
            user: { biometric_login },
          },
          message,
        },
      } = response;

      if (biometric_login) {
        storeData(IS_FINGERPRINT_ENABLE, true);
      }
      await loginSetup(user, access_token, dispatch);
      dispatch({
        type: actionTypes.PROFILE_SUCCESS,
      });

      if (onSuccess) onSuccess(user);
    } catch (error) {
      console.log(error);
      if (
        error.request.responseText !== NoInternetMsg &&
        error.response.status === 401
      ) {
        if (onError) onError();
      }

      dispatchError(error, actionTypes.PROFILE_FAIL, dispatch);
    }
  };
};

export const logout = ({ onSuccess }) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    if (onSuccess) onSuccess();
  };
};

export const loginRequest = ({ email, password, onSuccess, onError }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.LOGIN_USER_LOADING,
      });

      const fcm_token = await getData(FCM_TOKEN);

      console.log("fcm_token", fcm_token);

      const response = await Axios.post(LOGIN_URL, {
        email,
        password,
        fcm_token,
      });
      console.log("login response", response);
      const {
        data: {
          data: {
            user,
            user: { biometric_login },
            access_token,
          },
          message,
        },
      } = response;

      if (biometric_login) {
        storeData(IS_FINGERPRINT_ENABLE, true);
      }

      await setCredentials(email, password);
      await loginSetup(user, access_token, dispatch);

      // showToast(message);
      dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
      });

      if (onSuccess) onSuccess(user);
    } catch (error) {
      console.log(error.response);
      if (error.request.responseText !== NoInternetMsg && onError) {
        const {
          response: {
            data: { data, message },
          },
        } = error;
        console.log(error);
        onError(data, message);
        // const { attempts_left, status } = data;
        // if (status === ACCOUNT_STATUS_BLOCKED) {
        //   dispatchError(error, actionTypes.LOGIN_USER_FAIL, dispatch);
        //   return;
        // }
      }
      dispatchErrorWithoutMessage(error, actionTypes.LOGIN_USER_FAIL, dispatch);
    }
  };
};

export const unlockAccountSavePassRequest = ({
  email,
  password,
  password_confirmation,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SAVE_PASSWORD_UNLOCK_ACCOUNT_LOADING,
      });
      const response = await Axios.post(UNLOCK_ACCOUNT_SAVE_PASSWORD_URL, {
        email,
        password_confirmation,
        password,
      });

      console.log("verify phone response", response);
      const {
        data: {
          data: {
            user: { full_name },
            access_token,
          },
          message,
        },
      } = response;
      dispatch({
        type: actionTypes.SAVE_PASSWORD_UNLOCK_ACCOUNT_SUCCESS,
      });
      showToast(message);
      // await loginSetup(user, access_token, dispatch);

      if (onSuccess) onSuccess(full_name);
    } catch (error) {
      dispatchError(
        error,
        actionTypes.SAVE_PASSWORD_UNLOCK_ACCOUNT_FAIL,
        dispatch
      );
    }
  };
};
export const newPasswordRequest = ({
  email,
  password,
  password_confirmation,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.NEW_PASSWORD_LOADING,
      });
      const fcm_token = await getData(FCM_TOKEN);

      const response = await Axios.post(FORGOT_PASSWORD_RESET_URL, {
        email,
        password_confirmation,
        password,
        fcm_token,
      });

      console.log("verify phone response", response);
      const {
        data: {
          data: { user, access_token },
          message,
        },
      } = response;
      dispatch({
        type: actionTypes.NEW_PASSWORD_SUCCESS,
      });
      // showToast(message);
      await loginSetup(user, access_token, dispatch);

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.NEW_PASSWORD_FAIL, dispatch);
    }
  };
};
export const verifyUnlockAccountRequest = ({
  email,
  activation_code,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.VERIFY_UNLOCK_ACCOUNT_LOADING,
      });
      const response = await Axios.post(VERIFY_UNLOCK_ACCOUNT_URL, {
        email,
        activation_code,
      });

      console.log("verify phone response", response);
      const {
        data: { message },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.VERIFY_UNLOCK_ACCOUNT_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.VERIFY_UNLOCK_ACCOUNT_FAIL, dispatch);
    }
  };
};
export const unlockAccountRequest = ({ email, onSuccess }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.UNLOCK_ACCOUNT_LOADING,
      });
      const response = await Axios.post(UNLOCK_ACCOUNT_URL, {
        email,
      });

      console.log("verify phone response", response);
      const {
        data: { message },
      } = response;
      // showToast(message);
      dispatch({
        type: actionTypes.UNLOCK_ACCOUNT_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.UNLOCK_ACCOUNT_FAIL, dispatch);
    }
  };
};
export const verifyReferralRequest = ({ used_referral_code, onSuccess }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.VERIFY_REFERRAL_LOADING,
      });
      const response = await Axios.post(VERIFY_REFERRAL_URL, {
        used_referral_code,
      });

      console.log("verify phone response", response);
      const {
        data: { message },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.VERIFY_REFERRAL_SUCCESS,
        used_referral_code,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.VERIFY_REFERRAL_FAIL, dispatch);
    }
  };
};
export const forgotPasswordVerifyRequest = ({
  email,
  activation_code,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.RESET_PASSWORD_LOADING,
      });
      const response = await Axios.post(FORGOT_PASSWORD_VERIFY_EMAIL_URL, {
        email,
        activation_code,
      });

      console.log("verify phone response", response);
      const {
        data: { message },
      } = response;
      // showToast(message);
      dispatch({
        type: actionTypes.RESET_PASSWORD_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.RESET_PASSWORD_FAIL, dispatch);
    }
  };
};
export const forgotPasswordRequest = ({ email, onSuccess }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_LOADING,
      });
      const response = await Axios.post(FORGOT_PASSWORD_URL, {
        email,
      });

      console.log("verify phone response", response);
      const {
        data: { message },
      } = response;
      dispatch({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.FORGOT_PASSWORD_FAIL, dispatch);
    }
  };
};

export const verifyPhoneRequest = ({ phone, onSuccess }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PHONE_VERIFICATION_LOADING,
      });
      const response = await Axios.post(VERIFY_PHONE_URL, {
        phone,
      });
      console.log("verify phone response", response);
      const {
        data: {
          data: { id },
          message,
        },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.PHONE_VERIFICATION_SUCCESS,
        id,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      dispatchError(error, actionTypes.PHONE_VERIFICATION_FAIL, dispatch);
    }
  };
};
export const validatePhoneCodeRequest = ({ id, code, onSuccess }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.VALIDATE_PHONE_CODE_LOADING,
      });
      const response = await Axios.post(VALIDATE_PHONE_CODE, {
        id,
        code,
      });

      console.log("validate phone code response", response);
      const {
        data: { message },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.VALIDATE_PHONE_CODE_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.VALIDATE_PHONE_CODE_FAIL, dispatch);
    }
  };
};

export const signUpRequest = (payload) => {
  const { first_name, last_name, email, phone, onSuccess } = payload;
  console.log(payload);
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SIGN_UP_LOADING,
      });
      const response = await Axios.post(SIGN_UP_URL, {
        first_name,
        last_name,
        phone,
        email,
      });

      console.log("validate phone code response", response);
      const {
        data: {
          data: { user, access_token },
          message,
        },
      } = response;
      // showToast(message);
      dispatch({
        type: actionTypes.SIGN_UP_SUCCESS,
      });
      await loginSetup(user, access_token, dispatch);

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.SIGN_UP_FAIL, dispatch);
    }
  };
};

export const createPasswordRequest = (payload) => {
  return async (dispatch) => {
    try {
      console.log("createPasswordRequest", payload);

      const { password, password_confirmation, email, id, onSuccess } = payload;
      dispatch({
        type: actionTypes.CREATE_PASSWORD_LOADING,
      });
      const fcm_token = await getData(FCM_TOKEN);

      const response = await Axios.post(CREATE_PASSWORD_URL, {
        password,
        password_confirmation,
        email,
        id,
        fcm_token,
      });

      console.log("validate phone code response", response);
      const {
        data: {
          data: { user, access_token },
          message,
        },
      } = response;

      // showToast(message);
      dispatch({
        type: actionTypes.CREATE_PASSWORD_SUCCESS,
      });
      await loginSetup(user, access_token, dispatch);

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.CREATE_PASSWORD_FAIL, dispatch);
    }
  };
};

export const emailVerificationRequest = ({
  email,
  activation_code,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.EMAIL_VERIFICATION_LOADING,
      });
      const response = await Axios.post(VERIFY_EMAIL_URL, {
        email,
        activation_code,
      });
      const {
        data: { message },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.EMAIL_VERIFICATION_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.EMAIL_VERIFICATION_FAIL, dispatch);
    }
  };
};

export const reactivateAccountRequest = ({
  email,
  password,
  new_password,
  new_password_again,
  onSuccess,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REACTIVATE_ACCOUNT_LOADING,
      });

      const response = await Axios.post(REACTIVATE_ACCOUNT_URL, {
        email,
        password,
        new_password,
        new_password_again,
      });

      console.log(response);
      const {
        data: { message },
      } = response;

      // showToast(message);
      dispatch({
        type: actionTypes.REACTIVATE_ACCOUNT_SUCCESS,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.REACTIVATE_ACCOUNT_FAIL, dispatch);
    }
  };
};

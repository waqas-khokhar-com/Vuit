import { actionTypes } from "../../../../Redux/actionTypes";
import Axios from "axios";
import {
  UPDATE_PROFILE_URL,
  UPDATE_PROFILE_PIC_URL,
  VERIFY_PHONE_URL,
  VALIDATE_PHONE_CODE,
} from "../../../../Redux/Urls";
import { showToast } from "../../../../Helper/constants";
import { dispatchError } from "../../../../Redux/helper";

export const validatePhoneCodeRequest = ({
  id: phoneId,
  code,
  onSuccess,
  access_token,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.PROFILE_PHONE_VERIFICATION_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(
        VALIDATE_PHONE_CODE,
        {
          id: phoneId,
          code,
        },
        config
      );
      console.log("verify phone response", response);
      const {
        data: {
          data: { user },
          message,
        },
      } = response;
      showToast(message);
      dispatch({
        type: actionTypes.PROFILE_PHONE_VERIFICATION_SUCCESS,
      });
      dispatch({
        type: actionTypes.LOGINED_USER,
        access_token,
        user,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      dispatchError(
        error,
        actionTypes.PROFILE_PHONE_VERIFICATION_FAIL,
        dispatch
      );
    }
  };
};

export const updateProfileRequest = ({
  first_name,
  last_name,
  phone,
  onSuccess,
  access_token,
}) => {
  return async (dispatch) => {
    console.log(phone);

    try {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(
        UPDATE_PROFILE_URL,
        {
          first_name,
          last_name,
          phone,
        },
        config
      );

      const {
        data: {
          data: { user },
          message,
        },
      } = response;
      console.log(message);
      showToast(message);
      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
      });
      dispatch({
        type: actionTypes.LOGINED_USER,
        access_token,
        user,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.UPDATE_PROFILE_FAIL, dispatch);
    }
  };
};
export const updateProfilePic = ({ onSuccess, access_token, image }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_PIC_LOADING,
      });
      let config = {
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(UPDATE_PROFILE_PIC_URL, image, config);

      const {
        data: {
          message,
          data: { user },
        },
      } = response;
      console.log(response);
      showToast(message);
      dispatch({
        type: actionTypes.UPDATE_PROFILE_PIC_SUCCESS,
      });

      dispatch({
        type: actionTypes.LOGINED_USER,
        access_token,
        user,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.UPDATE_PROFILE_PIC_FAIL, dispatch);
    }
  };
};

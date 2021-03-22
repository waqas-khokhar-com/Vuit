import { actionTypes } from "../../../../Redux/actionTypes";
import Axios from "axios";
import {
  BIOMETRIC_ENABLE_DISABLE_URL,
  DEACTIVATE_ACCOUNT_URL,
} from "../../../../Redux/Urls";
import { showToast } from "../../../../Helper/constants";
import { dispatchError } from "../../../../Redux/helper";

export const enableDisableBiometric = ({
  biometric_login,
  onSuccess,
  access_token,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.BIOMETRIC_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(
        BIOMETRIC_ENABLE_DISABLE_URL,
        {
          biometric_login,
        },
        config
      );

      console.log(response);
      const {
        data: { message },
      } = response;

      showToast(message);
      dispatch({
        type: actionTypes.BIOMETRIC_SUCCESS,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.BIOMETRIC_FAIL, dispatch);
    }
  };
};
export const deactivateAccountRequest = ({
  is_deactivate,
  onSuccess,
  access_token,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.DEACTIVATE_ACCOUNT_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(
        DEACTIVATE_ACCOUNT_URL,
        {
          is_deactivate,
        },
        config
      );

      console.log(response);
      const {
        data: { message },
      } = response;

      // showToast(message);
      dispatch({
        type: actionTypes.DEACTIVATE_ACCOUNT_SUCCESS,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.DEACTIVATE_ACCOUNT_FAIL, dispatch);
    }
  };
};

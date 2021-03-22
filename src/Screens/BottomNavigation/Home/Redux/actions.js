import { actionTypes } from "../../../../Redux/actionTypes";
import Axios from "axios";
import {
  CONFIRM_DOCUMENT_URL,
  HOME_URL,
  LEGAL_URL,
  UPDATE_PREFERENCES_URL,
} from "../../../../Redux/Urls";
import { showToast } from "../../../../Helper/constants";
import { dispatchError } from "../../../../Redux/helper";

export const homeRequest = ({ onSuccess, access_token }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.HOME_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(HOME_URL, config);
      console.log(response);
      const {
        data: { data },
      } = response;
      dispatch({
        type: actionTypes.HOME_SUCCESS,
        policies: data,
      });
      dispatch({
        type: actionTypes.UPLOAD_DOCUMENT_SUCCESS,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      dispatchError(error, actionTypes.HOME_FAIL, dispatch);
    }
  };
};
export const confirmDocumentRequest = ({ onSuccess, access_token, data }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.CONFIRM_DOCUMENT_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.post(
        CONFIRM_DOCUMENT_URL,
        { ...data },
        config
      );
      console.log(response);

      dispatch({
        type: actionTypes.CONFIRM_DOCUMENT_SUCCESS,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      dispatchError(error, actionTypes.CONFIRM_DOCUMENT_FAIL, dispatch);
    }
  };
};

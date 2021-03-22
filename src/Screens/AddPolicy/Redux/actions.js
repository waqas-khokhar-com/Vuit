import Axios from "axios";
import { showToast } from "../../../Helper/constants";
import { actionTypes } from "../../../Redux/actionTypes";
import { dispatchError } from "../../../Redux/helper";
import { UPLOAD_DOCUMENT_URL } from "../../../Redux/Urls";

export const uploadDocument = ({ formData, onSuccess, access_token }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.UPLOAD_DOCUMENT_LOADING,
      });
      let config = {
        headers: {
          "Content-Type": "multipart/form-data; ",
          Authorization: "Bearer " + access_token,
        },
      };

      console.log("formData", formData);

      const response = await Axios.post(UPLOAD_DOCUMENT_URL, formData, config);

      const {
        data: {
          data: { policy, policy_data },
        },
      } = response;

      const {
        data: { message },
      } = response;
      if (message !== "") showToast(message);
      dispatch({
        type: actionTypes.UPLOAD_DOCUMENT_SUCCESS,
        policy,
        policy_data,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error.response);
      dispatchError(error, actionTypes.UPLOAD_DOCUMENT_FAIL, dispatch);
    }
  };
};

import { actionTypes } from "../../../../Redux/actionTypes";
import Axios from "axios";
import { LEGAL_URL, UPDATE_PREFERENCES_URL } from "../../../../Redux/Urls";
import { showToast } from "../../../../Helper/constants";
import { dispatchError } from "../../../../Redux/helper";

export const legalRequest = ({ onSuccess, access_token }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.LEGAL_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(LEGAL_URL, config);
      console.log(response);
      const {
        data: { data },
      } = response;
      dispatch({
        type: actionTypes.LEGAL_SUCCESS,
        legal: data,
      });

      let privacy = data[0].url;
      let terms = data[1].url;
      if (onSuccess) onSuccess(privacy, terms);
    } catch (error) {
      dispatchError(error, actionTypes.LEGAL_FAIL, dispatch);
    }
  };
};

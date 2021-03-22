import {actionTypes} from "../../../../Redux/actionTypes";
import Axios from "axios";
import {CHANGE_PASSWORD_URL} from "../../../../Redux/Urls";
import {showToast} from "../../../../Helper/constants";
import {dispatchError} from "../../../../Redux/helper";

export const changePasswordRequest = ({
                                          current_password,
                                          password,
                                          password_confirmation,
                                      onSuccess,
                                      access_token
                                  }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            console.log(access_token)
            const response = await Axios.post(CHANGE_PASSWORD_URL, {
                password_confirmation,
                password,
                current_password,
            }, config);

            const {
                data: {
                    message,
                },
            } = response;
            console.log(message)
            showToast(message);
            dispatch({
                type: actionTypes.CHANGE_PASSWORD_SUCCESS,
            });

            if (onSuccess) onSuccess();
        } catch (error) {

            dispatchError(error, actionTypes.CHANGE_PASSWORD_FAIL, dispatch);
        }
    };
};
import {actionTypes} from "../../../../Redux/actionTypes";
import Axios from "axios";
import {UPDATE_PREFERENCES_URL} from "../../../../Redux/Urls";
import {showToast} from "../../../../Helper/constants";
import {dispatchError} from "../../../../Redux/helper";

export const updatePreferences = ({
                                      notify_on_news_and_updates,
                                      notify_on_policy_renewal,
                                      onSuccess,
                                      access_token
                                  }) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PREFERENCES_UPDATE_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            const response = await Axios.post(UPDATE_PREFERENCES_URL, {
                notify_on_policy_renewal,
                notify_on_news_and_updates,
            }, config);

            const {
                data: {
                    message,
                },
            } = response;
            console.log(message)
            showToast(message);
            dispatch({
                type: actionTypes.PREFERENCES_UPDATE_SUCCESS,
            });

            if (onSuccess) onSuccess();
        } catch (error) {

            dispatchError(error, actionTypes.PREFERENCES_UPDATE_FAIL, dispatch);
        }
    };
};
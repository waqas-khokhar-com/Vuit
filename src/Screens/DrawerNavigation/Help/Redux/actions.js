import {actionTypes} from "../../../../Redux/actionTypes";
import Axios from "axios";
import {CONTACT_US_URL, FAQ_URL, LEGAL_URL, UPDATE_PREFERENCES_URL} from "../../../../Redux/Urls";
import {showToast} from "../../../../Helper/constants";
import {dispatchError} from "../../../../Redux/helper";

export const faqRequest = ({onSuccess, access_token}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.FAQ_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            const response = await Axios.get(FAQ_URL, config);
            console.log(response)
            const {
                data: {
                    data
                },
            } = response;
            dispatch({
                type: actionTypes.FAQ_SUCCESS,
                faqList: data,
            });
            if (onSuccess) onSuccess(data.map(item => ({...item, isExpand: false})));
        } catch (error) {
            dispatchError(error, actionTypes.FAQ_FAIL, dispatch);
        }
    };
};

export const contactUsRequest = (payload) => {
    return async (dispatch) => {

        const {onSuccess, access_token, params} = payload;

        try {
            dispatch({
                type: actionTypes.CONTACT_US_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            console.log(params);
            const response = await Axios.post(CONTACT_US_URL, {...params}, config);
            console.log(response)
            const {
                data: {
                    data
                },
            } = response;
            dispatch({
                type: actionTypes.CONTACT_US_SUCCESS,
                faqList: data,
            });
            if (onSuccess) onSuccess(data.map(item => ({...item, isExpand: false})));
        } catch (error) {
            dispatchError(error, actionTypes.CONTACT_US_FAIL, dispatch);
        }
    };
};

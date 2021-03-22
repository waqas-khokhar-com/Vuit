import Axios from "axios";
import {actionTypes} from "../../../Redux/actionTypes";
import {ADD_POLICIES_URL, POLICY_TYPES_URL, TUTORIAL_PAGES_URL} from "../../../Redux/Urls";
import {IS_TUTORIAL_VISITED, showToast} from "../../../Helper/constants";
import {dispatchError} from "../../../Redux/helper";
import {storeData} from "../../../Helper/SzizleStorage";

export const policyTypesRequest = ({onSuccess, access_token}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.POLICY_TYPE_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            const response = await Axios.get(POLICY_TYPES_URL, config);

            console.log(response);
            const {data: {data}} = response;


            let dataArray = data.map((item) => {
                return ({...item, isSelected: false})
            });

            dispatch({
                type: actionTypes.POLICY_TYPE_SUCCESS,
                types: dataArray
            });

            if (onSuccess) onSuccess(dataArray);
        } catch (error) {
            dispatchError(error, actionTypes.POLICY_TYPE_FAIL, dispatch);
        }
    };
};


export const tutorialPagesRequest = ({onSuccess, access_token}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.TUTORIAL_PAGES_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            const response = await Axios.get(TUTORIAL_PAGES_URL, config);

            console.log(response);
            const {data: {data}} = response;
            const welcome = data[0];
            data.splice(0, 1);
            dispatch({
                type: actionTypes.TUTORIAL_PAGES_SUCCESS,
                pages: data
            });

            if (onSuccess) onSuccess(welcome);
        } catch (error) {
            dispatchError(error, actionTypes.TUTORIAL_PAGES_FAIL, dispatch);
        }
    };
};
export const addPoliciesRequest = ({onSuccess, access_token, policy_type}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.ADD_POLICIES_LOADING,
            });
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                },
            }
            console.log(policy_type)
            const response = await Axios.post(ADD_POLICIES_URL, {policy_type}, config);
            const {data: {message}} = response;

            console.log(response);
            await storeData(IS_TUTORIAL_VISITED, true);
            dispatch({
                type: actionTypes.ADD_POLICIES_SUCCESS,
            });
            showToast(message)
            if (onSuccess) onSuccess();
        } catch (error) {
            dispatchError(error, actionTypes.ADD_POLICIES_FAIL, dispatch);
        }
    };
};

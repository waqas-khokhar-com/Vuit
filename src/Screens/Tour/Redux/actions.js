import Axios from "axios";
import {actionTypes} from "../../../Redux/actionTypes";
import {POLICY_TYPES_URL, TOUR_PAGES_URL, TUTORIAL_PAGES_URL} from "../../../Redux/Urls";
import {showToast} from "../../../Helper/constants";
import {dispatchError} from "../../../Redux/helper";

export const tourPagesRequest = ({onSuccess}) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.TOUR_LOADING,
            });

            const response = await Axios.get(TOUR_PAGES_URL);

            console.log(response);
            const {data: {data}} = response;


            dispatch({
                type: actionTypes.TOUR_SUCCESS,
                pages: data
            });

            if (onSuccess) onSuccess(data);
        } catch (error) {
            dispatchError(error, actionTypes.TOUR_FAIL, dispatch);
        }
    };
};

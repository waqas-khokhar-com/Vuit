import Axios from "axios";
import { actionTypes } from "../../../../Redux/actionTypes";
import {
  NEWS_DELETE_URL,
  NEWS_READ_URL,
  NEWS_UPDATES_URL,
  NOTIFICATIONS_URL,
} from "../../../../Redux/Urls";
import { showToast } from "../../../../Helper/constants";
import { dispatchError } from "../../../../Redux/helper";
import { loginSetup } from "../../../Auth/Redux/actions";

export const notificationsRequest = ({
  onSuccess,
  access_token,
  user,
  onError,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.NEWS_UPDATES_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(NOTIFICATIONS_URL, config);

      console.log(response);
      const {
        data: {
          data,
          data: { news_and_updates_unread_count, alerts_unread_count },
        },
      } = response;
      console.log("notifications", data);

      user.notification.alerts =
        alerts_unread_count + news_and_updates_unread_count;
      await loginSetup(user, access_token, dispatch);

      dispatch({
        type: actionTypes.NEWS_UPDATES_SUCCESS,
        notifications: data,
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError();
      dispatchError(error, actionTypes.NEWS_UPDATES_FAIL, dispatch);
    }
  };
};
export const newsReadRequest = ({
  onSuccess,
  id,
  access_token,
  notifications,
  user,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.NEWS_READ_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(`${NEWS_READ_URL}/${id}`, config);

      console.log(response);
      const {
        data: {
          data: { unread_count },
        },
      } = response;
      const {
        alerts,
        news_and_updates_unread_count,
        news_and_updates,
        alerts_unread_count,
      } = notifications;
      let data = news_and_updates.map((item) => {
        let temp = item;
        const { id: itemId } = item;
        if (id === itemId) {
          temp.is_read = 1;
        }
        return temp;
      });

      user.notification.alerts = unread_count + alerts_unread_count;
      await loginSetup(user, access_token, dispatch);

      dispatch({
        type: actionTypes.NEWS_UPDATES_SUCCESS,
        notifications: {
          ...notifications,
          news_and_updates_unread_count: unread_count,
          news_and_updates: data,
        },
      });

      dispatch({
        type: actionTypes.NEWS_READ_SUCCESS,
      });

      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.log(error);
      dispatchError(error, actionTypes.NEWS_READ_FAIL, dispatch);
    }
  };
};
export const newsDeleteRequest = ({
  onSuccess,
  id,
  access_token,
  notifications,
  user,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.NEWS_DELETE_LOADING,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      const response = await Axios.get(`${NEWS_DELETE_URL}/${id}`, config);

      console.log(response);
      const {
        data: {
          data: { unread_count },
        },
      } = response;
      const {
        alerts,
        news_and_updates_unread_count,
        news_and_updates,
        alerts_unread_count,
      } = notifications;
      let data = news_and_updates.filter((item) => {
        let temp = item;
        const { id: itemId } = item;
        if (id !== itemId) return temp;
      });

      user.notification.alerts = unread_count + alerts_unread_count;
      await loginSetup(user, access_token, dispatch);

      dispatch({
        type: actionTypes.NEWS_UPDATES_SUCCESS,
        notifications: {
          ...notifications,
          news_and_updates_unread_count: unread_count,
          news_and_updates: data,
        },
      });

      dispatch({
        type: actionTypes.NEWS_DELETE_SUCCESS,
      });

      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.log(error);
      dispatchError(error, actionTypes.NEWS_DELETE_FAIL, dispatch);
    }
  };
};

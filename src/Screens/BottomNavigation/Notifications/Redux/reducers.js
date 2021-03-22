import { combineReducers } from "redux";
import { actionTypes } from "../../../../Redux/actionTypes";

const {
  NEWS_UPDATES_LOADING,
  NEWS_UPDATES_FAIL,
  NEWS_UPDATES_SUCCESS,
  NEWS_READ_LOADING,
  NEWS_READ_SUCCESS,
  NEWS_READ_FAIL,
  NEWS_DELETE_FAIL,
  NEWS_DELETE_LOADING,
  NEWS_DELETE_SUCCESS,
} = actionTypes;

const initialState = {
  status: false,
  code: 0,
  message: "Something happened please try again!",
  notifications: {
    alerts: [],
    news_and_updates: [],
    news_and_updates_unread_count: 0,
    alerts_unread_count: 0,
  },
};

const notification = (state = initialState, action) => {
  const { type: actionType, message, notifications } = action;

  switch (actionType) {
    case NEWS_UPDATES_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case NEWS_UPDATES_SUCCESS:
      return {
        ...state,
        notifications,
        isLoading: false,
      };

    case NEWS_UPDATES_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const notificationRead = (state = initialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case NEWS_READ_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case NEWS_READ_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case NEWS_READ_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};
const notificationDelete = (state = initialState, action) => {
  const { type: actionType, message } = action;

  switch (actionType) {
    case NEWS_DELETE_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case NEWS_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case NEWS_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        message,
      };
    default:
      return state;
  }
};

export default combineReducers({
  notification,
  notificationRead,
  notificationDelete,
});

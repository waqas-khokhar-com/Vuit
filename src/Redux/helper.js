import { showToast } from "../Helper/constants";

export const NoInternetMsg =
  'Unable to resolve host "szizle.developmentpreviews.com": No address associated with hostname';

export const dispatchError = (e, type, dispatch) => {
  console.log(e.response);
  let msg = "something is not working, please try again";
  try {
    console.log(e.request.status);

    switch (e.request.status) {
      case 0:
        msg = "No internet available, please try again";
        break;
      default:
        const {
          response: {
            data: { message },
          },
        } = e;
        msg = message;
        break;
    }

    showToast(msg);
    dispatch({
      type,
      error: msg,
    });
  } catch (error) {
    console.log(error.message);
    showToast(error.message);
    dispatch({
      type,
      error: msg,
    });
  }
};
export const dispatchErrorWithoutMessage = (e, type, dispatch) => {
  let msg = "something is not working, please try again";
  try {
    console.log(e.request.status);

    switch (e.request.status) {
      case 0:
        msg = "No internet available, please try again";
        break;
      default:
        const {
          response: {
            data: { message },
          },
        } = e;
        msg = message;
        break;
    }

    dispatch({
      type,
      error: msg,
    });
  } catch (error) {
    console.log(error.message);
    showToast(error.message);
    dispatch({
      type,
      error: msg,
    });
  }
};

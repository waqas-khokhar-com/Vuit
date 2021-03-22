import { createStore, applyMiddleware, combineReducers } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../Screens/Auth/Redux/reducer";
import { actionTypes } from "./actionTypes";
import { IS_ALREADY_LOGIN } from "../Helper/constants";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const authPersistConfig = {
  key: "authReducer",
  storage: AsyncStorage,
  whitelist: ["authData"],
};

const appReducer = combineReducers({
  authReducer: persistReducer(authPersistConfig, authReducer),
  ...reducers,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    // for all keys defined in your persistConfig(s)
    AsyncStorage.removeItem("persist:authReducer");
    AsyncStorage.removeItem(IS_ALREADY_LOGIN);
    console.log("logout called");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};

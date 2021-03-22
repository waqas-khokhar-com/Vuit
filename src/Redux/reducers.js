import { combineReducers } from "redux";
import preferencesReducer from "../Screens/DrawerNavigation/Preferences/Redux/reducers";
import securityReducer from "../Screens/DrawerNavigation/PrivacySecurity/Redux/reducers";
import tutorialReducer from "../Screens/Tutorial/Redux/reducers";
import profileReducer from "../Screens/DrawerNavigation/MyProfile/Redux/reducers";
import changePasswordReducer from "../Screens/DrawerNavigation/ChangePassword/Redux/reducers";
import tourPagesReducer from "../Screens/Tour/Redux/reducers";
import legalReducer from "../Screens/DrawerNavigation/Legal/Redux/reducers";
import homeReducer from "../Screens/BottomNavigation/Home/Redux/reducers";
import faqReducer from "../Screens/DrawerNavigation/Help/Redux/reducers";
import notificationReducer from "../Screens/BottomNavigation/Notifications/Redux/reducers";
import policyReducer from "../Screens/AddPolicy/Redux/reducers";

const reducers = {
  preferencesReducer,
  securityReducer,
  tutorialReducer,
  profileReducer,
  changePasswordReducer,
  tourPagesReducer,
  legalReducer,
  homeReducer,
  faqReducer,
  notificationReducer,
  policyReducer,
};
export default reducers;

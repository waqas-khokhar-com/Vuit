import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen1 from "../Screens/Auth/RegisterScreen1";
import RegisterScreen2 from "../Screens/Auth/RegisterScreen2";
import RegisterScreen3 from "../Screens/Auth/RegisterScreen3";
import RegisterScreen4 from "../Screens/Auth/RegisterScreen4";
import RegisterValidationScreen from "../Screens/Auth/RegisterValidationScreen";
import { routes } from "../Helper/strings";
import FingerprintLoginScreen from "../Screens/Auth/FingerprintLoginScreen";
import TourScreen from "../Screens/Tour/TourScreen";
import PhoneVerificationScreen from "../Screens/Auth/PhoneVerificationScreen";
import ForgotPasswordScreen from "../Screens/Auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../Screens/Auth/ResetPasswordScreen";
import NewPasswordScreen from "../Screens/Auth/NewPasswordScreen";
import ReactivatePasswordScreen from "../Screens/Auth/ReactivatePasswordScreen";
import AccountLockedScreen from "../Screens/Auth/AccountLockedScreen";
import AccountUnlockScreen from "../Screens/Auth/AccountUnlockScreen";
import UnlockNewPasswordScreen from "../Screens/Auth/UnlockNewPasswordScreen";
import PrivacyWebView from "../Screens/Auth/PrivacyWebView";

const Stack = createStackNavigator();
function AuthNavigation({ route }) {
  const { params } = route;
  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={
        params
          ? params.isVerified
            ? routes.LoginScreen
            : routes.TourScreen
          : routes.LoginScreen
      }
    >
      <Stack.Screen name={routes.TourScreen} component={TourScreen} />
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={routes.FingerprintLoginScreen}
        component={FingerprintLoginScreen}
      />
      <Stack.Screen name={routes.RegisterScreen1} component={RegisterScreen1} />
      <Stack.Screen name={routes.RegisterScreen2} component={RegisterScreen2} />
      <Stack.Screen name={routes.RegisterScreen3} component={RegisterScreen3} />
      <Stack.Screen name={routes.RegisterScreen4} component={RegisterScreen4} />
      <Stack.Screen name={routes.PrivacyWebView} component={PrivacyWebView} />
      <Stack.Screen
        name={routes.ReactivatePasswordScreen}
        component={ReactivatePasswordScreen}
      />
      <Stack.Screen
        name={routes.UnlockNewPasswordScreen}
        component={UnlockNewPasswordScreen}
      />
      <Stack.Screen
        name={routes.AccountUnlockScreen}
        component={AccountUnlockScreen}
      />
      <Stack.Screen
        name={routes.AccountLockedScreen}
        component={AccountLockedScreen}
      />
      <Stack.Screen
        name={routes.NewPasswordScreen}
        component={NewPasswordScreen}
      />
      <Stack.Screen
        name={routes.ResetPasswordScreen}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={routes.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={routes.PhoneVerificationScreen}
        component={PhoneVerificationScreen}
      />

      <Stack.Screen
        name={routes.RegisterValidationScreen}
        component={RegisterValidationScreen}
      />
    </Stack.Navigator>
  );
}
export default AuthNavigation;

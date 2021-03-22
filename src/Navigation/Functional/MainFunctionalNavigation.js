import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../../Helper/strings";
import { colors } from "../../Helper/colors";
import DrawerNavigation from "./DrawerNavigation";
import AddPolicyScreen from "../../Screens/AddPolicy/AddPolicyScreen";
import MyProfileScreen from "../../Screens/DrawerNavigation/MyProfile/MyProfileScreen";
import ChangePasswordScreen from "../../Screens/DrawerNavigation/ChangePassword/ChangePasswordScreen";
import AnalyticsDashboardScreen from "../../Screens/DrawerNavigation/AnalyticsDashboard/AnalyticsDashboardScreen";
import PreferencesScreen from "../../Screens/DrawerNavigation/Preferences/PreferencesScreen";
import PrivacySecurityScreen from "../../Screens/DrawerNavigation/PrivacySecurity/PrivacySecurityScreen";
import LegalScreen from "../../Screens/DrawerNavigation/Legal/LegalScreen";
import HelpScreen from "../../Screens/DrawerNavigation/Help/HelpScreen";
import FAQScreen from "../../Screens/DrawerNavigation/Help/FAQScreen";
import WriteToUsScreen from "../../Screens/DrawerNavigation/Help/WriteToUsScreen";
import SubscriptionScreen from "../../Screens/DrawerNavigation/Subscription/SubscriptionScreen";
import PaymentSuccessfulScreen from "../../Screens/DrawerNavigation/Subscription/PaymentSuccessfulScreen";
import AttachmentScreen from "../../Screens/BottomNavigation/Documents/AttachmentScreen";
import PolicyDetailScreen from "../../Screens/BottomNavigation/Home/PolicyDetailScreen";
import ImagePreview from "../../Screens/AddPolicy/ImagePreview";
import ProfilePhoneVerificationScreen from "../../Screens/DrawerNavigation/MyProfile/ProfilePhoneVerificationScreen";
import AlertWebViewScreen from "../../Screens/BottomNavigation/Notifications/AlertWebViewScreen";
const { white } = colors;

const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={routes.DrawerNavigation}
    >
      <Stack.Screen
        name={routes.DrawerNavigation}
        component={DrawerNavigation}
      />
      <Stack.Screen
        name={routes.SubscriptionScreen}
        component={SubscriptionScreen}
      />
      <Stack.Screen name={routes.AddPolicyScreen} component={AddPolicyScreen} />
      <Stack.Screen name={routes.ImagePreview} component={ImagePreview} />
      <Stack.Screen name={routes.MyProfileScreen} component={MyProfileScreen} />
      <Stack.Screen
        name={routes.AlertWebViewScreen}
        component={AlertWebViewScreen}
      />
      <Stack.Screen
        name={routes.ProfilePhoneVerificationScreen}
        component={ProfilePhoneVerificationScreen}
      />
      <Stack.Screen name={routes.LegalScreen} component={LegalScreen} />
      <Stack.Screen name={routes.HelpScreen} component={HelpScreen} />
      <Stack.Screen name={routes.FAQScreen} component={FAQScreen} />
      <Stack.Screen name={routes.WriteToUsScreen} component={WriteToUsScreen} />
      <Stack.Screen
        name={routes.PolicyDetailScreen}
        component={PolicyDetailScreen}
      />
      <Stack.Screen
        name={routes.AttachmentScreen}
        component={AttachmentScreen}
      />
      <Stack.Screen
        name={routes.PaymentSuccessfulScreen}
        component={PaymentSuccessfulScreen}
      />
      <Stack.Screen
        name={routes.PrivacySecurityScreen}
        component={PrivacySecurityScreen}
      />
      <Stack.Screen
        name={routes.PreferencesScreen}
        component={PreferencesScreen}
      />
      <Stack.Screen
        name={routes.AnalyticsDashboardScreen}
        component={AnalyticsDashboardScreen}
      />
      <Stack.Screen
        name={routes.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default Main;

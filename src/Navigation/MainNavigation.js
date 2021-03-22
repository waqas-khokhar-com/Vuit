import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Screens/Splash/SplashScreen";
import AuthNavigation from "./AuthNavigation";
import MainFunctionalNavigation from "./Functional/MainFunctionalNavigation";
import { routes } from "../Helper/strings";
import CongratulationScreen from "../Screens/Auth/CongratulationScreen";
import TutorialNavigation from "./TutorialNavigation";
import WelcomeScreen from "../Screens/Welcome/WelcomeScreen";
import CheckList from "../Screens/Tutorial/CheckList";

const Stack = createStackNavigator();
function MainNavigation() {
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
  }, []);

  return (
    <Stack.Navigator headerMode="none" initialRouteName={routes.SplashScreen}>
      <Stack.Screen name={routes.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={routes.AuthNavigation} component={AuthNavigation} />
      <Stack.Screen name={routes.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={routes.CheckList} component={CheckList} />

      <Stack.Screen
        name={routes.TutorialNavigation}
        component={TutorialNavigation}
      />
      <Stack.Screen
        name={routes.MainFunctionalNavigation}
        component={MainFunctionalNavigation}
      />
      <Stack.Screen
        name={routes.CongratulationScreen}
        component={CongratulationScreen}
      />
    </Stack.Navigator>
  );
}
export default MainNavigation;

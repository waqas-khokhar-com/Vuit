import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../Helper/strings";
import TutorialStep1 from "../Screens/Tutorial/TutorialStep1";
import TutorialStep2 from "../Screens/Tutorial/TutorialStep2";
import TutorialStep3 from "../Screens/Tutorial/TutorialStep3";
import CheckList from "../Screens/Tutorial/CheckList";
import WelcomeScreen from "../Screens/Welcome/WelcomeScreen";

const Stack = createStackNavigator();
function TutorialNavigation() {
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
  }, []);

  return (
    <Stack.Navigator headerMode="none" initialRouteName={routes.TutorialStep1}>
      <Stack.Screen name={routes.TutorialStep1} component={TutorialStep1} />
      <Stack.Screen name={routes.TutorialStep2} component={TutorialStep2} />
      <Stack.Screen name={routes.TutorialStep3} component={TutorialStep3} />
    </Stack.Navigator>
  );
}
export default TutorialNavigation;

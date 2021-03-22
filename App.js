import React, { useEffect } from "react";
import MainNavigation from "./src/Navigation/MainNavigation";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  useNavigation,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from "react-native-paper";
import merge from "deepmerge";
import { PersistGate } from "redux-persist/integration/react";
import { szizleFonts } from "./src/Helper/fonts";
import messaging from "@react-native-firebase/messaging";

import persist from "./src/Redux/store";
import { storeData } from "./src/Helper/SzizleStorage";
import { FCM_TOKEN } from "./src/Helper/constants";
import { Alert } from "react-native";

import notifee from "@notifee/react-native";

const { store, persistor } = persist();

const { NunitoRegular, NunitoSemiBold, NunitoLight, NunitoBold } = szizleFonts;

const fontConfig = {
  default: {
    regular: {
      fontFamily: NunitoRegular,
    },
    medium: {
      fontFamily: NunitoSemiBold,
    },
    light: {
      fontFamily: NunitoLight,
    },
    thin: {
      fontFamily: NunitoBold,
    },
  },
};

const CombinedDefaultTheme = merge(
  { ...PaperDefaultTheme },
  //   { ...PaperDefaultTheme, fonts: configureFonts(fontConfig) },
  NavigationDefaultTheme
);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  async function onDisplayNotification(data) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
      },
    });
  }

  async function saveToLocal(token) {
    await storeData(FCM_TOKEN, token);
  }
  messaging().registerDeviceForRemoteMessages();

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      onDisplayNotification();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        return saveToLocal(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveToLocal(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      saveToLocal(token);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

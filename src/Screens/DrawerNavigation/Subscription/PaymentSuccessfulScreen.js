import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { margins } from "../../../Helper/margins";
import { screenContainer } from "../../../Helper/styles";
import { textSizes } from "../../../Helper/textSizes";
import { routes } from "../../../Helper/strings";
import {
  Continue,
  PaymentSuccessful,
  AccountSuccessMessage,
} from "../../../Helper/constants";
import SubscriptionSuccessIcon from "../../../../assets/SubscriptionSuccessIcon";
import SubscriptionFailedIcon from "../../../../assets/SubscriptionFailedIcon";
import SzizleText34 from "../../../Components/Texts/SzizleText34";
import SzizleText17 from "../../../Components/Texts/SzizleText17";
import { StackActions } from "@react-navigation/native";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import SzizleText24 from "../../../Components/Texts/SzizleText24";
import { szizleFonts } from "../../../Helper/fonts";
import { colors } from "../../../Helper/colors";
import { Button } from "react-native-paper";

const { doubleMargin, fullMargin } = margins;
const { DashboardScreen, MainFunctionalNavigation } = routes;
const { NunitoBold } = szizleFonts;
const { subscribeColor } = colors;
const PaymentSuccessfulScreen = ({ navigation }) => {
  const { navigate, goBack, dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <SubscriptionSuccessIcon />
        <SubscriptionFailedIcon />
        <SzizleText24
          title={PaymentSuccessful}
          style={{ marginTop: doubleMargin, fontFamily: NunitoBold }}
        />
        <SzizleText17
          title={"Your payment of $216 was successfully completed"}
          style={{ marginTop: fullMargin, textAlign: "center" }}
        />
      </View>
      <View
        style={{
          marginTop: doubleMargin + doubleMargin,
          marginHorizontal: doubleMargin,
        }}
      >
        <SzizleButton
          backgroundColor={subscribeColor}
          title={Continue}
          buttonWidth="60%"
          onPress={() =>
            navigationDispatcher(replace(MainFunctionalNavigation))
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PaymentSuccessfulScreen;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { margins } from "../../Helper/margins";
import { screenContainer } from "../../Helper/styles";
import { textSizes } from "../../Helper/textSizes";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import { routes } from "../../Helper/strings";
import {
  Congratulations,
  AccountSuccessMessage,
  Next,
} from "../../Helper/constants";
import CongratulationIcon from "../../../assets/CongratulationIcon";
import SzizleText34 from "../../Components/Texts/SzizleText34";
import SzizleText17 from "../../Components/Texts/SzizleText17";
import { StackActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const { doubleMargin, fullMargin } = margins;
const { WelcomeScreen } = routes;

const CongratulationScreen = ({ navigation }) => {
  const { navigate, goBack, dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* <CongratulationIcon /> */}
      <LottieView
        source={require("../../../assets/LottieResources/checkmar.json")}
        autoPlay={true}
        loop={false}
        autoSize={true}
      />
      <SzizleText34
        title={Congratulations}
        style={{ marginTop: doubleMargin }}
      />
      <SzizleText17
        title={AccountSuccessMessage}
        style={{
          marginTop: fullMargin,
          marginHorizontal: doubleMargin,
          textAlign: "center",
        }}
      />
      <View style={{ marginTop: doubleMargin + doubleMargin }}>
        <SzizleButton
          title={Next}
          onPress={() => navigationDispatcher(replace(WelcomeScreen))}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CongratulationScreen;

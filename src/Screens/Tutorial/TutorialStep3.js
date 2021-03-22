import React, { useEffect, useState } from "react";
import {View, StatusBar, StyleSheet, SafeAreaView} from "react-native";
import { StackActions } from "@react-navigation/native";
import { screenContainer } from "../../Helper/styles";
import { routes, insuranceLabels } from "../../Helper/strings";
import { colors } from "../../Helper/colors";
import SzizleText16 from "../../Components/Texts/SzizleText16";
import SzizleText22 from "../../Components/Texts/SzizleText22";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  QuickTutorialStep3Title,
  Done,
  ChooseFromGallery,
  ClickToScanPolicies,
} from "./../../Helper/constants";
import ScanOrUploadDocument from "./../../../assets/InsuranceIcons/ScanOrUploadDocument";
import { styles } from "./styles";
import ScanIcon from "../../../assets/InsuranceIcons/ScanIcon";
import CaptureWithArrowIcon from "../../../assets/CaptureWithArrowIcon";
import GallerWithArrowIcon from "../../../assets/GallerWithArrowIcon";

const { fullMargin, halfMargin, doubleMargin } = margins;
const { NunitoBold } = szizleFonts;
const { insideContainer } = styles;
const { white, gray } = colors;
const {} = insuranceLabels;
const { CheckList } = routes;
const TutorialStep3 = ({ navigation }) => {
  const { textStyle } = customStyles;
  const { dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      <View style={[screenContainer, {paddingHorizontal: fullMargin, paddingVertical: fullMargin}]}>
        <SzizleText22
          title={QuickTutorialStep3Title}
          style={{
            fontFamily: NunitoBold,
            textAlign: "center",
          }}
        />
        <View style={insideContainer}>
          <View style={{ alignItems: "center", paddingTop: halfMargin }}>
            <ScanIcon width="200" height="200" />
            <SzizleText16 title={ClickToScanPolicies} style={textStyle} />
            <View
              style={{
                flexDirection: "row",
                paddingStart: 30.71,
              }}
            >
              <CaptureWithArrowIcon width="90" height="90" />
              <View
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: -60,
                }}
              >
                <GallerWithArrowIcon width="60" height="60" />
              </View>
            </View>
            <SzizleText16 title={ChooseFromGallery} style={textStyle} />
          </View>
        </View>
        <View style={{ marginTop: fullMargin }}>
          <SzizleButton
            title={Done}
            buttonWidth="60%"
            onPress={() => navigationDispatcher(replace(CheckList))}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const customStyles = StyleSheet.create({
  textStyle: {
    fontFamily: NunitoBold,
    color: gray,
    textAlign: "center",
    marginHorizontal: fullMargin,
    marginTop: fullMargin,
  },
});
export default TutorialStep3;

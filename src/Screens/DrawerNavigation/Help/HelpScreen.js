import React, { useEffect, useState } from "react";
import { View, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { Help } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import Card from "../../../Components/ShadowCards/Card";
import SzizleText15 from "../../../Components/Texts/SzizleText15";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WriteToUsIcon from "./../../../../assets/WriteToUsIcon";
import HelpIcon from "./../../../../assets/DrawerIcons/HelpIcon";

const { FAQScreen, WriteToUsScreen } = routes;
const { primary, black } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const HelpScreen = ({ navigation }) => {
  const { cardLabelStyle, cardContainer } = styles;
  const { navigate, goBack } = navigation;

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Help}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={screenContainer}>
        <Card
          onPress={() => {
            navigate(FAQScreen);
          }}
        >
          <View style={cardContainer}>
            <View
              style={{
                flex: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <HelpIcon width="30" height="30" color={black} />

              <SzizleText15 title="FAQ's " style={cardLabelStyle} />
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <MaterialCommunityIcons name="chevron-right" size={40} />
            </View>
          </View>
        </Card>
        <Card
          onPress={() => {
            navigate(WriteToUsScreen);
          }}
        >
          <View style={cardContainer}>
            <View
              style={{ flex: 8, flexDirection: "row", alignItems: "center" }}
            >
              <WriteToUsIcon width="30" height="30" color={black} />

              <SzizleText15 title="Write To Us" style={cardLabelStyle} />
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <MaterialCommunityIcons name="chevron-right" size={40} />
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardLabelStyle: {
    fontFamily: NunitoBold,
    paddingVertical: halfMargin,
    marginStart: fullMargin,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingStart: halfMargin,
    marginVertical: halfMargin,
  },
});
export default HelpScreen;

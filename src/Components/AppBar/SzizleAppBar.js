import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet, View } from "react-native";
import { colors } from "../../Helper/colors";
import { radius } from "../../Helper/radius";
import { szizleFonts } from "../../Helper/fonts";
import SzizleText17 from "../Texts/SzizleText17";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const { white, transparent } = colors;

const { regularRadius } = radius;
const { NunitoBold } = szizleFonts;
const { gray } = colors;

const SzizleAppBar = (props) => {
  const { onBackPress, style, backButtonColor, title } = props;
  const { appbar, textStyle, titleStyle } = styles;
  return (
    <Appbar style={[appbar, style]}>
      <Appbar.BackAction
        onPress={onBackPress}
        color={backButtonColor ? backButtonColor : gray}
      />
      <View style={titleStyle}>
        <SzizleText17 title={title} style={textStyle} />
      </View>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: white,
    fontFamily: NunitoBold,
  },
  titleStyle: {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    backgroundColor: white,
  },
});

export default SzizleAppBar;

import React from "react";
import { View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { colors } from "../Helper/colors";
import { INPUT_HEIGHT } from "../Helper/constants";
import { szizleFonts } from "../Helper/fonts";
import { margins } from "../Helper/margins";
import SzizleText12 from "./Texts/SzizleText12";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { NunitoBold, NunitoSemiBold } = szizleFonts;
const { halfMargin } = margins;
const { red, black, primary } = colors;
const TextInput = (props) => {
  const {
    title,
    fontSize,
    mandatory,
    multiline,
    backgroundColor,
    paddingHorizontal,
  } = props;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          marginTop: halfMargin,
        }}
      >
        {title !== undefined && (
          <SzizleText12 title={title} style={{ fontFamily: NunitoBold }} />
        )}
        {mandatory && <SzizleText12 title="*" style={{ color: red }} />}
      </View>
      <Input
        autoCapitalize="none"
        autoCompleteType="off"
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "transparent",
          fontSize: RFValue(fontSize),
          height: multiline ? "" : INPUT_HEIGHT,
          marginTop: halfMargin / 2,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
        }}
        theme={{
          colors: {
            text: black,
            primary: primary,
            accent: primary,
          },
        }}
        {...props}
      />
    </View>
  );
};
export default TextInput;

import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";
import { Button } from "react-native-paper";
import { radius } from "../../Helper/radius";
import { margins } from "../../Helper/margins";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { NunitoBold } = szizleFonts;
const { size20 } = textSizes;
const { black, primary, lightGray10 } = colors;
const { smallRadius, largeRadius } = radius;
const { halfMargin } = margins;

const SzizleButton = (props) => {
  const { title, buttonWidth, backgroundColor, isLoading, disabled } = props;

  const width = buttonWidth ? buttonWidth : 55.55;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button
        loading={isLoading}
        mode="contained"
        labelStyle={{ fontSize: size20, fontFamily: NunitoBold }}
        style={{
          width: wp(width),
          height: hp(5.02),
          justifyContent: "center",
          borderBottomRightRadius: largeRadius,
          borderTopLeftRadius: largeRadius,
          borderTopRightRadius: smallRadius,
          borderBottomLeftRadius: smallRadius,
          backgroundColor: !disabled
            ? backgroundColor
              ? backgroundColor
              : primary
            : lightGray10,
          marginVertical: halfMargin,
        }}
        uppercase={false}
        {...props}
      >
        {title}
      </Button>
    </View>
  );
};
export default SzizleButton;

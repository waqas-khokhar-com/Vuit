import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";

const { NunitoRegular, NunitoBold } = szizleFonts;
const { size24 } = textSizes;
const { black } = colors;

const SzizleTitleText = (props) => {
  const { title } = props;
  return (
    <Text
      style={[
        {
          fontFamily: NunitoBold,
          fontSize: size24,
          color: black,
        },
        props.style,
      ]}
    >
      {title}
    </Text>
  );
};
export default SzizleTitleText;

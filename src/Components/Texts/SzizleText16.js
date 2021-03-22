import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";

const { NunitoRegular } = szizleFonts;
const { size16 } = textSizes;
const { black } = colors;

const SzizleText16 = (props) => {
  const { title } = props;
  return (
    <Text
      style={[
        {
          fontFamily: NunitoRegular,
          fontSize: size16,
          color: black,
        },
        props.style,
      ]}
    >
      {title}
    </Text>
  );
};
export default SzizleText16;

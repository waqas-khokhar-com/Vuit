import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";

const { NunitoRegular } = szizleFonts;
const { size18 } = textSizes;
const { black } = colors;

const SzizleText17 = (props) => {
  const { title } = props;
  return (
    <Text
      style={[
        {
          fontFamily: NunitoRegular,
          fontSize: size18,
          color: black,
        },
        props.style,
      ]}
    >
      {title}
    </Text>
  );
};
export default SzizleText17;

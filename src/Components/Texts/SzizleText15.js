import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";

const { NunitoRegular } = szizleFonts;
const { size15 } = textSizes;
const { black } = colors;

const SzizleText15 = (props) => {
  const { title, numberOfLines } = props;
  return (
    <Text
      style={[
        {
          fontFamily: NunitoRegular,
          fontSize: size15,
          color: black,
        },
        props.style,
      ]}
      numberOfLines={numberOfLines}
    >
      {title}
    </Text>
  );
};
export default SzizleText15;

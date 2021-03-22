import React from "react";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { textSizes } from "../../Helper/textSizes";

const { NunitoBold } = szizleFonts;
const { size22 } = textSizes;
const { fullMargin } = margins;
const { primary } = colors;

const SzizleTextButton = (props) => {
  const { title, onPress, labelColor, labelSize } = props;
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        width: "40%",
        marginTop: fullMargin,
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[
          {
            fontFamily: NunitoBold,
            fontSize: labelSize ? labelSize : size22,
            color: labelColor ? labelColor : primary,
          },
          props.style,
        ]}
      >
        {title}
      </Text>
    </TouchableRipple>
  );
};
export default SzizleTextButton;

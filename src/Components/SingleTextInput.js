import React from "react";
import { View, Text, TextInput as Input } from "react-native";
import { colors } from "../Helper/colors";
import { szizleFonts } from "../Helper/fonts";
import { margins } from "../Helper/margins";
import { radius } from "../Helper/radius";
import { textSizes } from "../Helper/textSizes";

const { NunitoBold } = szizleFonts;
const { size16 } = textSizes;
const { mediumRadius } = radius;
const { gray } = colors;
const { fullMargin, halfMargin, mediumMargin } = margins;

const SingleTextInput = (props) => {
  const { label, value } = props;
  return (
    <Input
      label={label}
      maxLength={1}
      keyboardType="numeric"
      style={{
        flex: 1,
        borderColor: gray,
        fontSize: size16,
        fontFamily: NunitoBold,
        borderWidth: 1,
        borderRadius: mediumRadius,
        textAlign: "center",
        paddingVertical: fullMargin,
        paddingHorizontal: mediumMargin,
        marginHorizontal: halfMargin,
      }}
      value={value}
      {...props}
    />
  );
};
export default SingleTextInput;

import React from "react";
import { View, Pressable } from "react-native";
import { colors } from "../Helper/colors";
import { iAgreeToVuit } from "../Helper/constants";
import { szizleFonts } from "../Helper/fonts";
import { margins } from "../Helper/margins";
import { radius } from "../Helper/radius";
import { textSizes } from "../Helper/textSizes";
import CheckBox from "./CheckBox";
import SzizleText13 from "./Texts/SzizleText13";

const { NunitoBold } = szizleFonts;
const { size16 } = textSizes;
const { mediumRadius } = radius;
const { gray, primary } = colors;
const { fullMargin, halfMargin, mediumMargin } = margins;

const CheckboxWithTitle = (props) => {
  const { title, isCheck, onCheck, onDetail } = props;
  return (
    <View
      style={{
        marginTop: halfMargin,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CheckBox isCheck={isCheck} onCheck={onCheck} />
      <SzizleText13
        title={iAgreeToVuit}
        style={{
          marginStart: halfMargin,
        }}
      />
      <Pressable onPress={onDetail}>
        <SzizleText13
          title={title}
          style={{
            textDecorationLine: "underline",
            color: primary,
          }}
        />
      </Pressable>
    </View>
  );
};
export default CheckboxWithTitle;

import React from "react";
import { View, Text, Image } from "react-native";
import { margins } from "../Helper/margins";
import { SvgUri } from "react-native-svg";
import HeaderLogo from "../../assets/HeaderLogo";
import Error from "../../assets/Error";
import SzizleText13 from "./Texts/SzizleText13";
import { LoginAttemptsLeft } from "./../Helper/constants";
import { colors } from "../Helper/colors";
const { doubleMargin, fullMargin, halfMargin } = margins;
const { primary } = colors;
const ValidationError = ({ message }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Error />
      <SzizleText13
        title={message}
        style={{ marginStart: halfMargin, color: primary }}
      />
    </View>
  );
};
export default ValidationError;

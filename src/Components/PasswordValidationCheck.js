import React from "react";
import { View } from "react-native";
import Checked from "../../assets/Checked";
import Unchecked from "../../assets/Unchecked";
import { margins } from "../Helper/margins";
import SzizleText12 from "./Texts/SzizleText12";

const { fullMargin, halfMargin, mediumMargin } = margins;

const PasswordValidationCheck = (props) => {
  const { title, isCheck } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {isCheck === true && <Checked />}
      {isCheck === false && <Unchecked />}
      <SzizleText12
        title={title}
        style={{ marginStart: halfMargin, color: "#27303D" }}
      />
    </View>
  );
};
export default PasswordValidationCheck;

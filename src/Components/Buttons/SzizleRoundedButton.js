import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { textSizes } from "../../Helper/textSizes";
import { Button } from "react-native-paper";
import { radius } from "../../Helper/radius";
import { margins } from "../../Helper/margins";

const { NunitoBold } = szizleFonts;
const { size20 } = textSizes;
const { black, primary, white } = colors;
const { doubleLargeRadius } = radius;
const { halfMargin } = margins;

const SzizleButton = (props) => {
  const { title, buttonWidth, labelSize, backgroundColor } = props;

  const width = buttonWidth ? buttonWidth : "100%";

  return (
    <View style={{ alignItems: "center" }}>
      <Button
        mode="contained"
        labelStyle={{
          fontSize: labelSize ? labelSize : size20,
          color: backgroundColor === primary ? white : primary,
        }}
        style={{
          width: width,
          borderRadius: doubleLargeRadius,
          backgroundColor: backgroundColor ? backgroundColor : primary,
          marginVertical: halfMargin,
          shadowColor: black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
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

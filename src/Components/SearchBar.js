import React from "react";
import { View, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { colors } from "../Helper/colors";
import { INPUT_HEIGHT } from "../Helper/constants";
import { szizleFonts } from "../Helper/fonts";
import { margins } from "../Helper/margins";
import { radius } from "../Helper/radius";
import { textSizes } from "../Helper/textSizes";

const { NunitoRegular, NunitoBold } = szizleFonts;
const { halfMargin, fullMargin } = margins;
const { regularRadius } = radius;
const { size13 } = textSizes;
const { red, black, primary, white, transparent } = colors;
const SearchBar = (props) => {
  const {} = props;

  console.log(props.value);

  return (
    <Input
      underlineColor={transparent}
      style={{
        backgroundColor: white,
        borderRadius: regularRadius,
        borderTopRightRadius: regularRadius,
        borderTopLeftRadius: regularRadius,
        fontSize: size13,
        height: INPUT_HEIGHT,
        shadowColor: black,
        marginVertical: halfMargin,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      left={
        <Input.Icon name="magnify" forceTextInputFocus={true} color={primary} />
      }
      theme={{
        colors: {
          text: black,
          primary: primary,
          accent: primary,
        },
      }}
      {...props}
    />
  );
};
export default SearchBar;

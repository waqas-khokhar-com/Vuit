import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card as PaperCard, TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
const { doubleMargin, fullMargin, halfMargin } = margins;
const { gray, black } = colors;
const { regularRadius } = radius;
const Card = (props) => {
  const { image, size, children, style } = props;
  const styles = StyleSheet.create({
    cardStyle: {
      borderRadius: regularRadius,

      marginVertical: halfMargin,
      shadowColor: black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    insideContainer: {
      borderRadius: regularRadius,
      padding: fullMargin,
    },
  });

  const { cardStyle, insideContainer } = styles;
  return (
    <PaperCard style={[cardStyle, style]}>
      <TouchableRipple  borderless={true}  {...props} style={insideContainer}>
        {children}
      </TouchableRipple>
    </PaperCard>
  );
};

export default Card;

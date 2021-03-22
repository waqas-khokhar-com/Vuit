import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import SzizleText12 from "../Texts/SzizleText12";
import SzizleText15 from "../Texts/SzizleText15";
import SzizleText17 from "../Texts/SzizleText17";
import PdfIcon from "./../../../assets/PdfIcon";
const { halfMargin, fullMargin } = margins;
const { white, black, gray, lightGray, selectedColor, green, primary } = colors;
const { doubleLargeRadius } = radius;
const { NunitoBold } = szizleFonts;
const DocumentItem = ({ onItemPress, onLongPress, item }) => {
  const { container, insideContainer, bottomBorder } = styles;
  const { name, isSelected } = item;

  return (
    <TouchableRipple
      onLongPress={onLongPress}
      onPress={onItemPress}
      style={[
        container,
        { backgroundColor: isSelected ? selectedColor : white },
      ]}
    >
      <View style={{ marginHorizontal: fullMargin }}>
        <View style={insideContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <PdfIcon width="45" height="50" />
            <View style={{ marginStart: fullMargin }}>
              <SzizleText15 title={name} style={{ fontFamily: NunitoBold }} />
              <SzizleText12 title="Added on 10/12/2019" />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: halfMargin,
                }}
              >
                <View
                  style={{
                    backgroundColor: green,
                    height: 15,
                    width: 15,
                    borderRadius: 50,
                    marginEnd: halfMargin,
                  }}
                />
                <SzizleText12 title="Expires in 32 days" />
              </View>
            </View>
          </View>
          <View
            style={{
              height: 90 - fullMargin * 2,
              justifyContent: "space-between",
            }}
          >
            <SzizleText12 title="10/10/2020" style={{ color: gray }} />
            <SzizleText12
              title="Upload now"
              style={{ color: primary, fontFamily: NunitoBold }}
            />
          </View>
        </View>
        <View style={bottomBorder} />
      </View>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: fullMargin,
    paddingTop: fullMargin,
    height: 100,
  },
  insideContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBorder: {
    borderBottomColor: lightGray,
    borderBottomWidth: 0.5,
    marginTop: fullMargin,
  },
});
export default DocumentItem;

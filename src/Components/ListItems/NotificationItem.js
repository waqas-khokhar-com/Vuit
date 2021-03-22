import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import SzizleText15 from "../Texts/SzizleText15";
import NewsUpdateIcon from "../../../assets/NewsUpdateIcon";
import HTML from "react-native-render-html";
import { textSizes } from "../../Helper/textSizes";
import { widthPercentageToDP } from "react-native-responsive-screen";

const { halfMargin, fullMargin } = margins;
const { white, black, gray, lightGray, selectedColor } = colors;
const { doubleLargeRadius } = radius;
const { NunitoBold, NunitoRegular } = szizleFonts;
const { size15 } = textSizes;

const NotificationItem = ({ onItemPress, onLongPress, item }) => {
  const { container, insideContainer, bottomBorder } = styles;
  const { content, is_read, featured_image } = item;

  return (
    <TouchableRipple
      onLongPress={onLongPress}
      onPress={onItemPress}
      style={container}
    >
      <View style={{ marginHorizontal: fullMargin }}>
        <View style={insideContainer}>
          {featured_image && (
            <Image
              resizeMode={"contain"}
              source={{ uri: featured_image }}
              style={{ width: 45, height: 45 }}
            />
          )}
          <View style={{ marginHorizontal: fullMargin }}>
            <HTML
              contentWidth={widthPercentageToDP(100)}
              source={{ html: content }}
              baseFontStyle={{
                fontSize: size15,
                flexWrap: "wrap",
                fontFamily: is_read === 1 ? NunitoRegular : NunitoBold,
              }}
            />

            {/* <SzizleText15
              numberOfLines={3}
              title={content}
              style={{
                flexWrap: "wrap",
                fontFamily: is_read === 1 ? NunitoRegular : NunitoBold,
              }}
            /> */}
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
    backgroundColor: white,
    paddingVertical: fullMargin,
    paddingEnd: fullMargin,
    paddingStart: halfMargin,
  },
  insideContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginEnd: fullMargin,
  },
});
export default NotificationItem;

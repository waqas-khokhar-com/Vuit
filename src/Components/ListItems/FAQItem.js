import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import SzizleText12 from "../Texts/SzizleText12";
import SzizleText14 from "../Texts/SzizleText14";
import PdfIcon from "../../../assets/PdfIcon";
import Card from "../ShadowCards/Card";
import SzizleText17 from "../Texts/SzizleText17";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SzizleText15 from "../Texts/SzizleText15";
import HTML from "react-native-render-html";
import { textSizes } from "../../Helper/textSizes";

const { halfMargin, fullMargin } = margins;
const { white, black, gray, lightGray, selectedColor } = colors;
const { doubleLargeRadius } = radius;
const { NunitoBold, NunitoRegular } = szizleFonts;
const { size15 } = textSizes;
const FAQItem = ({ onExpand, item }) => {
  const { container, insideContainer, bottomBorder } = styles;
  const { title, isExpand, content } = item;

  return (
    <Card onPress={onExpand}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SzizleText17 title={title} style={{ fontFamily: NunitoBold }} />
          <MaterialCommunityIcons
            name={isExpand ? "chevron-up" : "chevron-down"}
            size={30}
          />
        </View>
        {isExpand && (
          <View>
            <ScrollView contentContainerStyle={{ paddingVertical: fullMargin }}>
              <HTML
                source={{ html: content }}
                baseFontStyle={{
                  fontSize: size15,
                  flexWrap: "wrap",
                  fontFamily: NunitoRegular,
                }}
              />
              {/* <SzizleText15 title={content} /> */}
            </ScrollView>
          </View>
        )}
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: fullMargin,
    paddingTop: fullMargin,
  },
});
export default FAQItem;

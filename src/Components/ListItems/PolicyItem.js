import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { TapHereToUploadOrScanYourPolicy } from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import SzizleText14 from "../Texts/SzizleText14";
import Card from "../ShadowCards/Card";
import SzizleText17 from "../Texts/SzizleText17";

const { halfMargin, fullMargin } = margins;
const { lightGray, white, black } = colors;
const { doubleLargeRadius } = radius;
const { NunitoBold } = szizleFonts;
const PolicyItem = ({ onItemPress, onAddPolicy, item }) => {
  const { emptyView, policyItemLabelStyle } = styles;
  const { placeholder_text, title, icon, is_empty, detail } = item;
  console.log(item);

  return (
    <View>
      {is_empty && (
        <Card onPress={onAddPolicy}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                resizeMode={"contain"}
                source={{ uri: icon }}
                style={{ width: 60, height: 45 }}
              />
              <View style={{ flex: 1, marginBottom: halfMargin }}>
                <View style={emptyView} />
                <View style={emptyView} />
              </View>
            </View>
            <SzizleText14
              title={placeholder_text}
              style={policyItemLabelStyle}
            />
          </View>
        </Card>
      )}
      {!is_empty && (
        <Card onPress={onAddPolicy}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Image
                resizeMode={"contain"}
                source={{ uri: icon }}
                style={{ width: 60, height: 45 }}
              />
              <View style={{ flex: 1, marginHorizontal: fullMargin }}>
                <SzizleText17
                  title={title}
                  style={{ fontFamily: NunitoBold }}
                />
                {detail.map((item) => {
                  const { name, id, value } = item;
                  return (
                    <View
                      key={id}
                      style={{
                        flex: 1,
                        flexWrap: "wrap",
                        flexDirection: "row",
                        marginTop: halfMargin,
                      }}
                    >
                      <SzizleText14
                        title={name}
                        style={{
                          marginEnd: halfMargin,
                          flexWrap: "wrap",
                          fontFamily: NunitoBold,
                        }}
                      />
                      <SzizleText14 title={value} />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Card>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  emptyView: {
    backgroundColor: lightGray,
    height: 30,
    marginStart: fullMargin,
    marginVertical: halfMargin / 2,
  },
  policyItemLabelStyle: {
    fontFamily: NunitoBold,
    textAlign: "center",
  },
});
export default PolicyItem;

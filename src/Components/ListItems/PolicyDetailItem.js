import React from "react";
import { ScrollView, View } from "react-native";
import { margins } from "../../Helper/margins";
import Card from "../ShadowCards/Card";
import SzizleText17 from "../Texts/SzizleText17";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SzizleText15 from "../Texts/SzizleText15";

const { halfMargin, fullMargin } = margins;
const PolicyDetailItem = ({ onExpand, item }) => {
  const { name, isExpand, detail } = item;

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
          <SzizleText17 title={name} />
          <MaterialCommunityIcons
            name={isExpand ? "chevron-down" : "chevron-up"}
            size={30}
          />
        </View>
        {isExpand && (
          <View>
            <ScrollView contentContainerStyle={{ paddingVertical: fullMargin }}>
              <SzizleText15 title={detail} />
            </ScrollView>
          </View>
        )}
      </View>
    </Card>
  );
};
export default PolicyDetailItem;

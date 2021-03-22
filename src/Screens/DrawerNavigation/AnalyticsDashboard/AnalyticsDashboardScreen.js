import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { AnalyticsDashboard } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import { PieChart } from "react-native-chart-kit";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import SzizleText22 from "../../../Components/Texts/SzizleText22";
import { Picker } from "@react-native-picker/picker";
import Card from "../../../Components/ShadowCards/Card";

const { replace } = StackActions;
const {} = routes;
const { primary, gray, red, black, gray30 } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;
const data = [
  {
    name: "Home",
    population: 35,
    color: "#26E5D7",
    legendFontColor: black,
    legendFontSize: 15,
  },
  {
    name: "Car",
    population: 15,
    color: "#FF4773",
    legendFontColor: black,
    legendFontSize: 15,
  },
  {
    name: "Travel",
    population: 20,
    color: "#FFCD7C",
    legendFontColor: black,
    legendFontSize: 15,
  },
  {
    name: "Bike",
    population: 40,
    color: "#7F24FF",
    legendFontColor: black,
    legendFontSize: 15,
  },
];

const AnalyticsDashboardScreen = ({ navigation }) => {
  const { cardLabelStyle } = styles;
  const { navigate, goBack } = navigation;
  const [yearPicker, setYearPicker] = useState("Year");
  const [showAsPicker, setShowAsPicker] = useState("Percentage");

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={AnalyticsDashboard}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={screenContainer}>
        <SzizleText22
          title="Combined Annual Premium"
          style={{ fontFamily: NunitoBold, alignSelf: "center" }}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={yearPicker}
              onValueChange={(itemValue, itemIndex) => setYearPicker(itemValue)}
            >
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={showAsPicker}
              onValueChange={(itemValue, itemIndex) =>
                setShowAsPicker(itemValue)
              }
            >
              <Picker.Item label="Percentage" value="Percentage" />
              <Picker.Item label="Amount" value="Amount" />
            </Picker>
          </View>
        </View>
        <PieChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor={"population"}
        />
        <View
          style={{
            borderBottomColor: gray30,
            borderBottomWidth: 1,
            marginVertical: fullMargin,
          }}
        />
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SzizleText16 title="Renewals Due" style={cardLabelStyle} />
            <SzizleText16 title="5" style={cardLabelStyle} />
          </View>
        </Card>
        <Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <SzizleText16 title="Uploaded Policies" style={cardLabelStyle} />
            <SzizleText16 title="5" style={cardLabelStyle} />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardLabelStyle: {
    fontFamily: NunitoBold,
    paddingVertical: halfMargin,
  },
});
export default AnalyticsDashboardScreen;

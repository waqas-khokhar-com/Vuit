import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { PolicyDetails } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import PolicyDetailItem from "../../../Components/ListItems/PolicyDetailItem";

const { replace } = StackActions;
const {} = routes;
const { primary, black, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const PolicyDetailScreen = ({ navigation }) => {
  const {} = styles;
  const { navigate, goBack } = navigation;

  let [dataArray, setDataArray] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Policyholder Details",
      isExpand: true,
      detail:
        "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei.",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Frequently asked Q2?",
      isExpand: false,
      detail:
        "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei.",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Frequently asked Q3",
      isExpand: false,
      detail:
        "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei.",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      name: "Frequently asked Q4",
      isExpand: false,
      detail:
        "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei.",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      name: "Frequently asked Q5",
      isExpand: false,
      detail:
        "Lorem ipsum dolor sit amet, perfecto tractatos cu nec, at vim sint epicurei. Populo eligendi ut vim, at his utamur blandit oporteat. Usu esse conceptam eu, viderer officiis qualisque eos ei.",
    },
  ]);

  useEffect(() => {}, []);

  const renderItem = ({ item, index }) => {
    const { name, isExpand } = item;

    return (
      <PolicyDetailItem
        item={item}
        onExpand={() => {
          dataArray[index].isExpand = !isExpand;
          setDataArray([...dataArray]);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={PolicyDetails}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            padding: fullMargin,
          }}
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default PolicyDetailScreen;

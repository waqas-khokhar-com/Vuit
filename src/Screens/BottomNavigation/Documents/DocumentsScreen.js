import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { StackActions } from "@react-navigation/native";
import { screenContainer } from "../../../Helper/styles";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import { margins } from "../../../Helper/margins";
import DocumentItem from "../../../Components/ListItems/DocumentItem";
import { PolicyDocuments } from "../../../Helper/constants";

const { replace } = StackActions;
const { AttachmentScreen } = routes;
const { primary } = colors;
const { fullMargin } = margins;

const DashboardScreen = ({ navigation }) => {
  let [dataArray, setDataArray] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "doc1.pdf",
      isSelected: false,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "doc2.pdf",
      isSelected: false,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "doc3.pdf",
      isSelected: false,
    },
  ]);
  const { dispatch: navigationDispatcher, toggleDrawer, navigate } = navigation;

  const [selectionCounter, setSelectionCounter] = useState(0);

  const addRemoveInSelection = (index, isSelected) => {
    dataArray[index].isSelected = !isSelected;
    setDataArray([...dataArray]);
    console.log("isSelected", isSelected);
    const counter = !isSelected ? selectionCounter + 1 : selectionCounter - 1;
    setSelectionCounter(counter);
  };

  const clearSelection = () => {
    setDataArray(
      dataArray.map((item) => {
        item.isSelected = false;
        return item;
      })
    );
    setSelectionCounter(0);
  };

  useEffect(() => {}, []);
  const renderItem = ({ item, index }) => {
    const { name, isSelected } = item;

    return (
      <DocumentItem
        item={item}
        onItemPress={() => {
          if (selectionCounter !== 0) {
            addRemoveInSelection(index, isSelected);
          } else {
            navigate(AttachmentScreen);
          }
        }}
        onLongPress={() => {
          addRemoveInSelection(index, isSelected);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SzizleDrawerAppBar
        selectionCounter={selectionCounter}
        title={PolicyDocuments}
        onSearch={(text) => {}}
        onSort={() => {}}
        onClearSelection={() => {
          clearSelection();
        }}
        navigation
        toggleDrawer={toggleDrawer}
      />
      <View
        style={[screenContainer, { paddingHorizontal: 0, paddingVertical: 0 }]}
      >
        <FlatList
          contentContainerStyle={{ paddingVertical: fullMargin }}
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

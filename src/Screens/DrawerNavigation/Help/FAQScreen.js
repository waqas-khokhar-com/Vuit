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
import { Help, FrequentlyAskedQuestions } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import SzizleText24 from "../../../Components/Texts/SzizleText24";
import SearchBar from "../../../Components/SearchBar";
import FAQItem from "../../../Components/ListItems/FAQItem";
import { connect } from "react-redux";
import { faqRequest } from "./Redux/actions";

const { replace } = StackActions;
const {} = routes;
const { primary, black, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const FAQScreen = ({
  navigation,
  dispatch,
  faqList,
  isLoading,
  access_token,
}) => {
  const { screenHeaderStyle } = styles;
  const { navigate, goBack } = navigation;

  const [dataArray, setDataArray] = useState({
    filtered: [],
    original: [],
    searchValue: "",
  });

  const { searchValue, filtered, original } = dataArray;

  const onFilter = (text) => {
    const newData = original.filter((item) => {
      const itemData = `${item.title.toUpperCase()}   
    ${item.content.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setDataArray({ ...dataArray, filtered: newData, searchValue: text });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    getLatestData();
  }, []);
  const getLatestData = () => {
    setIsRefreshing(true);

    const payload = {
      access_token,
      onSuccess: (data) => {
        setIsRefreshing(false);
        setDataArray({ filtered: data, original: data });
      },
    };
    dispatch(faqRequest(payload));
  };
  const _handleRefresh = () => {
    getLatestData();
  };
  const renderItem = ({ item, index }) => {
    const { isExpand } = item;

    return (
      <FAQItem
        item={item}
        onExpand={() => {
          filtered[index].isExpand = !isExpand;
          setDataArray({ ...dataArray, filtered: [...filtered] });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Help}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: fullMargin, marginTop: fullMargin }}>
          <SzizleText24
            title={FrequentlyAskedQuestions}
            style={screenHeaderStyle}
          />
          <SearchBar
            value={searchValue}
            onChangeText={onFilter}
            placeholder="Search FAQ's"
          />
        </View>
        <FlatList
          contentContainerStyle={{
            paddingVertical: fullMargin,
            paddingHorizontal: doubleMargin,
          }}
          data={filtered}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={_handleRefresh}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screenHeaderStyle: {
    fontFamily: NunitoBold,
    textAlign: "center",
    marginBottom: halfMargin,
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token },
  },
  faqReducer: {
    faq: { isLoading, faqList },
  },
}) => ({ access_token, isLoading, faqList });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQScreen);

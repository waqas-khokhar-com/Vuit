import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Alert,
  StatusBar,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { screenContainer } from "../../Helper/styles";
import { routes, insuranceLabels } from "../../Helper/strings";
import { colors } from "../../Helper/colors";
import SzizleText22 from "../../Components/Texts/SzizleText22";
import { szizleFonts } from "../../Helper/fonts";
import { radius } from "../../Helper/radius";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  QuickTutorialStep1Title,
  Continue,
  EndTour,
  Done,
} from "./../../Helper/constants";
import { Button } from "react-native-paper";
import SzizleTextButton from "../../Components/Texts/SzizleTextButton";
import { textSizes } from "../../Helper/textSizes";
import { styles } from "./styles";
import SzizleText14 from "../../Components/Texts/SzizleText14";
import { connect } from "react-redux";
import Image from "../../Components/Image";

const { CheckList } = routes;
const { largeRadius } = radius;
const { size18 } = textSizes;
const { fullMargin, halfMargin, doubleMargin } = margins;
const { NunitoBold } = szizleFonts;
const { white, black } = colors;
let deviceWidth = Dimensions.get("window").width;

const TutorialStep1 = ({ navigation, pages }) => {
  const { dispatch: navigationDispatcher, navigate } = navigation;
  const { replace } = StackActions;
  const flatlistRef = useRef();
  useEffect(() => {}, []);

  const renderItem = ({ item, index }) => {
    const { title, featured_image } = item;
    const lastPage = pages.length - 1 === index;
    return (
      <View
        style={{ height: "100%", width: deviceWidth, paddingTop: doubleMargin }}
      >
        <SzizleText22
          title={title}
          style={{
            fontFamily: NunitoBold,
            textAlign: "center",
            flexWrap: "wrap",
            marginTop: fullMargin,
          }}
        />
        <View style={{ flex: 1, marginTop: fullMargin }}>
          <Image
            style={{ width: "100%", height: "95%" }}
            featured_image={featured_image}
            indicatorSize="large"
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 120,
            marginBottom: fullMargin,
          }}
        >
          <SzizleButton
            title={lastPage ? Done : Continue}
            buttonWidth="60%"
            onPress={() => {
              if (!lastPage) {
                flatlistRef.current?.scrollToIndex({
                  index: index + 1,
                  animated: true,
                });
              } else {
                navigationDispatcher(replace(CheckList));
              }
            }}
          />

          {!lastPage && (
            <SzizleTextButton
              title={EndTour}
              onPress={() => {
                navigationDispatcher(replace(CheckList));
              }}
              labelColor={black}
              labelSize={size18}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      <View style={{ height: "100%", width: "100%" }}>
        <FlatList
          ref={flatlistRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={pages}
          numColumns={1}
          pagingEnabled={true}
          scrollEnabled={false}
          renderItem={renderItem}
          // Performance settings
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = ({
  tutorialReducer: {
    tutorialPages: { pages },
  },
  authReducer: {
    authData: { access_token, user },
  },
}) => ({ access_token, user, pages });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialStep1);

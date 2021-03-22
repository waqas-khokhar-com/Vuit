import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Keyboard } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import SzizleAppBar from "../../../Components/AppBar/SzizleAppBar";
import { colors } from "../../../Helper/colors";
import { szizleFonts } from "../../../Helper/fonts";
import { margins } from "../../../Helper/margins";
import { routes } from "../../../Helper/strings";
import { textSizes } from "../../../Helper/textSizes";
import { connect } from "react-redux";
import { radius } from "../../../Helper/radius";
import { WebView } from "react-native-webview";

const { NunitoBold } = szizleFonts;
const { headerSize, size16 } = textSizes;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, black, gray } = colors;
const { mediumRadius } = radius;

const AlertWebViewScreen = ({ navigation, dispatch, isLoading, route }) => {
  const {
    dispatch: navigationDispatcher,
    navigate,
    goBack,
    replace: navigationReplace,
  } = navigation;

  const {
    params: { type },
  } = route;
  const {
    params: { url },
  } = route;

  console.log(route.params);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} title={type} />

      <View style={{ flex: 1 }}>
        {isLoading && <ActivityIndicator animating={true} />}
        <WebView
          keyboardDisplayRequiresUserAction={false}
          originWhitelist={["https://*", "git://*"]}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator animating={true} />}
          style={{
            flex: 1,
          }}
          source={{ uri: url }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({
  legalReducer: {
    legal: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertWebViewScreen);

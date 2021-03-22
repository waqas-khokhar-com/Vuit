import { StackActions } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, Keyboard } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import LogoHeader from "../../Components/LogoHeader";
import SingleTextInput from "../../Components/SingleTextInput";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  AlreadyRegistered,
  Login,
  SendCodeOnNumber,
  Verification,
  MakeSureNumberIsCorrect,
  Resend,
  resendLimit,
  ResendCode,
  showToast,
  Next,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer } from "../../Helper/styles";
import { textSizes } from "../../Helper/textSizes";
import { connect } from "react-redux";
import { validatePhoneCodeRequest, verifyPhoneRequest } from "./Redux/actions";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { radius } from "../../Helper/radius";
import DismissKeyboardView from "../../Components/DismissKeyboardView";
import { WebView } from "react-native-webview";
import { legalRequest } from "../DrawerNavigation/Legal/Redux/actions";

const { NunitoBold } = szizleFonts;
const { headerSize, size16 } = textSizes;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, black, gray } = colors;
const { mediumRadius } = radius;
const { LoginScreen, RegisterScreen3 } = routes;
const CELL_COUNT = 4;

const PrivacyWebView = ({ navigation, dispatch, isLoading, route }) => {
  const { registerContainer, loginText } = styles;
  const {
    dispatch: navigationDispatcher,
    navigate,
    goBack,
    replace: navigationReplace,
  } = navigation;

  const {
    params: { type },
  } = route;
  const [content, setContent] = useState({
    privacy: "",
    terms: "",
  });
  const { privacy, terms } = content;

  console.log(route.params);

  useEffect(() => {
    const payload = {
      onSuccess: (privacy, terms) => {
        setContent({ privacy, terms });
      },
    };
    dispatch(legalRequest(payload));
  }, []);

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
          source={{ uri: type === "Terms & Conditions" ? terms : privacy }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    textDecorationLine: "underline",
    color: primary,
    marginHorizontal: halfMargin / 2,
    fontFamily: NunitoBold,
  },
  registerContainer: {
    flexDirection: "row",
    margin: margins.fullMargin,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { width: "70%" },
  cell: {
    flex: 1,
    borderColor: gray,
    fontSize: size16,
    fontFamily: NunitoBold,
    borderWidth: 1,
    borderRadius: mediumRadius,
    textAlign: "center",
    paddingVertical: fullMargin,
    paddingHorizontal: mediumMargin,
    marginHorizontal: halfMargin,
  },
  separator: {
    height: 3,
    width: 10,
    marginHorizontal: halfMargin,
    backgroundColor: "#000",
    alignSelf: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const mapStateToProps = ({
  legalReducer: {
    legal: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyWebView);

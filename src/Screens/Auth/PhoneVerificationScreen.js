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
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
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

const { NunitoBold } = szizleFonts;
const { headerSize, size16 } = textSizes;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, black, gray } = colors;
const { mediumRadius } = radius;
const { LoginScreen, RegisterScreen3 } = routes;
const CELL_COUNT = 4;

const PhoneVerificationScreen = ({
  navigation,
  phoneVerificationId,
  dispatch,
  isLoading,
  route,
  resendLoading,
}) => {
  const { registerContainer, loginText } = styles;
  const {
    dispatch: navigationDispatcher,
    navigate,
    goBack,
    replace: navigationReplace,
  } = navigation;
  const { replace } = StackActions;
  const [value, setValue] = useState("");
  const [resendCounter, setResendCounter] = useState(resendLimit);

  let interval;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const {
    params: { phone },
    params,
  } = route;

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);
  const _onLoginClick = () => navigate(LoginScreen);
  const _onNextClick = async () => {
    if (isLoading) return;
    if (!value) return;
    Keyboard.dismiss();
    const payload = {
      id: phoneVerificationId,
      code: value,
      onSuccess: () => {
        navigationReplace(RegisterScreen3, { ...params });
      },
    };
    dispatch(validatePhoneCodeRequest(payload));
  };

  const _onCodeResend = () => {
    if (resendCounter !== resendLimit) return;

    console.log(phone);

    const payload = {
      phone,
      onSuccess: () => {
        showToast("Code resend successfully");
        startTimer();
      },
    };
    dispatch(verifyPhoneRequest(payload));
  };

  const startTimer = () => {
    let time = resendLimit;
    interval = setInterval(() => {
      if (time === 0) {
        clearInterval(interval);
        setResendCounter(resendLimit);
        return;
      }
      setResendCounter(--time);
    }, 1000);
  };

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={Verification} />

        <View style={{ marginTop: fullMargin }}>
          <View style={{ flexDirection: "row" }}>
            <SzizleText15 title={`${SendCodeOnNumber} ${phone}`} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: doubleMargin,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CodeField
              onSubmitEditing={_onNextClick}
              secureTextEntry={true}
              {...props}
              value={value}
              autoFocus={true}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              rootStyle={styles.codeFieldRoot}
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: doubleMargin,
          }}
        >
          {resendCounter === resendLimit && (
            <SzizleText12 title={MakeSureNumberIsCorrect} />
          )}
          <TouchableRipple onPress={_onCodeResend}>
            <View>
              {resendCounter === resendLimit && !resendLoading && (
                <SzizleText12 title={ResendCode} style={loginText} />
              )}
              {resendLoading && (
                <ActivityIndicator
                  style={{ marginHorizontal: fullMargin }}
                  animating={true}
                  color={primary}
                />
              )}
              {resendCounter !== resendLimit && (
                <SzizleText12 title={`Code resend in 00:${resendCounter}`} />
              )}
            </View>
          </TouchableRipple>
        </View>

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            disabled={value.length !== 4}
            title={Next}
            onPress={_onNextClick}
          />
        </View>

        <View style={registerContainer}>
          <SzizleText15 title={AlreadyRegistered} />
          <TouchableRipple onPress={_onLoginClick}>
            <SzizleText15 title={Login} style={loginText} />
          </TouchableRipple>
        </View>
      </View>
    </DismissKeyboardView>
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
  authReducer: {
    verifyPhone: { isLoading: resendLoading, phoneVerificationId },
    validatePhoneCode: { isLoading, message },
  },
}) => ({ phoneVerificationId, isLoading, resendLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneVerificationScreen);

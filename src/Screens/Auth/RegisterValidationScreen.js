import { StackActions } from "@react-navigation/native";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import LogoHeader from "../../Components/LogoHeader";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  AlreadyRegistered,
  Login,
  Enter6DigitCode,
  EmailVerification,
  DidntReceiveCode,
  Resend,
  resendLimit,
  MakeSureNumberIsCorrect,
  showToast,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { textSizes } from "../../Helper/textSizes";
import { connect } from "react-redux";
import { emailVerificationRequest, signUpRequest } from "./Redux/actions";
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
const { LoginScreen, RegisterScreen4 } = routes;
const CELL_COUNT = 6;

const RegisterValidationScreen = ({
  navigation,
  dispatch,
  isLoading,
  route,
  resendLoading,
}) => {
  const { registerContainer, loginText } = styles;
  const [value, setValue] = useState("");
  const [resendCounter, setResendCounter] = useState(resendLimit);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  let interval;
  const {
    dispatch: navigationDispatcher,
    navigate,
    goBack,
    replace: navigationReplace,
  } = navigation;
  const { replace } = StackActions;

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);
  const _onLoginClick = () => navigate(LoginScreen);
  const _onCodeResend = () => {
    if (resendCounter !== resendLimit) return;
    const { params } = route;

    const payload = {
      ...params,
      onSuccess: () => {
        showToast("Code resend successfully");
        startTimer();
      },
    };
    dispatch(signUpRequest(payload));
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
  const _onNextClick = () => {
    if (isLoading) return;
    if (!value) return;
    Keyboard.dismiss();
    const {
      params: { email, used_referral_code },
    } = route;
    const payload = {
      email,
      activation_code: value,
      onSuccess: () => {
        navigationReplace(RegisterScreen4, { used_referral_code });
      },
    };

    dispatch(emailVerificationRequest(payload));
  };

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={EmailVerification} />

        <View style={{ marginTop: fullMargin }}>
          <View style={{ flexDirection: "row" }}>
            <SzizleText15 title={Enter6DigitCode} />
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
              <Fragment key={index}>
                <Text
                  key={`value-${index}`}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
                {index === 2 ? (
                  <View key={`separator-${index}`} style={styles.separator} />
                ) : null}
              </Fragment>
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: doubleMargin,
          }}
        >
          {resendCounter === resendLimit && (
            <SzizleText12 title={DidntReceiveCode} />
          )}
          <TouchableRipple onPress={_onCodeResend}>
            <View>
              {resendCounter === resendLimit && !resendLoading && (
                <SzizleText12 title={Resend} style={loginText} />
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
            disabled={value.length !== 6}
            isLoading={isLoading}
            title="Next"
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
    marginHorizontal: halfMargin,
    fontFamily: NunitoBold,
  },
  registerContainer: {
    flexDirection: "row",
    margin: margins.fullMargin,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  codeFieldRoot: { width: "100%" },
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
    signUp: { isLoading: resendLoading },
    verifyEmail: { isLoading },
  },
}) => ({ isLoading, resendLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterValidationScreen);

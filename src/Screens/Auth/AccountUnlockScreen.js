import { StackActions } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import LogoHeader from "../../Components/LogoHeader";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  Enter6DigitCode,
  AccountUnlock,
  DidntReceiveCode,
  Resend,
  Unlock,
  resendLimit,
  ResendCode,
  showToast,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { radius } from "../../Helper/radius";
import { textSizes } from "../../Helper/textSizes";
import { connect } from "react-redux";
import {
  unlockAccountRequest,
  verifyPhoneRequest,
  verifyUnlockAccountRequest,
} from "./Redux/actions";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, gray } = colors;
const { mediumRadius } = radius;
const { size16 } = textSizes;
const { UnlockNewPasswordScreen } = routes;
const CELL_COUNT = 6;

const AccountUnlockScreen = ({
  navigation,
  route,
  dispatch,
  isLoading,
  resendLoading,
}) => {
  const { resendText } = styles;
  const {
    dispatch: navigationDispatcher,
    navigate,
    goBack,
    replace: navigationReplace,
  } = navigation;
  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [resendCounter, setResendCounter] = useState(resendLimit);
  const { replace } = StackActions;
  let interval;
  useEffect(() => {}, []);

  const _onCodeResend = () => {
    if (resendCounter !== resendLimit) return;
    const {
      params: { email },
    } = route;

    const payload = {
      email,
      onSuccess: () => {
        showToast("Code resend successfully");
        startTimer();
      },
    };
    dispatch(unlockAccountRequest(payload));
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

  const _onUnlockClick = () => {
    if (isLoading) return;
    if (!value) return;
    Keyboard.dismiss();

    const {
      params: { email },
    } = route;
    const payload = {
      email,
      activation_code: value,
      onSuccess: () => {
        navigationReplace(UnlockNewPasswordScreen, { email });
      },
    };
    dispatch(verifyUnlockAccountRequest(payload));
  };

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={AccountUnlock} />

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
            secureTextEntry={true}
            {...props}
            value={value}
            autoFocus={true}
            onSubmitEditing={_onUnlockClick}
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
                <SzizleText12 title={Resend} style={resendText} />
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
            title={Unlock}
            onPress={_onUnlockClick}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  resendText: {
    textDecorationLine: "underline",
    color: primary,
    marginHorizontal: halfMargin,
    fontFamily: NunitoBold,
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
    verifyUnlockAccount: { isLoading },
    unlockAccount: { isLoading: resendLoading },
  },
}) => ({ isLoading, resendLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountUnlockScreen);

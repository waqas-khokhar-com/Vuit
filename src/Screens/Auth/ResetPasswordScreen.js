import { StackActions } from "@react-navigation/native";
import React, { useEffect, Fragment, useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from "react-native";
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
  ResetPasswordMsg,
  ResetPassword,
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
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { radius } from "../../Helper/radius";
import { connect } from "react-redux";
import {
  forgotPasswordRequest,
  forgotPasswordVerifyRequest,
  signUpRequest,
} from "./Redux/actions";
import SzizleText24 from "../../Components/Texts/SzizleText24";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { headerSize, size16 } = textSizes;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, black, gray } = colors;
const { LoginScreen, NewPasswordScreen } = routes;
const { mediumRadius } = radius;
const CELL_COUNT = 6;

const ResetPasswordScreen = ({
  navigation,
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

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _onLoginClick = () => navigate(LoginScreen);
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
    dispatch(forgotPasswordRequest(payload));
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
  const _onResetClick = () => {
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
        navigationReplace(NewPasswordScreen, { email });
      },
    };
    dispatch(forgotPasswordVerifyRequest(payload));
  };

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={ResetPassword} />

        <View style={{ marginTop: fullMargin }}>
          <View style={{ flexDirection: "row" }}>
            <SzizleText15 title={ResetPasswordMsg} />
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
            onChangeText={setValue}
            autoFocus={true}
            cellCount={CELL_COUNT}
            onSubmitEditing={_onResetClick}
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
            title={ResetPassword}
            onPress={_onResetClick}
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
    forgotPasswordVerify: { isLoading },
    forgotPassword: { isLoading: resendLoading },
  },
}) => ({ isLoading, resendLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);

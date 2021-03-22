import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Keyboard, Platform } from "react-native";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { szizleFonts } from "../../Helper/fonts";
import LogoHeader from "../../Components/LogoHeader";
import SzizleText from "../../Components/Texts/SzizleText";
import TextInput from "../../Components/TextInput";
import { TextInput as PaperInput, TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import { routes } from "../../Helper/strings";
import { validate } from "validate.js";
import Fingerprint from "./../../../assets/Fingerprint";
import {
  DontHaveAnAccount,
  Login,
  Enter,
  Email,
  Password,
  ForgotPassword,
  LoginWithTouchID,
  ACCOUNT_STATUS_LOCKED,
  LoginWithFingerprint,
  showToast,
  CreateAccount,
  ACCOUNT_STATUS_BLOCKED,
} from "../../Helper/constants";
import { loginConstraints } from "../../Components/Models/constraints";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import ValidationError from "../../Components/ValidationError";
import { StackActions } from "@react-navigation/native";
import { connect } from "react-redux";
import { loginRequest } from "./Redux/actions";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import { getBuildNumber, getVersion } from "react-native-device-info";
import DismissKeyboardView from "../../Components/DismissKeyboardView";
import ReactivateDialog from "../../Components/Dialogs/ReactivateDialog";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { gray, primary, red, white } = colors;
const {
  RegisterScreen1,
  ForgotPasswordScreen,
  WelcomeScreen,
  FingerprintLoginScreen,
  AccountLockedScreen,
  MainFunctionalNavigation,
  ReactivatePasswordScreen,
} = routes;
const LoginScreen = ({ navigation, dispatch, isLoading }) => {
  const {
    forgotPassContainer,
    loginButton,
    registerText,
    registerContainer,
    forgotPassStyle,
    loginViewContainer,
  } = styles;
  const { navigate, dispatch: navigationDispatcher } = navigation;
  const [errorMessage, setErrorMessage] = useState(null);

  const { replace } = StackActions;
  const [passSecure, setPassSecure] = useState(true);

  // const [loginCred, setLoginCred] = useState({
  //   email: "malikwaqas1177@gmail.com",
  //   password: "a1!aaaaa",
  // });
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({
    invalidPass: false,
    message: "",
  });
  const { email, password } = loginCred;
  const { invalidPass } = loginErrors;

  useEffect(() => {}, []);

  console.log(isLoading);

  const _onForgotPassClick = () => navigate(ForgotPasswordScreen, { email });
  const _onFingerprintClick = async () => {
    navigate(FingerprintLoginScreen);
  };
  const _onLoginClick = async () => {
    Keyboard.dismiss();

    if (isLoading) return;

    const errorResults = validate(loginCred, loginConstraints);
    console.log(errorResults);
    if (errorResults) {
      const { email, password } = errorResults;
      console.log(email, password);
      if (email) {
        showToast(email[0]);
        return;
      }
      if (password) {
        showToast(password[0]);
        return;
      }
    }
    try {
      const payload = {
        ...loginCred,
        onSuccess: async (user) => {
          const { checklist } = user;
          let path = WelcomeScreen;
          if (checklist !== 0) path = MainFunctionalNavigation;

          navigationDispatcher(replace(path));
        },
        onError: (error, message) => {
          const { attempts_left, status, errors } = error;
          console.log(errors);
          if (status === ACCOUNT_STATUS_LOCKED) {
            navigate(AccountLockedScreen, { email });
          } else if (status === ACCOUNT_STATUS_BLOCKED) {
            setErrorMessage(message);
          }
          if (
            (attempts_left !== undefined || attempts_left !== null) &&
            status !== ACCOUNT_STATUS_BLOCKED
          ) {
            setLoginErrors({
              ...loginErrors,
              invalidPass: true,
              message,
            });
          }
        },
      };
      dispatch(loginRequest(payload));
    } catch (error) {
      console.log("main screen error", error);
    }
  };

  const _onRegisterClick = () => navigate(RegisterScreen1);

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      <View style={screenContainerWhiteBack}>
        <View style={{ position: "absolute" }}>
          <SzizleText12 title={`Version Code: ${getVersion()}`} />
          <SzizleText12 title={`Build Number: ${getBuildNumber()}`} />
        </View>

        <LogoHeader />

        <View style={loginViewContainer}>
          <SzizleTitleText title={Login} />
          {invalidPass && (
            <View style={{ marginTop: fullMargin }}>
              <ValidationError message={loginErrors.message} />
            </View>
          )}
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              fontSize={15}
              title={Email}
              value={email}
              returnKeyType="next"
              onChangeText={(text) =>
                setLoginCred({
                  ...loginCred,
                  email: text.trim(),
                })
              }
            />
          </View>
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              fontSize={15}
              returnKeyType="done"
              secureTextEntry={passSecure}
              value={password}
              onSubmitEditing={_onLoginClick}
              onChangeText={(text) =>
                setLoginCred({
                  ...loginCred,
                  password: text,
                })
              }
              right={
                <PaperInput.Icon
                  forceTextInputFocus={false}
                  onPress={() => setPassSecure(!passSecure)}
                  name={passSecure ? "eye-off" : "eye"}
                  color={gray}
                />
              }
              title={Password}
            />
          </View>

          <TouchableRipple
            style={forgotPassContainer}
            onPress={_onForgotPassClick}
          >
            <SzizleText title={ForgotPassword} style={forgotPassStyle} />
          </TouchableRipple>

          <View style={loginButton}>
            <SzizleButton
              isLoading={isLoading}
              title={Enter}
              onPress={_onLoginClick}
            />
          </View>
        </View>
        <ReactivateDialog
          visible={errorMessage ? true : false}
          onOk={() => {
            setErrorMessage(null);
            navigate(ReactivatePasswordScreen, { ...loginCred });
          }}
          onClose={() => {
            setErrorMessage(null);
          }}
          message={errorMessage}
          buttonTitle="Activate"
        />

        <View style={registerContainer}>
          <TouchableRipple onPress={_onFingerprintClick}>
            <View style={{ alignItems: "center" }}>
              <Fingerprint width={wp(7.23)} height={wp(7.23)} />
              <SzizleText15
                title={
                  Platform.OS === "android"
                    ? LoginWithFingerprint
                    : LoginWithTouchID
                }
                style={{ marginTop: hp(1.33), color: primary }}
              />
            </View>
          </TouchableRipple>
          <View style={{ flexDirection: "row", marginTop: hp(5.58) }}>
            <SzizleText15 title={DontHaveAnAccount} />
            <TouchableRipple onPress={_onRegisterClick}>
              <SzizleText15 title={CreateAccount} style={registerText} />
            </TouchableRipple>
          </View>
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  forgotPassContainer: {
    alignSelf: "center",
    marginTop: halfMargin,
    padding: halfMargin,
  },
  attemptLeftStyle: {
    color: primary,
    alignSelf: "center",

    marginTop: halfMargin,
  },
  loginButton: { marginTop: halfMargin },
  registerText: {
    textDecorationLine: "underline",
    color: primary,
    fontFamily: NunitoBold,
  },
  errorText: {
    color: primary,
    alignSelf: "center",
    marginTop: fullMargin,
  },
  registerContainer: {
    height: hp(14.77),
    position: "absolute",
    bottom: hp(4.46),
    alignSelf: "center",
  },
  forgotPassStyle: { textDecorationLine: "underline" },
  loginViewContainer: {
    flex: 1,
    marginTop: hp(5.59),
  },
});

const mapStateToProps = ({
  authReducer: {
    login: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

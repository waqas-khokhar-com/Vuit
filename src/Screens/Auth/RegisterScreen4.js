import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import { TouchableRipple, ActivityIndicator } from "react-native-paper";
import LogoHeader from "../../Components/LogoHeader";
import TextInput from "../../Components/TextInput";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { textSizes } from "../../Helper/textSizes";
import { TextInput as PaperInput } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import { routes } from "../../Helper/strings";
import {
  Login,
  iAgreeToVuit,
  SignUp,
  CreatePassword,
  ConfirmPassword,
  PasswordStrength,
  privacyPolicy,
  termsAndCondition,
  AlreadyRegistered,
  Minimum8Characters,
  SpecialCharacterMsg,
  AtLeast1Letter,
  AtLeast1Number,
} from "../../Helper/constants";
import SzizleRegisterAppBar from "../../Components/AppBar/SzizleRegisterAppBar";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import PasswordValidationCheck from "../../Components/PasswordValidationCheck";
import CheckboxWithTitle from "../../Components/CheckboxWithTitle";
import { StackActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import { connect } from "react-redux";
import { createPasswordRequest } from "./Redux/actions";
import BottomSheet from "@gorhom/bottom-sheet";
import DismissKeyboardView from "../../Components/DismissKeyboardView";
import { WebView } from "react-native-webview";
const { NunitoBold, NunitoSemiBold } = szizleFonts;
const { headerSize } = textSizes;
const { halfMargin, fullMargin } = margins;
const { primary, gray, red, green, white, black } = colors;

const RegisterScreen4 = ({
  navigation,
  isLoading,
  user,
  dispatch,
  route,
  used_referral_code,
}) => {
  const { loginText, registerContainer } = styles;

  const { navigate, goBack, dispatch: navigationDispatcher } = navigation;
  const { replace: navigationReplace } = StackActions;
  const { LoginScreen, CongratulationScreen } = routes;
  const snapPoints = useMemo(() => [0, "80%"], []);

  const [createPassSecure, setCreatePassSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);
  const [policyCheck, setPolicyCheck] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const sheetRef = useRef(null);
  const [content, setContent] = useState({
    privacy: "",
    terms: "",
  });
  const [bottomSheetData, setBottomSheetData] = useState("");
  const { privacy, terms } = content;
  const [validationChecks, setValidationChecks] = useState({
    minChars: false,
    specialChar: false,
    letterChar: false,
    numberChar: false,
    passwordStrength: "---",
  });
  const {
    minChars,
    specialChar,
    letterChar,
    numberChar,
    passwordStrength,
  } = validationChecks;

  const [pass, setPass] = useState({ password: "", password_confirmation: "" });

  const { password, password_confirmation } = pass;

  const _onLoginClick = () => navigate(LoginScreen);
  const _onRegisterClick = () => {
    if (isLoading) return;

    if (!password) {
      Toast.show("please enter password", Toast.SHORT, ["UIAlertController"]);
      return;
    }
    if (!minChars || !letterChar || !specialChar || !numberChar) {
      Toast.show("Password is not valid", Toast.SHORT, ["UIAlertController"]);
      return;
    }

    if (password && password !== password_confirmation) {
      Toast.show("Password mismatch", Toast.SHORT, ["UIAlertController"]);
      return;
    }
    if (!policyCheck || !termsCheck) {
      Toast.show(
        "Please check Privacy Policy and Term & Conditions",
        Toast.SHORT,
        ["UIAlertController"]
      );
      return;
    }
    const { email } = user;
    const payload = {
      email,
      used_referral_code,
      ...pass,
      onSuccess: () => {
        navigationDispatcher(navigationReplace(CongratulationScreen));
      },
    };
    dispatch(createPasswordRequest(payload));
  };

  const onPasswordChange = (text) => {
    setPass({ ...pass, password: text });
    const specialCharFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const letterFormat = /[a-zA-Z]/g;
    const numberFormat = /\d/g;
    let temp = validationChecks;
    temp.passwordStrength = "---";

    let checkCount = 0;
    if (text.match(specialCharFormat)) {
      temp.specialChar = true;
      checkCount++;
    } else {
      temp.specialChar = false;
      checkCount--;
    }
    if (text.match(letterFormat)) {
      temp.letterChar = true;
      checkCount++;
    } else {
      temp.letterChar = false;
      checkCount--;
    }
    if (text.match(numberFormat)) {
      temp.numberChar = true;
      checkCount++;
    } else {
      temp.numberChar = false;
      checkCount--;
    }
    if (text.length >= 8) {
      temp.minChars = true;
      checkCount++;
    } else {
      temp.minChars = false;
      checkCount--;
    }
    if (text) {
      if (checkCount <= 2) {
        temp.passwordStrength = "Weak";
        setIsValidPass(false);
      }
      if (checkCount === 4) {
        temp.passwordStrength = "Strong";
        setIsValidPass(true);
      }
    }
    setValidationChecks({ ...temp });
  };

  useEffect(() => {
    const payload = {
      onSuccess: (privacy, terms) => {
        setContent({ privacy, terms });
      },
    };
    // dispatch(legalRequest(payload));
  }, []);
  console.log(validationChecks);

  const renderBottomContent = () => (
    <View style={{ height: "100%", margin: fullMargin }}>
      <WebView
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={["https://*", "git://*"]}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator animating={true} />}
        style={{
          flex: 1,
          height: "50%",
        }}
        source={{ uri: bottomSheetData }}
      />
    </View>
  );

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleRegisterAppBar onBackPress={goBack} process={4} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={SignUp} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              value={password}
              onChangeText={onPasswordChange}
              right={
                <PaperInput.Icon
                  forceTextInputFocus={false}
                  onPress={() => setCreatePassSecure(!createPassSecure)}
                  name={createPassSecure ? "eye-off" : "eye"}
                  color={gray}
                />
              }
              secureTextEntry={createPassSecure}
              title={CreatePassword}
            />
          </View>

          <View>
            <View style={{ flexDirection: "row", marginTop: halfMargin }}>
              <SzizleText12
                title={PasswordStrength}
                style={{ color: "#27303D" }}
              />
              <SzizleText12
                title={passwordStrength}
                style={{
                  color:
                    passwordStrength === "---" || passwordStrength === "Weak"
                      ? red
                      : green,
                  marginStart: halfMargin,
                }}
              />
            </View>
            <View style={{ marginTop: halfMargin }}>
              <View style={{ flexDirection: "row", marginTop: halfMargin }}>
                <PasswordValidationCheck
                  isCheck={minChars}
                  title={Minimum8Characters}
                />
                <PasswordValidationCheck
                  isCheck={specialChar}
                  title={SpecialCharacterMsg}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: halfMargin }}>
                <PasswordValidationCheck
                  isCheck={letterChar}
                  title={AtLeast1Letter}
                />
                <PasswordValidationCheck
                  isCheck={numberChar}
                  title={AtLeast1Number}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              value={password_confirmation}
              onChangeText={(text) =>
                setPass({ ...pass, password_confirmation: text })
              }
              right={
                <PaperInput.Icon
                  forceTextInputFocus={false}
                  onPress={() => setConfirmPassSecure(!confirmPassSecure)}
                  name={confirmPassSecure ? "eye-off" : "eye"}
                  color={gray}
                />
              }
              secureTextEntry={confirmPassSecure}
              title={ConfirmPassword}
            />
          </View>
          <View style={{ marginTop: fullMargin, alignSelf: "center" }}>
            <CheckboxWithTitle
              onDetail={() => {
                navigate(routes.PrivacyWebView, { type: "Privacy Policy" });
              }}
              title={privacyPolicy}
              isCheck={policyCheck}
              onCheck={() => setPolicyCheck(!policyCheck)}
            />
            <CheckboxWithTitle
              onDetail={() => {
                navigate(routes.PrivacyWebView, { type: "Terms & Conditions" });
              }}
              title={termsAndCondition}
              isCheck={termsCheck}
              onCheck={() => setTermsCheck(!termsCheck)}
            />
          </View>
          <View style={{ marginTop: fullMargin }}>
            <SzizleButton
              disabled={
                !isValidPass ||
                !password_confirmation ||
                !termsCheck ||
                !policyCheck
              }
              isLoading={isLoading}
              title={SignUp}
              onPress={_onRegisterClick}
            />
          </View>
        </ScrollView>
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
  alreadyRegisterContainer: {
    flexDirection: "row",
    margin: margins.fullMargin,
    justifyContent: "center",
  },
});

const mapStateToProps = ({
  authReducer: {
    authData: { user },
    createPassword: { isLoading },
    verifyReferral: { used_referral_code },
  },
}) => ({ isLoading, user, used_referral_code });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen4);

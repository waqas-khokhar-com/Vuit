import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import LogoHeader from "../../Components/LogoHeader";
import TextInput from "../../Components/TextInput";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { TextInput as PaperInput } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import { routes } from "../../Helper/strings";
import {
  NewPassword,
  ConfirmNewPassword,
  PasswordStrength,
  SavePassword,
  CreateNewPassword,
  PasswordResetMsg,
  Minimum8Characters,
  SpecialCharacterMsg,
  AtLeast1Letter,
  AtLeast1Number,
  showToast,
} from "../../Helper/constants";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import PasswordValidationCheck from "../../Components/PasswordValidationCheck";
import { StackActions } from "@react-navigation/native";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import MessageDialog from "../../Components/Dialogs/MessageDialog";
import { connect } from "react-redux";
import DismissKeyboardView from "../../Components/DismissKeyboardView";
import { reactivateAccountRequest } from "./Redux/actions";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin, mediumMargin } = margins;
const { primary, green, gray, red } = colors;
const { LoginScreen, MainFunctionalNavigation } = routes;

const ReactivatePasswordScreen = ({
  navigation,
  route,
  dispatch,
  isLoading,
}) => {
  const { navigate, goBack, dispatch: navigationDispatcher } = navigation;
  const { replace: stackReplace, popToTop } = StackActions;

  const [createPassSecure, setCreatePassSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);
  const [messageDialog, setMessageDialog] = useState(false);
  const [pass, setPass] = useState({
    new_password: "",
    new_password_again: "",
  });
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

  const { new_password, new_password_again } = pass;
  const _onSavePassword = () => {
    if (!new_password) {
      showToast("please enter new_password");
      return;
    }
    if (!minChars || !letterChar || !specialChar || !numberChar) {
      showToast("Password is not valid");
      return;
    }

    if (new_password && new_password !== new_password_again) {
      showToast("Password mismatch");
      return;
    }

    const {
      params: { email, password },
    } = route;
    const payload = {
      email,
      password,
      ...pass,
      onSuccess: () => {
        setMessageDialog(true);
      },
    };
    dispatch(reactivateAccountRequest(payload));
  };

  const onPasswordChange = (text) => {
    setPass({ ...pass, new_password: text });
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
      }
      if (checkCount === 4) {
        temp.passwordStrength = "Strong";
      }
    }
    setValidationChecks({ ...temp });
  };

  useEffect(() => {}, []);

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={CreateNewPassword} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              value={new_password}
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
              title={NewPassword}
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
              value={new_password_again}
              onChangeText={(text) =>
                setPass({ ...pass, new_password_again: text })
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
              title={ConfirmNewPassword}
            />
          </View>

          <View style={{ marginTop: fullMargin }}>
            <SzizleButton
              isLoading={isLoading}
              title={SavePassword}
              onPress={_onSavePassword}
            />
            <MessageDialog
              message={PasswordResetMsg}
              onOk={() => {
                setMessageDialog(false);
                goBack();
                // navigationDispatcher(stackReplace(MainFunctionalNavigation));
              }}
              visible={messageDialog}
            />
          </View>
        </ScrollView>
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
    deactivateAccount: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactivatePasswordScreen);

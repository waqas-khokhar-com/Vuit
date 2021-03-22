import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import LogoHeader from "../../Components/LogoHeader";
import TextInput from "../../Components/TextInput";
import { colors } from "../../Helper/colors";
import { margins } from "../../Helper/margins";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { TextInput as PaperInput } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  NewPassword,
  ConfirmNewPassword,
  PasswordStrength,
  SavePassword,
  UnlockAccount,
  AccountSuccessfullyUnlocked,
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
import { routes } from "../../Helper/strings";
import { connect } from "react-redux";
import { unlockAccountSavePassRequest } from "./Redux/actions";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { halfMargin, fullMargin } = margins;
const { gray, red, green } = colors;
const { AuthNavigation } = routes;
const UnlockNewPasswordScreen = ({
  navigation,
  dispatch,
  isLoading,
  route,
}) => {
  const { goBack, dispatch: navigationDispatcher } = navigation;
  const { popToTop, replace } = StackActions;
  const [createPassSecure, setCreatePassSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);
  const [messageDialog, setMessageDialog] = useState({
    value: false,
    name: "",
  });
  const [pass, setPass] = useState({ password: "", password_confirmation: "" });
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

  const { password, password_confirmation } = pass;
  const _onSavePassword = () => {
    if (!password) {
      showToast("please enter password");
      return;
    }
    if (!minChars || !letterChar || !specialChar || !numberChar) {
      showToast("Password is not valid");
      return;
    }

    if (password && password !== password_confirmation) {
      showToast("Password mismatch");
      return;
    }

    const {
      params: { email },
    } = route;
    const payload = {
      email,
      ...pass,
      onSuccess: (name) => {
        console.log("name", name);
        setMessageDialog({ value: true, name });
      },
    };
    dispatch(unlockAccountSavePassRequest(payload));
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

        <SzizleTitleText title={UnlockAccount} />
        <ScrollView keyboardShouldPersistTaps="handled">
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
              messageStyle={{ color: green }}
              message={AccountSuccessfullyUnlocked}
              onOk={() => {
                setMessageDialog({ ...messageDialog, value: false });
                navigationDispatcher(replace(AuthNavigation));
              }}
              visible={messageDialog.value}
            />
          </View>
        </ScrollView>
      </View>
    </DismissKeyboardView>
  );
};

const mapStateToProps = ({
  authReducer: {
    savePasswordUnlockAccount: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnlockNewPasswordScreen);

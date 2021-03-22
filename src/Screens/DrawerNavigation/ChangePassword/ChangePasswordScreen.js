import React, { useEffect, useState } from "react";
import { View, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import {
  ChangePassword,
  PasswordStrength,
  Minimum8Characters,
  SpecialCharacterMsg,
  AtLeast1Letter,
  AtLeast1Number,
  CurrentPassword,
  ConfirmNewPassword,
  NewPassword,
  SavePassword,
  showToast,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import TextInput from "../../../Components/TextInput";
import { screenContainer } from "../../../Helper/styles";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import { TextInput as PaperInput } from "react-native-paper";
import SzizleText12 from "../../../Components/Texts/SzizleText12";
import PasswordValidationCheck from "../../../Components/PasswordValidationCheck";
import { newPasswordRequest } from "../../Auth/Redux/actions";
import { connect } from "react-redux";
import { changePasswordRequest } from "./Redux/actions";
import DismissKeyboardView from "../../../Components/DismissKeyboardView";

const { replace } = StackActions;
const {} = routes;
const { primary, gray, green, red } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const ChangePasswordScreen = ({
  navigation,
  dispatch,
  authData,
  isLoading,
}) => {
  const { navigate, goBack } = navigation;
  const { access_token } = authData;
  const [pass, setPass] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
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
  const { password, password_confirmation, current_password } = pass;

  const [currentPassSecure, setCurrentPassSecure] = useState(true);
  const [newPassSecure, setNewPassSecure] = useState(true);
  const [confirmNewPassSecure, setConfirmNewPassSecure] = useState(true);

  useEffect(() => {}, []);

  const _onSavePassword = () => {
    if (isLoading) return;

    if (!password || !current_password) {
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

    const payload = {
      ...pass,
      access_token,
      onSuccess: () => {
        goBack();
      },
    };
    dispatch(changePasswordRequest(payload));
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

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={ChangePassword}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={screenContainer}>
        <View style={{ marginTop: fullMargin }}>
          <TextInput
            value={current_password}
            onChangeText={(text) =>
              setPass({ ...pass, current_password: text })
            }
            right={
              <PaperInput.Icon
                forceTextInputFocus={false}
                onPress={() => setCurrentPassSecure(!currentPassSecure)}
                name={currentPassSecure ? "eye-off" : "eye"}
                color={gray}
              />
            }
            secureTextEntry={currentPassSecure}
            title={CurrentPassword}
          />
        </View>

        <View style={{ marginTop: fullMargin }}>
          <TextInput
            value={password}
            onChangeText={onPasswordChange}
            right={
              <PaperInput.Icon
                forceTextInputFocus={false}
                onPress={() => setNewPassSecure(!newPassSecure)}
                name={newPassSecure ? "eye-off" : "eye"}
                color={gray}
              />
            }
            secureTextEntry={newPassSecure}
            title={NewPassword}
          />
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
                onPress={() => setConfirmNewPassSecure(!confirmNewPassSecure)}
                name={confirmNewPassSecure ? "eye-off" : "eye"}
                color={gray}
              />
            }
            secureTextEntry={confirmNewPassSecure}
            title={ConfirmNewPassword}
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

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            title={SavePassword}
            buttonWidth="70%"
            onPress={_onSavePassword}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};
const styles = StyleSheet.create({});

const mapStateToProps = ({
  changePasswordReducer: {
    changePassword: { isLoading },
  },
  authReducer: { authData },
}) => ({ isLoading, authData });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordScreen);

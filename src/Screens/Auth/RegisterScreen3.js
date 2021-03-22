import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Keyboard } from "react-native";
import { TextInput as PaperInput, TouchableRipple } from "react-native-paper";
import RegisterProcess4 from "../../../assets/RegisterProcess4";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import MessageDialog from "../../Components/Dialogs/MessageDialog";
import ReferralCodeDialog from "../../Components/Dialogs/ReferralCodeDialog";
import LogoHeader from "../../Components/LogoHeader";
import SzizleRegisterAppBar from "../../Components/AppBar/SzizleRegisterAppBar";
import TextInput from "../../Components/TextInput";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  AlreadyRegistered,
  Login,
  DoYouHaveReferralCode1,
  DoYouHaveReferralCode2,
  SentEmailCheckInbox,
  Email,
  SignUp,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { connect } from "react-redux";
import { signUpRequest, verifyReferralRequest } from "./Redux/actions";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import { validate } from "validate.js";
import { emailValidator } from "../../Components/Models/constraints";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { primary, black } = colors;
const { LoginScreen, RegisterScreen4, RegisterValidationScreen } = routes;

const RegisterScreen3 = ({
  navigation,
  dispatch,
  isLoading,
  route,
  referalCodeLoading,
}) => {
  const { registerContainer, loginText, errorStyle } = styles;
  const { dispatch: navigationDispatcher, navigate, goBack } = navigation;
  const { replace } = StackActions;
  const [form, setForm] = useState({ email: "", emailError: false });
  const { email, emailError } = form;
  const [referralDialogIsVisible, setReferralDialogIsVisible] = useState(false);
  const [mailMessageDialog, setMailMessageDialog] = useState(false);
  const { params } = route;
  useEffect(() => {}, []);

  const _onNextClick = () => {
    if (isLoading) return;
    Keyboard.dismiss();
    const payload = {
      ...params,
      email,
      onSuccess: () => {
        setMailMessageDialog(true);
      },
    };

    const validationResults = validate({ email }, emailValidator);
    if (validationResults) {
      setForm({ ...form, emailError: true });
      return;
    }
    dispatch(signUpRequest(payload));
  };

  const _onLoginClick = () => navigate(LoginScreen);
  const _onReferralProceed = (used_referral_code) => {
    const payload = {
      used_referral_code,
      onSuccess: () => {
        setReferralDialogIsVisible(false);
      },
    };
    dispatch(verifyReferralRequest(payload));
  };
  const _onReferralDialogDismiss = () => setReferralDialogIsVisible(false);

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleRegisterAppBar onBackPress={goBack} process={3} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={SignUp} />

        <View style={{ marginTop: fullMargin }}>
          <View style={{ flexDirection: "row" }}>
            <SzizleText15 title={DoYouHaveReferralCode1} />
            <TouchableRipple onPress={() => setReferralDialogIsVisible(true)}>
              <SzizleText15
                title={DoYouHaveReferralCode2}
                style={{
                  color: primary,
                  fontFamily: NunitoBold,
                  textDecorationLine: "underline",
                }}
              />
            </TouchableRipple>
            <SzizleText15 title={"?"} />
          </View>

          <ReferralCodeDialog
            isLoading={referalCodeLoading}
            visible={referralDialogIsVisible}
            onDismiss={_onReferralDialogDismiss}
            onProceed={_onReferralProceed}
            onDialogClose={() => setReferralDialogIsVisible(false)}
          />
        </View>
        <View style={{ marginTop: doubleMargin }}>
          <TextInput
            fontSize={15}
            returnKeyType={"next"}
            onSubmitEditing={_onNextClick}
            mandatory
            value={email}
            title={Email}
            onChangeText={(text) => {
              setForm({ emailError: false, email: text });
            }}
            right={
              emailError && (
                <PaperInput.Icon
                  forceTextInputFocus={false}
                  onPress={() => {}}
                  size={30}
                  name={"alert-circle"}
                  color={primary}
                />
              )
            }
          />
          {emailError && (
            <SzizleText12
              title={"Please Check Email Address & Re-enter"}
              style={errorStyle}
            />
          )}
        </View>

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            title="Next"
            onPress={_onNextClick}
          />
          <MessageDialog
            onOk={() => {
              const { params } = route;
              setMailMessageDialog(false);
              navigate(RegisterValidationScreen, {
                ...params,
                email,
              });
            }}
            visible={mailMessageDialog}
            message={SentEmailCheckInbox}
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
  errorStyle: {
    color: primary,
    marginTop: halfMargin,
  },
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
});
const mapStateToProps = ({
  authReducer: {
    signUp: { isLoading },
    verifyReferral: { isLoading: referalCodeLoading },
  },
}) => ({ isLoading, referalCodeLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen3);

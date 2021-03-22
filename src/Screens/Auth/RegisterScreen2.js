import { StackActions } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import SzizleButton from "../../Components/Buttons/SzizleButton";
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
  Mobile,
  showToast,
  SignUp,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { connect } from "react-redux";
import { verifyPhoneRequest, verifyReferralRequest } from "./Redux/actions";
import PhoneInput from "react-native-phone-number-input";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import ConfirmationDialog from "../../Components/Dialogs/ConfirmationDialog";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold, NunitoSemiBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin, bodyLeftRightMargin } = margins;
const { primary, black, transparent, gray } = colors;
const { LoginScreen, PhoneVerificationScreen, RegisterScreen3 } = routes;

const RegisterScreen2 = ({
  navigation,
  dispatch,
  isLoading,
  route,
  referalCodeLoading,
}) => {
  const { registerContainer, loginText, phoneStyle } = styles;
  const { dispatch: navigationDispatcher, navigate, goBack } = navigation;
  const { replace } = StackActions;
  const [phone, setPhone] = useState("");
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [referralDialogIsVisible, setReferralDialogIsVisible] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  useEffect(() => {}, []);

  const _onLoginClick = () => navigate(LoginScreen);

  const _onNextClick = () => {
    if (isLoading) return;

    if (!phone) {
      setConfirmDialog(true);
      return;
    }

    const checkValid = phoneInput.current?.isValidNumber(phone);
    if (!checkValid) {
      showToast("Invalid phone number");
      return;
    }
    const payload = {
      phone,
      onSuccess: () => {
        const {
          params: { fullName },
        } = route;
        navigate(PhoneVerificationScreen, { ...fullName, phone });
      },
    };
    dispatch(verifyPhoneRequest(payload));
  };

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
  const phoneInput = useRef();

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleRegisterAppBar onBackPress={goBack} process={2} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={SignUp} />

        <View style={{ marginVertical: fullMargin }}>
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
        <View
          style={{
            flexDirection: "row",
            marginBottom: halfMargin / 2,
            marginTop: doubleMargin,
          }}
        >
          <View style={{ position: "absolute", top: -15 }}>
            <SzizleText12 title={Mobile} style={{ fontFamily: NunitoBold }} />
          </View>
          <PhoneInput
            countryPickerProps={{
              withAlphaFilter: false,
              preferredCountries: ["US", "GB"],
            }}
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="US"
            placeholder={" "}
            textInputStyle={{ fontFamily: NunitoSemiBold }}
            codeTextStyle={{ fontFamily: NunitoSemiBold }}
            onChangeFormattedText={(text) => {
              setPhone(text);
            }}
            onFocus={() => {
              setPhoneIsFocused(true);
            }}
            onBlur={() => {
              setPhoneIsFocused(false);
            }}
            containerStyle={[phoneStyle]}
            textContainerStyle={{
              backgroundColor: transparent,
              height: 50,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            autoFocus
          />
        </View>
        <SzizleText12
          title="Please add your mobile number to enable two-factor authentication"
          style={{ color: gray }}
        />

        <View style={{ marginTop: doubleMargin }}>
          <ConfirmationDialog
            title="Alert!"
            message="Are you sure to skip phone number?"
            visible={confirmDialog}
            onOk={() => {
              setConfirmDialog(false);
              navigate(RegisterScreen3, { ...route.params.fullName });
            }}
            okLabel={"Yes"}
            cancelLabel={"No"}
            onCancel={() => {
              setConfirmDialog(false);
            }}
          />
          <SzizleButton
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
  phoneStyle: {
    backgroundColor: transparent,
    borderBottomWidth: 1.5,
    borderBottomColor: primary,
    flex: 1,
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
    verifyPhone: { isLoading, phoneVerificationId },
    verifyReferral: { isLoading: referalCodeLoading },
  },
}) => ({ isLoading, phoneVerificationId, referalCodeLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen2);

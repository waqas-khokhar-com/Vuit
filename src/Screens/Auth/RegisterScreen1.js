import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { StackActions } from "@react-navigation/native";

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
  FirstName,
  LastName,
  showToast,
  SignUp,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { fullNameConstraints } from "../../Components/Models/constraints";
import validate from "validate.js";
import { connect } from "react-redux";
import { verifyReferralRequest } from "./Redux/actions";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { primary, black } = colors;
const { LoginScreen, RegisterScreen2 } = routes;

const RegisterScree1 = ({ navigation, dispatch, isLoading }) => {
  const { registerContainer, loginText } = styles;
  const { dispatch: navigationDispatcher, navigate, goBack } = navigation;
  const { replace } = StackActions;
  const [fullName, setFullName] = useState({
    first_name: "",
    last_name: "",
  });
  const [referralDialogIsVisible, setReferralDialogIsVisible] = useState(false);

  const { first_name, last_name } = fullName;

  useEffect(() => {}, []);

  const _onNextClick = () => {
    const validateResult = validate(fullName, fullNameConstraints);
    console.log("validateResult", validateResult);
    if (validateResult) {
      showToast("some fields are missing");
      return;
    }

    navigate(RegisterScreen2, { fullName });
  };
  const _onLoginClick = () => {
    navigate(LoginScreen);
  };
  const _onReferralProceed = (used_referral_code) => {
    console.log(used_referral_code);
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
      <SzizleRegisterAppBar onBackPress={goBack} process={1} />

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
            isLoading={isLoading}
            visible={referralDialogIsVisible}
            onDismiss={_onReferralDialogDismiss}
            onProceed={_onReferralProceed}
            onDialogClose={() => setReferralDialogIsVisible(false)}
          />
        </View>
        <View>
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              returnKeyType="next"
              fontSize={15}
              mandatory
              title={FirstName}
              value={first_name}
              onChangeText={(text) =>
                setFullName({ ...fullName, first_name: text })
              }
            />
          </View>
          <View style={{ marginTop: fullMargin }}>
            <TextInput
              fontSize={15}
              returnKeyType="next"
              onSubmitEditing={_onNextClick}
              mandatory
              value={last_name}
              title={LastName}
              onChangeText={(text) =>
                setFullName({ ...fullName, last_name: text })
              }
            />
          </View>
        </View>
        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton title="Next" onPress={_onNextClick} />
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
});
const mapStateToProps = ({
  authReducer: {
    verifyReferral: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScree1);

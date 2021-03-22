import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { TouchableRipple } from "react-native-paper";
import RegisterProcess4 from "../../../assets/RegisterProcess4";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import MessageDialog from "../../Components/Dialogs/MessageDialog";
import ReferralCodeDialog from "../../Components/Dialogs/ReferralCodeDialog";
import LogoHeader from "../../Components/LogoHeader";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import TextInput from "../../Components/TextInput";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  SentEmailCheckInbox,
  Email,
  ForgotYourPassword,
  ForgotPasswordInstr,
  Submit,
  DontHaveAnAccount,
  CreateAccount,
  showToast,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { connect } from "react-redux";
import { forgotPasswordRequest } from "./Redux/actions";
import validate from "validate.js";
import { emailValidator } from "../../Components/Models/constraints";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { primary, black } = colors;
const { RegisterScreen1, ResetPasswordScreen } = routes;

const ForgotPasswordScreen = ({ navigation, dispatch, isLoading, route }) => {
  const { registerContainer, loginText } = styles;
  const {
    dispatch: navigationDispatcher,
    replace: navigationReplace,
    navigate,
    goBack,
  } = navigation;
  const { replace } = StackActions;
  const {
    params: { email: paramEmail },
  } = route;
  const [email, setEmail] = useState(paramEmail);
  const [mailMessageDialog, setMailMessageDialog] = useState(false);

  useEffect(() => {}, []);

  const _onRegisterClick = () => navigationReplace(RegisterScreen1);

  const _onSubmitClick = () => {
    if (isLoading) return;

    const errorResults = validate({ email }, emailValidator);
    console.log(errorResults);
    if (errorResults) {
      showToast(errorResults.email[0]);
      return;
    }
    const payload = {
      email,
      onSuccess: () => {
        setMailMessageDialog(true);
      },
    };
    dispatch(forgotPasswordRequest(payload));
  };

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <SzizleTitleText title={ForgotYourPassword} />

        <View style={{ marginTop: fullMargin }}>
          <SzizleText15 title={ForgotPasswordInstr} />
        </View>
        <View style={{ marginTop: doubleMargin }}>
          <TextInput
            onSubmitEditing={_onSubmitClick}
            returnKeyType={"next"}
            mandatory
            keyboardType="email-address"
            value={email}
            title={Email}
            onChangeText={(text) => setEmail(text.trim())}
          />
        </View>

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            title={Submit}
            onPress={_onSubmitClick}
          />
          <MessageDialog
            onOk={() => {
              setMailMessageDialog(false);
              navigate(ResetPasswordScreen, { email });
            }}
            visible={mailMessageDialog}
            message={SentEmailCheckInbox}
          />
        </View>

        <View style={registerContainer}>
          <SzizleText15 title={DontHaveAnAccount} />
          <TouchableRipple onPress={_onRegisterClick}>
            <SzizleText15 title={CreateAccount} style={loginText} />
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
    forgotPassword: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);

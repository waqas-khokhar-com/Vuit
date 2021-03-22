import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Locked from "../../../assets/Locked";
import RegisterProcess4 from "../../../assets/RegisterProcess4";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import MessageDialog from "../../Components/Dialogs/MessageDialog";
import LogoHeader from "../../Components/LogoHeader";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import TextInput from "../../Components/TextInput";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleTitleText from "../../Components/Texts/SzizleTitleText";
import { colors } from "../../Helper/colors";
import {
  Enter6DigitCode,
  Email,
  AccountLocked,
  AccountLockMsg,
  Unlock,
  DontHaveAnAccount,
  CreateAccount,
} from "../../Helper/constants";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { routes } from "../../Helper/strings";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { connect } from "react-redux";
import { unlockAccountRequest } from "./Redux/actions";
import DismissKeyboardView from "../../Components/DismissKeyboardView";

const { NunitoBold } = szizleFonts;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { primary, black } = colors;
const { RegisterScreen1, AccountUnlockScreen } = routes;

const AccounLockedScreen = ({ navigation, route, dispatch, isLoading }) => {
  const { registerContainer, loginText } = styles;
  const { dispatch: navigationDispatcher, navigate, goBack } = navigation;
  const { replace } = StackActions;
  const [email, setEmail] = useState("");
  const [mailMessageDialog, setMailMessageDialog] = useState(false);

  useEffect(() => {
    const {
      params: { email },
    } = route;
    setEmail(email);
  }, []);

  const _onUnlockClick = () => {
    const payload = {
      email,
      onSuccess: () => {
        setMailMessageDialog(true);
      },
    };
    dispatch(unlockAccountRequest(payload));
  };

  const _onRegisterClick = () => navigate(RegisterScreen1);

  return (
    <DismissKeyboardView style={{ flex: 1 }}>
      <SzizleAppBar onBackPress={goBack} />

      <View style={screenContainerWhiteBack}>
        <LogoHeader />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: fullMargin,
          }}
        >
          <Locked />
          <SzizleTitleText
            title={AccountLocked}
            style={{ color: primary, marginTop: fullMargin }}
          />

          <SzizleText15
            title={AccountLockMsg}
            style={{
              marginTop: fullMargin,
              textAlign: "center",
            }}
          />
        </View>
        <View style={{ marginTop: fullMargin }}>
          <TextInput
            editable={false}
            mandatory
            value={email}
            title={Email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={{ marginTop: doubleMargin }}>
          <SzizleButton
            isLoading={isLoading}
            title={Unlock}
            onPress={_onUnlockClick}
          />
          <MessageDialog
            onOk={() => {
              setMailMessageDialog(false);
              navigate(AccountUnlockScreen, { email });
            }}
            visible={mailMessageDialog}
            message={Enter6DigitCode}
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
    unlockAccount: { isLoading },
  },
}) => ({ isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AccounLockedScreen);

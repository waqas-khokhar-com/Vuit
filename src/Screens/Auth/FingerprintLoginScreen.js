import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { screenContainer, screenContainerWhiteBack } from "../../Helper/styles";
import { szizleFonts } from "../../Helper/fonts";
import LogoHeader from "../../Components/LogoHeader";
import { textSizes } from "../../Helper/textSizes";
import { TouchableRipple } from "react-native-paper";
import { colors } from "../../Helper/colors";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  NoThankYou,
  UseTouchID,
  UseFingerprint,
  UseTouchIDToAccessAccount,
  UseFingerprintToAccessAccount,
  Welcome,
  IS_FINGERPRINT_ENABLE,
  showToast,
  ACCOUNT_STATUS_LOCKED,
  ACCOUNT_STATUS_BLOCKED,
} from "../../Helper/constants";
import SzizleText17 from "../../Components/Texts/SzizleText17";
import SzizleText34 from "../../Components/Texts/SzizleText34";
import Fingerprint from "../../../assets/Fingerprint";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { getData } from "../../Helper/SzizleStorage";
import { connect } from "react-redux";
import { getCredentials } from "../../Helper/fingerprintLogin";
import { routes } from "../../Helper/strings";
import { loginRequest } from "./Redux/actions";
import { StackActions } from "@react-navigation/native";
import ReactivateDialog from "../../Components/Dialogs/ReactivateDialog";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { NunitoBold } = szizleFonts;
const { headerSize } = textSizes;
const { halfMargin, fullMargin, doubleMargin } = margins;
const { primary } = colors;
const {
  WelcomeScreen,
  MainFunctionalNavigation,
  AccountLockedScreen,
  ReactivatePasswordScreen,
} = routes;
const FingerprintLoginScreen = ({ navigation, dispatch, isLoading }) => {
  const { bottomContainer, loginViewContainer } = styles;
  const { navigate, dispatch: navigationDispatcher, goBack } = navigation;
  const [errorMessage, setErrorMessage] = useState(null);
  const { replace } = StackActions;

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({ title: "Log in with Biometrics" }).then(
      () => {
        login();
      }
    );
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        login();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleAuthenticationAttemptedLegacy = (error) => {
    alert(error.message);
  };

  const login = async () => {
    console.log("done");
    const { username, password } = await getCredentials();
    const payload = {
      email: username,
      password,
      onSuccess: async (user) => {
        const { checklist } = user;
        let path = WelcomeScreen;
        if (checklist !== 0) path = MainFunctionalNavigation;
        navigationDispatcher(replace(path));
      },
      onError: (error, message) => {
        const { attempts_left, status } = error;
        if (status === ACCOUNT_STATUS_LOCKED) {
          navigate(AccountLockedScreen, { email });
        } else if (status === ACCOUNT_STATUS_BLOCKED) {
          setErrorMessage(message);
        }
      },
    };
    console.log(payload);
    dispatch(loginRequest(payload));
  };

  useEffect(() => {}, []);
  const _onLoginClick = async () => {
    if (isLoading) return;

    const isEnabled = await getData(IS_FINGERPRINT_ENABLE);
    if (!isEnabled) {
      showToast("Fingerprint authentication is not enabled");
      return;
    }

    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        FingerprintScanner.release();

        if (requiresLegacyAuthentication()) {
          authLegacy();
        } else {
          authCurrent();
        }
      })
      .catch((error) => {
        showToast(error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={screenContainerWhiteBack}>
        <LogoHeader />
        <View style={loginViewContainer}>
          <View
            style={{ alignItems: "center", width: "80%", alignSelf: "center" }}
          >
            <SzizleText34 title={Welcome} />
            <SzizleText17
              title={
                Platform.OS === "android"
                  ? UseFingerprintToAccessAccount
                  : UseTouchIDToAccessAccount
              }
              style={{
                textAlign: "center",
                marginTop: halfMargin,
                marginBottom: doubleMargin,
              }}
            />

            <Fingerprint width={wp(24.15)} height={wp(24.15)} />
          </View>
        </View>

        <ReactivateDialog
          visible={errorMessage ? true : false}
          onOk={async () => {
            setErrorMessage(null);
            const { username, password } = await getCredentials();

            navigate(ReactivatePasswordScreen, { password, email: username });
          }}
          onClose={() => {
            setErrorMessage(null);
          }}
          message={errorMessage}
        />

        <View style={bottomContainer}>
          <SzizleButton
            isLoading={isLoading}
            buttonWidth="70%"
            title={Platform.OS === "android" ? UseFingerprint : UseTouchID}
            onPress={_onLoginClick}
          />
          <TouchableRipple onPress={goBack} style={{ marginTop: fullMargin }}>
            <SzizleText17
              title={NoThankYou}
              style={{ fontFamily: NunitoBold }}
            />
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginTitle: { fontFamily: NunitoBold, fontSize: headerSize },
  forgotPassContainer: { alignSelf: "flex-end", marginTop: halfMargin },
  attemptLeftStyle: {
    color: primary,
    alignSelf: "center",
    marginTop: halfMargin,
  },
  registerText: {
    textDecorationLine: "underline",
    color: primary,
    fontFamily: NunitoBold,
    marginStart: halfMargin,
  },
  errorText: {
    color: primary,
    alignSelf: "center",
    marginTop: fullMargin,
  },
  bottomContainer: {
    width: "100%",

    alignItems: "center",
    margin: margins.fullMargin,
    bottom: 0,
    alignSelf: "center",
  },
  forgotPassStyle: { textDecorationLine: "underline" },
  loginViewContainer: {
    flex: 1,
    justifyContent: "center",
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FingerprintLoginScreen);

import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Switch,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import {
  IS_FINGERPRINT_ENABLE,
  PrivacySecurity,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import Card from "../../../Components/ShadowCards/Card";
import SzizleText15 from "../../../Components/Texts/SzizleText15";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  deactivateAccountRequest,
  enableDisableBiometric,
} from "./Redux/actions";
import securityReducer from "./Redux/reducers";
import ConfirmationDialog from "../../../Components/Dialogs/ConfirmationDialog";
import { ActivityIndicator } from "react-native-paper";
import { actionTypes } from "../../../Redux/actionTypes";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { storeData } from "../../../Helper/SzizleStorage";

const { replace } = StackActions;
const { AuthNavigation, SubscriptionScreen } = routes;
const { primary, gray, red, primary50, gray30, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const PrivacySecurityScreen = ({
  navigation,
  dispatch,
  authData,
  deactiveLoading,
  biometricLoading,
}) => {
  const { cardLabelStyle, cardContainer } = styles;
  const [confirmDialog, setConfirmDialog] = useState(false);

  const { navigate, dispatch: navigationDispatcher, goBack } = navigation;
  const { replace } = StackActions;
  const {
    access_token,
    user: { biometric_login },
  } = authData;
  const [biometricLoginSwitch, setBiometricLoginSwitch] = useState(
    biometric_login
  );

  useEffect(() => {}, []);

  const indicator = () => (
    <ActivityIndicator animating={true} color={primary} />
  );

  const onDeactivate = () => {
    setConfirmDialog(false);
    const payload = {
      access_token,
      is_deactivate: 1,
      onSuccess: () => {
        dispatch({
          type: actionTypes.LOGOUT,
        });
        navigationDispatcher(replace(AuthNavigation));
      },
    };
    dispatch(deactivateAccountRequest(payload));
  };

  const onBiometricChange = () => {
    const currentState = !biometricLoginSwitch;

    FingerprintScanner.isSensorAvailable()
      .then((biometryType) => {
        const payload = {
          access_token,
          biometric_login: currentState ? 1 : 0,
          onSuccess: () => {
            setBiometricLoginSwitch(currentState);
            storeData(IS_FINGERPRINT_ENABLE, currentState);
          },
        };
        console.log(authData);
        dispatch(enableDisableBiometric(payload));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={PrivacySecurity}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View
        style={[
          screenContainer,
          { paddingVertical: fullMargin, paddingHorizontal: doubleMargin },
        ]}
      >
        <Card>
          <View style={cardContainer}>
            <View style={{ flex: 8 }}>
              <SzizleText15
                title="Enable Biometric Login"
                style={cardLabelStyle}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              {biometricLoading && indicator()}
              <Switch
                trackColor={{ false: gray30, true: primary50 }}
                thumbColor={biometricLoginSwitch ? primary : white}
                onValueChange={onBiometricChange}
                value={biometricLoginSwitch}
              />
            </View>
          </View>
        </Card>
        <Card onPress={() => setConfirmDialog(true)}>
          <View style={cardContainer}>
            <View style={{ flex: 8 }}>
              <SzizleText15 title="Deactivate Account" style={cardLabelStyle} />
              <ConfirmationDialog
                title="Alert!"
                message="Are you sure to Deactivate?"
                visible={confirmDialog}
                onOk={onDeactivate}
                okLabel={"Yes"}
                cancelLabel={"No"}
                onCancel={() => {
                  setConfirmDialog(false);
                }}
              />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {deactiveLoading && indicator()}
              <MaterialCommunityIcons name="chevron-right" size={40} />
            </View>
          </View>
        </Card>
        <Card
          onPress={() => {
            navigate(SubscriptionScreen);
          }}
        >
          <View style={cardContainer}>
            <View style={{ flex: 8 }}>
              <SzizleText15 title="Go Premium" style={cardLabelStyle} />
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <MaterialCommunityIcons name="chevron-right" size={40} />
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardLabelStyle: {
    fontFamily: NunitoBold,
    paddingVertical: halfMargin,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: halfMargin,
  },
});
const mapStateToProps = ({
  securityReducer: {
    biometric: { isLoading: biometricLoading },
    deactivateAccount: { isLoading: deactiveLoading },
  },
  authReducer: { authData },
}) => ({ biometricLoading, authData, deactiveLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivacySecurityScreen);

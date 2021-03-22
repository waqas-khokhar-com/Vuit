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
import { Preferences } from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import Card from "../../../Components/ShadowCards/Card";
import SzizleText15 from "../../../Components/Texts/SzizleText15";
import { connect } from "react-redux";
import { updatePreferences } from "./Redux/actions";
import { ActivityIndicator } from "react-native-paper";

const { replace } = StackActions;
const {} = routes;
const { primary, gray, red, primary50, gray30, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const PreferencesScreen = ({ navigation, authData, dispatch, isLoading }) => {
  const { cardLabelStyle, cardContainer } = styles;
  const { navigate, goBack } = navigation;
  const {
    access_token,
    user: { notify_on_news_and_updates, notify_on_policy_renewal },
  } = authData;
  console.log(authData);
  useEffect(() => {}, []);
  const [policyRenewalSwitch, setPolicyRenewalSwitch] = useState(
    notify_on_policy_renewal
  );
  const [newsUpdateSwitch, setNewsUpdateSwitch] = useState(
    notify_on_news_and_updates
  );

  const onPolicyRenewl = () => {
    if (isLoading) return;
    const currentState = !policyRenewalSwitch;
    executeQuery(newsUpdateSwitch ? 1 : 0, currentState ? 1 : 0);
  };

  const executeQuery = (
    notify_on_news_and_updates,
    notify_on_policy_renewal
  ) => {
    const payload = {
      access_token,
      notify_on_news_and_updates,
      notify_on_policy_renewal,
      onSuccess: () => {
        setPolicyRenewalSwitch(notify_on_policy_renewal !== 0);
        setNewsUpdateSwitch(notify_on_news_and_updates !== 0);
      },
    };
    console.log(authData);
    dispatch(updatePreferences(payload));
  };

  const onNewsUpdate = () => {
    if (isLoading) return;
    const currentState = !newsUpdateSwitch;
    executeQuery(currentState ? 1 : 0, policyRenewalSwitch ? 1 : 0);
  };

  const indicator = () => (
    <ActivityIndicator animating={true} color={primary} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Preferences}
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
        {isLoading && indicator()}
        <Card>
          <View style={cardContainer}>
            <View style={{ flex: 8 }}>
              <SzizleText15
                title="Notify me of Policy Renewals"
                style={cardLabelStyle}
              />
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Switch
                trackColor={{ false: gray30, true: primary50 }}
                thumbColor={policyRenewalSwitch ? primary : white}
                onValueChange={onPolicyRenewl}
                value={policyRenewalSwitch}
              />
            </View>
          </View>
        </Card>
        <Card>
          <View style={cardContainer}>
            <View style={{ flex: 8 }}>
              <SzizleText15
                title="Notify me of VüIT News & Updates"
                style={cardLabelStyle}
              />
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <Switch
                trackColor={{ false: gray30, true: primary50 }}
                thumbColor={newsUpdateSwitch ? primary : white}
                onValueChange={onNewsUpdate}
                value={newsUpdateSwitch}
              />
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
  authReducer: { authData },
  preferencesReducer: {
    preferences: { isLoading },
  },
}) => ({ authData, isLoading });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen);

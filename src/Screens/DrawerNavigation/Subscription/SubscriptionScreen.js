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
  SelectYourPlan,
  SubscribeFor20,
  SubscribeFor216,
  AllSubsCanBeCancelAtAnyTime,
  SubscriptionConfirmationMessage,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import Card from "../../../Components/ShadowCards/Card";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import SzizleText15 from "../../../Components/Texts/SzizleText15";
import SzizleButton from "../../../Components/Buttons/SzizleButton";
import ConfirmationDialog from "../../../Components/Dialogs/ConfirmationDialog";
import { PaymentRequest } from "react-native-payments";
import { METHOD_DATA_ANDROID } from "../../../Helper/payments";

const { replace } = StackActions;
const { PaymentSuccessfulScreen } = routes;
const { primary, gray, red, primary50, purple, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;

const SubscriptionScreen = ({ navigation }) => {
  const [subsConfirmationDialog, setSubsConfirmationDialog] = useState(false);

  const { cardContainer, titleStyle } = styles;
  const { dispatch: navigationDispatcher, goBack } = navigation;
  const { replace } = StackActions;
  useEffect(() => {}, []);

  const onPaymentRequest = () => {
    const DETAILS = {
      id: "basic-example",
      displayItems: [
        {
          label: "Movie Ticket",
          amount: { currency: "USD", value: "15.00" },
        },
      ],
      total: {
        label: "Merchant Name",
        amount: { currency: "USD", value: "15.00" },
      },
    };
    const paymentRequest = new PaymentRequest(METHOD_DATA_ANDROID, DETAILS);
    paymentRequest
      .show()
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={SelectYourPlan}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      <View style={screenContainer}>
        <Card style={{ flex: 1 }}>
          <View style={cardContainer}>
            <SzizleText16 title="Monthly Subscription" style={titleStyle} />
            <SzizleButton title={SubscribeFor20} onPress={onPaymentRequest} />
          </View>
        </Card>
        <Card style={{ flex: 1 }}>
          <View style={cardContainer}>
            <SzizleText16
              title="Annual Subscription ( 10% Off)"
              style={titleStyle}
            />
            <SzizleButton
              title={SubscribeFor216}
              onPress={() => setSubsConfirmationDialog(true)}
            />
          </View>
        </Card>
        <SzizleText15 title={AllSubsCanBeCancelAtAnyTime} />
        <ConfirmationDialog
          title="Confirm Subscription"
          visible={subsConfirmationDialog}
          message={SubscriptionConfirmationMessage}
          onOk={() => {
            setSubsConfirmationDialog(false);
            navigationDispatcher(replace(PaymentSuccessfulScreen));
          }}
          onCancel={() => setSubsConfirmationDialog(false)}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: halfMargin,
    height: "100%",
  },
  titleStyle: {
    fontFamily: NunitoBold,
    color: purple,
    marginBottom: halfMargin,
  },
});
export default SubscriptionScreen;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../../Helper/strings";
import SzizleDrawerAppBar from "../../../Components/AppBar/SzizleDrawerAppBar";
import { colors } from "../../../Helper/colors";
import {
  Legal,
  loremIpsum,
  termsAndCondition,
} from "../../../Helper/constants";
import { margins } from "../../../Helper/margins";
import { szizleFonts } from "../../../Helper/fonts";
import { screenContainer } from "../../../Helper/styles";
import Card from "../../../Components/ShadowCards/Card";
import SzizleText15 from "../../../Components/Texts/SzizleText15";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { radius } from "../../../Helper/radius";
import SzizleText20 from "../../../Components/Texts/SzizleText20";
import SzizleText16 from "../../../Components/Texts/SzizleText16";
import CloseIcon from "./../../../../assets/CloseIcon";
import { ActivityIndicator, Title } from "react-native-paper";
import { connect } from "react-redux";
import { legalRequest } from "./Redux/actions";
import ScreenLoader from "../../../Components/Loaders/ScreenLoader";
import { WebView } from "react-native-webview";

const { replace } = StackActions;
const {} = routes;
const { primary, gray, red, primary50, gray30, white } = colors;
const { NunitoBold } = szizleFonts;
const { fullMargin, doubleMargin, halfMargin } = margins;
const { largeRadius } = radius;

const LegalScreen = ({
  navigation,
  dispatch,
  isLoading,
  access_token,
  legal,
}) => {
  const { cardLabelStyle, cardContainer, dataContainer } = styles;
  const { navigate, goBack } = navigation;

  useEffect(() => {
    const payload = {
      access_token,
      onSuccess: (privacy, terms) => {},
    };
    dispatch(legalRequest(payload));
  }, []);

  const [hideShow, setHideShow] = useState({
    webviewIsVisible: false,
    webViewUrl: "",
  });
  const { webviewIsVisible, webViewUrl } = hideShow;

  const privacyPolicyTermsView = (message) => (
    <View style={dataContainer}>
      <View
        style={{
          alignSelf: "flex-end",
          marginEnd: halfMargin,
          alignContent: "center",
          alignItems: "center",
        }}
      />
      <View style={{ alignSelf: "flex-end", marginEnd: fullMargin }}>
        <CloseIcon
          width="24"
          height="24"
          onPress={() => {
            setHideShow({
              webviewIsVisible: false,
            });
          }}
        />
      </View>

      <View style={{ flex: 1, margin: fullMargin }}>
        <WebView
          keyboardDisplayRequiresUserAction={false}
          originWhitelist={["https://*", "git://*"]}
          startInLoadingState={true}
          renderLoading={() => <ActivityIndicator animating={true} />}
          style={{
            flex: 1,
          }}
          source={{ uri: webViewUrl }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="dark-content" />
      <SzizleDrawerAppBar
        title={Legal}
        navigation
        onBackPress={goBack}
        onRightAction={() => {}}
      />
      {isLoading && <ScreenLoader />}
      <View style={screenContainer}>
        {!webviewIsVisible && (
          <View>
            {legal.map((item, index) => {
              const { title, url } = item;
              return (
                <Card
                  key={index}
                  onPress={() =>
                    setHideShow({
                      webviewIsVisible: true,
                      webViewUrl: url,
                    })
                  }
                >
                  <View style={cardContainer}>
                    <View style={{ flex: 8 }}>
                      <SzizleText15 title={title} style={cardLabelStyle} />
                    </View>
                    <View style={{ flex: 2, alignItems: "flex-end" }}>
                      <MaterialCommunityIcons name="chevron-right" size={40} />
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        )}
        {webviewIsVisible && privacyPolicyTermsView()}
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
  dataContainer: {
    flex: 1,
    borderRadius: largeRadius,
    backgroundColor: white,
    borderWidth: 1,
    borderColor: primary,
    paddingTop: fullMargin,
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { access_token },
  },
  legalReducer: {
    legal: { legal, isLoading },
  },
}) => ({ access_token, isLoading, legal });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LegalScreen);

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../Helper/strings";
import WelcomeLogo from "../../../assets/WelcomeLogo";
import { colors } from "../../Helper/colors";
import { radius } from "../../Helper/radius";
import SzizleText17 from "../../Components/Texts/SzizleText17";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
  IS_TUTORIAL_VISITED,
  QuickTutorial,
  LetsGo,
  Recommended,
} from "../../Helper/constants";
import { connect } from "react-redux";
import tutorialReducer from "../Tutorial/Redux/reducers";
import { tutorialPagesRequest } from "../Tutorial/Redux/actions";
import ScreenLoader from "../../Components/Loaders/ScreenLoader";
import { Appbar } from "react-native-paper";
import { storeData } from "../../Helper/SzizleStorage";
import SzizleText12 from "../../Components/Texts/SzizleText12";
import LottieView from "lottie-react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const { primary, white } = colors;
const { largeRadius } = radius;
const { fullMargin, doubleMargin, halfMargin } = margins;
const { TutorialNavigation, CheckList } = routes;
const { NunitoBoldItalic } = szizleFonts;
const WelcomeScreen = ({
  navigation,
  user,
  dispatch,
  access_token,
  isLoading,
}) => {
  const { screenContainer, insideContainer, textStyle } = styles;
  const { dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  const { full_name } = user;
  const [currentPage, setCurrentPage] = useState({ content: "" });

  useEffect(() => {
    const payload = {
      access_token,
      onSuccess: (page) => {
        console.log(page);
        setCurrentPage(page);
      },
    };
    dispatch(tutorialPagesRequest(payload));
  }, []);

  const _onLetsGo = async () => {
    // await storeData(IS_TUTORIAL_VISITED, true);
    navigationDispatcher(replace(CheckList));
  };

  const _onLetsGetStarted = () =>
    navigationDispatcher(replace(TutorialNavigation));
  // navigationDispatcher(replace(MainFunctionalNavigation));

  return (
    <View style={screenContainer}>
      <StatusBar barStyle={"dark-content"} backgroundColor={white} />
      <View style={insideContainer}>
        {/* <WelcomeLogo /> */}

        <View
          style={{ flex: 1, marginTop: -Math.abs(heightPercentageToDP(2)) }}
        >
          <LottieView
            style={{ width: "100%" }}
            source={require("../../../assets/LottieResources/welcome.json")}
            autoPlay={true}
            loop={true}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <SzizleText17 title={currentPage.content} style={textStyle} />
          </ScrollView>
          <View
            style={{
              marginVertical: halfMargin,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <SzizleButton onPress={_onLetsGo} title={LetsGo} />
            <SzizleButton title={QuickTutorial} onPress={_onLetsGetStarted} />
            <SzizleText12 title={Recommended} />
          </View>
        </View>
      </View>
      {isLoading && <ScreenLoader />}
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: NunitoBoldItalic,
    textAlign: "center",
  },
  insideContainer: {
    flex: 1,
    backgroundColor: white,
    borderRadius: largeRadius,
    alignItems: "center",
    paddingHorizontal: fullMargin,
    paddingTop: fullMargin,
  },
  screenContainer: {
    flex: 1,
    borderColor: primary,
    borderWidth: 20,
    backgroundColor: primary,
    borderRadius: largeRadius,
  },
});
const mapStateToProps = ({
  tutorialReducer: {
    tutorialPages: { isLoading, pages },
  },
  authReducer: {
    authData: { user, access_token },
  },
}) => ({ user, isLoading, pages, access_token });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

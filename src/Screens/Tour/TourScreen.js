import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { szizleFonts } from "../../Helper/fonts";
import {
  IS_TOUR_VISITED,
  Skip,
  LetsGetStarted,
  AlreadyRegistered,
  Login,
} from "../../Helper/constants";
import LottieView from "lottie-react-native";
import { colors } from "../../Helper/colors";
import { textSizes } from "../../Helper/textSizes";
import { margins } from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import { TouchableRipple } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { routes } from "../../Helper/strings";
import { storeData } from "../../Helper/SzizleStorage";
import SzizleText15 from "../../Components/Texts/SzizleText15";
import SzizleText24 from "../../Components/Texts/SzizleText24";
import SzizleText17 from "../../Components/Texts/SzizleText17";
import { connect } from "react-redux";
import tourPagesReducer from "./Redux/reducers";
import { tourPagesRequest } from "./Redux/actions";
import ScreenLoader from "../../Components/Loaders/ScreenLoader";

const tour1 = require("../../../assets/LottieResources/tour1.json");
const tour2 = require("../../../assets/LottieResources/tour2.json");
const tour3 = require("../../../assets/LottieResources/tour3.json");
const tour4 = require("../../../assets/LottieResources/tour4.json");
import ViewPager from "@react-native-community/viewpager";

let deviceWidth = Dimensions.get("window").width;

const lottieAnimationsArray = [tour1, tour2, tour3, tour4];

const { primary, white, gray } = colors;
const { fullMargin, halfMargin, doubleMargin, mediumMargin } = margins;
const { NunitoRegular, NunitoSemiBold, NunitoBoldItalic } = szizleFonts;
const { tourBottomTextSize } = textSizes;
const { NunitoBold } = szizleFonts;
const TourScreen = ({ navigation, dispatch, isLoading, pages }) => {
  const {
    slide,
    dotStyle,
    activeDotStyle,
    loginContainer,
    slideTitle,
    skipText,
    loginText,
    skipButton,
  } = styles;

  const lottieAnimation = [];
  const [isFinish, setIsFinish] = useState(false);
  const { navigate, dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  const { LoginScreen, RegisterScreen1, MainFunctionalNavigation } = routes;
  const [slideChange, setSlideChange] = useState(0);

  const [initialPage, setInitialPage] = useState(0);

  let currentPage = 0;
  let autoMove = true;

  const pagerRef = useRef();
  const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

  useEffect(() => {
    const payload = {
      onSuccess: (pages) => {},
    };
    dispatch(tourPagesRequest(payload));
  }, []);

  const onNavigate = async (route) => {
    await storeData(IS_TOUR_VISITED, true);
    navigate(route);
  };

  const _onLoginClick = async () => {
    await onNavigate(LoginScreen);
  };
  const _onLetsGetStarted = async () => {
    await onNavigate(RegisterScreen1);
  };

  const _renderItem = (render) => {
    const { item, index: itemIndex } = render;
    return (
      <View style={slide}>
        <SzizleText24 style={slideTitle} title={item.title} />
        <View
          style={{
            flex: 1,
            marginTop: fullMargin,
            alignItems: "center",
          }}
        >
          <LottieView
            ref={(ref) => lottieAnimation.push(ref)}
            style={{ height: "100%", width: "100%" }}
            source={lottieAnimationsArray[itemIndex]}
            onAnimationFinish={() => {
              if (autoMove && currentPage !== pages.length - 1) {
                currentPage = currentPage + 1;
                pagerRef.current?.setPage(currentPage);
              }
              console.log(autoMove);
              console.log(pages.length - 1);
            }}
            autoPlay={false}
            loop={false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {pages.map((item, index) => {
            const { id } = item;
            return (
              <View
                key={id}
                style={itemIndex === index ? activeDotStyle : dotStyle}
              />
            );
          })}
        </View>
        <View style={{ height: "20%", justifyContent: "center" }}>
          {itemIndex === 3 && _renderLetsStartedView()}
          {itemIndex !== 3 && _renderSkipButton()}
        </View>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <Pressable
        onPress={() => {
          pagerRef.current?.setPage(pages.length - 1);
        }}
        style={skipButton}
      >
        <SzizleText17 title={Skip} style={skipText} />
      </Pressable>
    );
  };

  const _renderLetsStartedView = () => {
    return (
      <View style={{ margin: mediumMargin }}>
        <SzizleButton
          onPress={_onLetsGetStarted}
          title={LetsGetStarted}
          buttonWidth="80%"
        />
        <View style={loginContainer}>
          <SzizleText15 title={AlreadyRegistered} />
          <TouchableRipple onPress={_onLoginClick}>
            <SzizleText15 title={Login} style={loginText} />
          </TouchableRipple>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white }}>
      <StatusBar backgroundColor={white} barStyle="dark-content" />
      {isLoading && <ScreenLoader />}

      <TouchableWithoutFeedback
        onPress={() => {
          autoMove = false;
        }}
        style={{ height: "100%", width: "100%" }}
      >
        <AnimatedViewPager
          ref={pagerRef}
          orientation="horizontal"
          style={{ flex: 1 }}
          initialPage={initialPage}
          overScrollMode="never"
          onPageSelected={(event) => {
            const { position } = event.nativeEvent;
            if (lottieAnimation[position]) {
              lottieAnimation[position].play();
            }
          }}
        >
          {pages.map((item, index) => {
            return <View key={index}>{_renderItem({ item, index })}</View>;
          })}
        </AnimatedViewPager>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  skipButton: { marginVertical: margins.fullMargin, alignItems: "center" },
  skipText: {
    color: primary,
    fontFamily: NunitoBold,
    textDecorationLine: "underline",
  },
  loginText: {
    textDecorationLine: "underline",
    color: primary,
    fontFamily: NunitoBold,
    marginHorizontal: halfMargin,
  },
  slideTitle: {
    fontFamily: NunitoBoldItalic,
    textAlign: "center",
    marginHorizontal: fullMargin,
  },
  loginContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: halfMargin,
  },
  slide: {
    paddingTop: doubleMargin,
    flex: 1,
  },
  dotStyle: {
    borderColor: primary,
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 50,
    marginHorizontal: halfMargin / 2,
  },
  activeDotStyle: {
    backgroundColor: primary,
    width: 16,
    height: 16,
    borderRadius: 50,
    marginHorizontal: halfMargin / 2,
  },
});
const mapStateToProps = ({
  tourPagesReducer: {
    tourPages: { isLoading, pages },
  },
}) => ({ isLoading, pages });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TourScreen);

import React, { useEffect } from "react";
import { View, StatusBar } from "react-native";
import { StackActions } from "@react-navigation/native";
import {
  screenContainerWhiteBack,
  splashLogoContainerStyle,
} from "../../Helper/styles";
import { routes } from "../../Helper/strings";
import SzizleLogo from "../../../assets/SzizleLogo";
import { IS_TOUR_VISITED } from "../../Helper/constants";
import { getData } from "../../Helper/SzizleStorage";
import { connect } from "react-redux";
import { colors } from "../../Helper/colors";
import { profileRequest } from "../Auth/Redux/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { white } = colors;

const SplashScreen = ({ navigation, access_token, user, dispatch }) => {
  const { dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  const { AuthNavigation, MainFunctionalNavigation, WelcomeScreen } = routes;

  useEffect(() => {
    setTimeout(async function () {
      const isVerified = await getData(IS_TOUR_VISITED);
      let path = AuthNavigation;
      if (isVerified) {
        if (access_token) {
          const payload = {
            access_token,
            onSuccess: (user) => {
              const { checklist } = user;
              path = MainFunctionalNavigation;
              if (checklist === 0) path = WelcomeScreen;
              navigationDispatcher(replace(path, { isVerified }));
            },
            onError: () => {
              navigationDispatcher(replace(path, { isVerified }));
            },
          };
          dispatch(profileRequest(payload));
        } else {
          navigationDispatcher(replace(path, { isVerified }));
        }
      } else navigationDispatcher(replace(path, { isVerified }));
    }, 2000);
  }, []);

  return (
    <View style={screenContainerWhiteBack}>
      <StatusBar backgroundColor={white} barStyle={"dark-content"} />
      <View style={splashLogoContainerStyle}>
        <SzizleLogo height={hp(28.45)} width={wp(71.98)} />
      </View>
    </View>
  );
};

const mapStateToProps = ({
  authReducer: {
    authData: { access_token, user },
  },
}) => ({ access_token, user });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

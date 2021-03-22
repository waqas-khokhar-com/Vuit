import { colors } from "./colors";
import { margins } from "./margins";
import { radius } from "./radius";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { white, black, transparent, gray } = colors;
const {
  doubleMargin,
  fullMargin,
  halfMargin,
  bodyLeftRightMargin,
  bodyTopBottomMargin,
} = margins;
const { largeRadius } = radius;
export const screenContainer = {
  flex: 1,
  paddingHorizontal: wp(7.23),
  paddingVertical: wp(7.23),
};
export const screenContainerWhiteBack = {
  flex: 1,
  paddingHorizontal: wp(7.23),
  paddingVertical: wp(7.23),
  backgroundColor: white,
};
export const screenContainerWithoutPadding = {
  flex: 1,
  backgroundColor: white,
};
export const splashLogoContainerStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
export const splashLogoStyle = {
  width: 200,
  height: 200,
};
export const bottomBarNavigationStyle = {
  borderTopRightRadius: largeRadius,
  borderTopLeftRadius: largeRadius,
  paddingTop: halfMargin,
  marginTop: -10,
  backgroundColor: white,
  shadowColor: black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};

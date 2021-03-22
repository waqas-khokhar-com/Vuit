import React from "react";
import { View } from "react-native";
import { margins } from "../Helper/margins";
import HeaderLogo from "../../assets/HeaderLogo";
const { logoMarginBottom, logoMarginTop } = margins;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LogoHeader = (props) => {
  return (
    <View
      style={{
        paddingTop: logoMarginTop,
        paddingBottom: logoMarginBottom,
        alignItems: "center",
      }}
    >
      <HeaderLogo height={hp(11.71)} width={wp(29.65)} />
    </View>
  );
};
export default LogoHeader;

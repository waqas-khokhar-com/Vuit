import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../Helper/colors";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";

const { fullMargin, doubleMargin, halfMargin } = margins;
const { largeRadius, mediumRadius, doubleLargeRadius } = radius;
const { NunitoBold } = szizleFonts;
const { lightGray10, white, primary20, primary10, primary, black } = colors;
export const styles = {
  emptyView: {
    backgroundColor: lightGray10,
    height: 30,
    marginStart: fullMargin,
    marginVertical: halfMargin / 2,
  },
  policyItemsContainerStyle: {
    flex: 1,
    flexDirection: "row",
  },
  insideContainer: {
    flex: 1,
    marginTop: fullMargin,
    borderRadius: largeRadius,
    padding: fullMargin,
    backgroundColor: lightGray10,
  },
  insideContainerWithBackground: {
    flex: 1,
    marginTop: fullMargin,
    borderRadius: largeRadius,
  },
  policyItemLabelStyle: {
    textAlign: "center",
    fontFamily: NunitoBold,
  },
  policyItemSelectedStyle: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: largeRadius,
    margin: halfMargin / 2,
    backgroundColor: primary10,
    borderColor: primary,
  },
  policyRowItemSelectedStyle: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: largeRadius,
    margin: halfMargin / 2,
    backgroundColor: primary10,
    borderColor: primary,
    paddingHorizontal: halfMargin,
  },
  policyItemStyle: {
    flex: 1,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: largeRadius,
    margin: halfMargin / 2,
    backgroundColor: white,
    borderColor: primary20,
  },
  policyRowItemStyle: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: largeRadius,
    margin: halfMargin / 2,
    backgroundColor: white,
    borderColor: primary20,
    paddingHorizontal: halfMargin,
  },
  policyDetailItemStyle: {
    height: 140,
    borderRadius: doubleLargeRadius,
    backgroundColor: white,
    padding: fullMargin,
    marginVertical: halfMargin,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  iconSize: RFValue(45),
};

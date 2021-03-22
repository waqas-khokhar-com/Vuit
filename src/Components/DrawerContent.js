import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Share } from "react-native";
import { margins } from "../Helper/margins";
import { colors } from "../Helper/colors";
import EditIcon from "./../../assets/DrawerIcons/EditIcon";
import PasswordIcon from "./../../assets/DrawerIcons/PasswordIcon";
import DataIcon from "./../../assets/DrawerIcons/DataIcon";
import PreferenceIcon from "./../../assets/DrawerIcons/PreferenceIcon";
import PrivacySecurityIcon from "./../../assets/DrawerIcons/PrivacySecurityIcon";
import LegalIcon from "./../../assets/DrawerIcons/LegalIcon";
import HelpIcon from "./../../assets/DrawerIcons/HelpIcon";
import ReferIcon from "./../../assets/DrawerIcons/ReferIcon";
import CircledImage from "./CircledImage";
import SzizleText24 from "./Texts/SzizleText24";
import { szizleFonts } from "../Helper/fonts";
import SzizleText17 from "./Texts/SzizleText17";
import SzizleText12 from "./Texts/SzizleText12";
import SzizleText16 from "./Texts/SzizleText16";
import {
  ChangePassword,
  Logout,
  MyProfile,
  Preferences,
  YourDataDashboard,
  PrivacySecurity,
  Legal,
  Help,
  ReferAFriend,
  showToast,
  ACCOUNT_TYPE_PREMIUM,
  ACCOUNT_TYPE_FREEMIUM,
} from "../Helper/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableRipple } from "react-native-paper";
import { routes } from "../Helper/strings";
import { removeLoginSession } from "../Helper/SzizleStorage";
import { StackActions } from "@react-navigation/native";
import ConfirmationDialog from "./Dialogs/ConfirmationDialog";
import { connect } from "react-redux";
import { logout } from "../Screens/Auth/Redux/actions";
import { actionTypes } from "../Redux/actionTypes";

const { doubleMargin, fullMargin, halfMargin } = margins;
const {
  drawerBackColor,
  white,
  primary,
  upgradeNowColor,
  upgradeNowColor50,
  white50,
  primary50,
} = colors;
const { NunitoBold } = szizleFonts;
const listItemIconSize = 30;

const {
  MyProfileScreen,
  ChangePasswordScreen,
  AnalyticsDashboardScreen,
  PreferencesScreen,
  PrivacySecurityScreen,
  LegalScreen,
  HelpScreen,
  SubscriptionScreen,
  AuthNavigation,
} = routes;

const drawerItems = [
  {
    id: "dfdsvsfesgsv1",
    title: MyProfile,
    icon: <EditIcon width={listItemIconSize} height={listItemIconSize} />,
    route: MyProfileScreen,
  },
  {
    id: "dfdsvsfesgsv2",
    title: ChangePassword,
    icon: <PasswordIcon width={listItemIconSize} height={listItemIconSize} />,
    route: ChangePasswordScreen,
  },
  {
    id: "dfdsvsfesgsv3",
    title: YourDataDashboard,
    icon: <DataIcon width={listItemIconSize} height={listItemIconSize} />,
    route: AnalyticsDashboardScreen,
  },
  {
    id: "dfdsvsfesgsv4",
    title: Preferences,
    icon: <PreferenceIcon width={listItemIconSize} height={listItemIconSize} />,
    route: PreferencesScreen,
  },
  {
    id: "dfdsvsfesgsv5",
    title: PrivacySecurity,
    icon: (
      <PrivacySecurityIcon width={listItemIconSize} height={listItemIconSize} />
    ),
    route: PrivacySecurityScreen,
  },
  {
    id: "dfdsvsfesgsv6",
    title: Legal,
    icon: <LegalIcon width={listItemIconSize} height={listItemIconSize} />,
    route: LegalScreen,
  },
  {
    id: "dfdsvsfesgsv7",
    title: Help,
    icon: <HelpIcon width={listItemIconSize} height={listItemIconSize} />,
    route: HelpScreen,
  },
  {
    id: "dfdsvsfesgsv8",
    title: ReferAFriend,
    icon: <ReferIcon width={listItemIconSize} height={listItemIconSize} />,
    onPress: "onShare",
  },
];

const DrawerContent = ({ navigation, user, dispatch }) => {
  const {
    nameStyle,
    headerContainer,
    freemiumLabelStyle,
    container,
    listItemContainerStyle,
  } = styles;
  const { navigate, dispatch: navigationDispatcher } = navigation;
  const { replace } = StackActions;
  const [confirmDialog, setConfirmDialog] = useState(false);
  console.log("logined user", user);
  const { full_name, avatar, account_type, my_referral_code } = user;
  const RenderItem = ({ item }) => {
    const { title, icon, route, onPress } = item;
    return (
      <TouchableRipple
        rippleColor={white50}
        onPress={() => {
          navigation.toggleDrawer();
          if (route) navigate(route);
          if (onPress && onPress === "onShare") onShare();
        }}
        style={{ paddingStart: doubleMargin }}
      >
        <View style={listItemContainerStyle}>
          {icon}
          <SzizleText16
            title={title}
            style={{ color: white, marginStart: fullMargin }}
          />
        </View>
      </TouchableRipple>
    );
  };
  const FlatlistHeader = ({ item, index }) => {
    return (
      <View style={headerContainer}>
        <CircledImage
          onPress={() => navigate(MyProfileScreen)}
          image={avatar}
          size={150}
        />
        <SzizleText24 title={full_name} style={nameStyle} />
        <SzizleText17 title={account_type} style={freemiumLabelStyle} />
        {account_type === ACCOUNT_TYPE_FREEMIUM && (
          <TouchableRipple
            rippleColor={upgradeNowColor50}
            onPress={() => navigate(SubscriptionScreen)}
          >
            <SzizleText12
              title="Upgrade now"
              style={{ color: upgradeNowColor, fontFamily: NunitoBold }}
            />
          </TouchableRipple>
        )}
      </View>
    );
  };

  const onLogout = async () => {
    const payload = {
      onSuccess: async () => {},
    };
    try {
      dispatch({
        type: actionTypes.LOGOUT,
      });
      setConfirmDialog(false);
      navigationDispatcher(replace(AuthNavigation));
    } catch (e) {
      showToast(e.response.message);
    }
  };

  const FlatlistFooter = ({ item, index }) => {
    return (
      <TouchableRipple
        rippleColor={primary50}
        onPress={() => {
          navigation.toggleDrawer();
          setConfirmDialog(true);
        }}
        style={{ paddingStart: doubleMargin }}
      >
        <View style={listItemContainerStyle}>
          <ConfirmationDialog
            title="Logout"
            message="Are you sure?"
            visible={confirmDialog}
            onOk={onLogout}
            okLabel={"Yes"}
            cancelLabel={"No"}
            onCancel={() => {
              setConfirmDialog(false);
            }}
          />
          <MaterialCommunityIcons
            name="power"
            color={primary}
            size={listItemIconSize}
          />
          <SzizleText16
            title={Logout}
            style={{ color: primary, marginStart: fullMargin }}
          />
        </View>
      </TouchableRipple>
    );
  };

  const onShare = async () => {
    try {
      const { full_name } = user;
      const result = await Share.share(
        {
          message: `Referral Code: ${my_referral_code}`,
          title: `VüIT App Referral Code sent by ${full_name}`,
        },
        {
          subject: `VüIT App Referral Code sent by ${full_name}`,
        }
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={container}>
      <FlatList
        indicatorStyle="white"
        ListHeaderComponent={FlatlistHeader}
        ListFooterComponent={FlatlistFooter}
        data={drawerItems}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  listItemContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: halfMargin + 3,
  },
  freemiumLabelStyle: {
    color: white,
    fontFamily: NunitoBold,
    marginTop: fullMargin,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: fullMargin,
  },
  container: {
    flex: 1,
    backgroundColor: drawerBackColor,
  },
  nameStyle: {
    color: primary,
    fontFamily: NunitoBold,
    marginTop: fullMargin,
  },
});
const mapStateToProps = ({
  authReducer: {
    authData: { user },
  },
}) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

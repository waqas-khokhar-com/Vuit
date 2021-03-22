import * as React from "react";
import { Appbar, Searchbar, TouchableRipple } from "react-native-paper";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { colors } from "../../Helper/colors";
import { radius } from "../../Helper/radius";
import SzizleText17 from "../Texts/SzizleText17";
import SzizleText20 from "../Texts/SzizleText20";
import { szizleFonts } from "../../Helper/fonts";
import { margins } from "../../Helper/margins";
import { Home, AddPolicy, Done } from "../../Helper/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const { NunitoBold } = szizleFonts;
const { white, transparent, primary } = colors;
const { halfMargin, fullMargin } = margins;
const { regularRadius } = radius;

const AppBar = (props) => {
  const {
    toggleDrawer,
    onBackPress,
    onClearSelection,
    onRightAction,
    title,
    onSearch,
    onSearchValue,
    rightActionTitle,
    onSort,
    selectionCounter,
  } = props;
  const {
    appbar,
    rightActionsContainer,
    textStyle,
    titleStyle,
    rippleStyle,
  } = styles;

  const isSelectionEnable = selectionCounter ? selectionCounter !== 0 : false;

  const [searchValue, setSearchValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);

  const backIcon = Platform.OS === "ios" ? "chevron-left" : "arrow-left";
  return (
    <Appbar style={appbar}>
      <StatusBar
        backgroundColor={primary}
        barStyle={Platform.OS === "android" ? "light-content" : "dark-content"}
      />

      {searchEnabled && (
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => {
            if (onSearch) onSearch(text);
            setSearchValue(text);
          }}
          icon={{ source: "arrow-left", direction: "auto" }}
          onIconPress={() => setSearchEnabled(false)}
          value={searchValue}
        />
      )}
      {!searchEnabled && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          {toggleDrawer && (
            <Appbar.Action
              icon={isSelectionEnable ? backIcon : "menu"}
              size={28}
              color={white}
              onPress={isSelectionEnable ? onClearSelection : toggleDrawer}
            />
          )}
          {onBackPress && (
            <Appbar.BackAction size={28} color={white} onPress={onBackPress} />
          )}
          <View style={titleStyle}>
            <SzizleText17
              title={
                isSelectionEnable
                  ? `${selectionCounter} selected`
                  : title || title
              }
              style={textStyle}
            />
          </View>

          <View style={rightActionsContainer}>
            {!isSelectionEnable && (
              <View style={{ flexDirection: "row" }}>
                {onSearch && (
                  <TouchableRipple
                    rippleColor="#FFFFFF80"
                    onPress={() => setSearchEnabled(true)}
                    style={rippleStyle}
                  >
                    <MaterialCommunityIcons
                      name="magnify"
                      color={white}
                      size={28}
                    />
                  </TouchableRipple>
                )}
                {onSort && (
                  <TouchableRipple
                    onPress={onSort}
                    rippleColor="#FFFFFF80"
                    style={rippleStyle}
                  >
                    <MaterialCommunityIcons
                      name="sort-variant"
                      color={white}
                      size={28}
                    />
                  </TouchableRipple>
                )}
              </View>
            )}

            {isSelectionEnable && (
              <TouchableRipple>
                <SzizleText20 title={Done} style={textStyle} />
              </TouchableRipple>
            )}
            {onRightAction && (
              <TouchableRipple onPress={onRightAction}>
                <SzizleText20 title={rightActionTitle} style={textStyle} />
              </TouchableRipple>
            )}
          </View>
        </View>
      )}
    </Appbar>
  );
};

const styles = StyleSheet.create({
  rippleStyle: {
    borderRadius: 100,
    padding: halfMargin,
  },
  textStyle: {
    color: white,
    fontFamily: NunitoBold,
    marginEnd: halfMargin,
  },
  titleStyle: {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: halfMargin,
    position: "absolute",
    right: 0,
  },
  appbar: {
    backgroundColor: primary,
    borderBottomRightRadius: regularRadius,
    borderBottomLeftRadius: regularRadius,
  },
});
export default AppBar;

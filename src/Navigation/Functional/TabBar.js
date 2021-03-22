import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SzizleText11 from "../../Components/Texts/SzizleText11";
import { bottomBarNavigationStyle } from "./../../Helper/styles";
import { colors } from "../../Helper/colors";
import BottomTabBack from "./../../../assets/BottomTabBack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { white, primary, black } = colors;

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={bottomBarNavigationStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const Icon = options.tabBarIcon;
        const isFocused = state.index === index;
        console.log("descriptors", Icon);
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
          >
            <Icon />
            <SzizleText11 title={label} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
export default TabBar;

import React, { useEffect, useState } from "react";
import { routes } from "../../Helper/strings";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colors } from "../../Helper/colors";
import { bottomBarNavigationStyle } from "../../Helper/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../Screens/BottomNavigation/Home/HomeScreen";
import DocumentsScreen from "../../Screens/BottomNavigation/Documents/DocumentsScreen";
import NotificationsScreen from "../../Screens/BottomNavigation/Notifications/NotificationsScreen";
import { Documents, Notifications, Home } from "./../../Helper/constants";
import { connect } from "react-redux";
const { white, primary, black } = colors;

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = ({ alerts, document }) => {
  return (
    <Tab.Navigator
      initialRouteName={routes.HomeScreen}
      shifting={false}
      activeColor={primary}
      inactiveColor={black}
      barStyle={bottomBarNavigationStyle}
    >
      <Tab.Screen
        name={routes.HomeScreen}
        options={{
          tabBarLabel: Home,
          tabBarColor: white,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={routes.DocumentsScreen}
        options={{
          tabBarLabel: Documents,
          tabBarColor: white,
          tabBarBadge: document !== 0 ? true : false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "text-box" : "text-box-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        component={DocumentsScreen}
      />
      <Tab.Screen
        name={routes.NotificationsScreen}
        options={{
          tabBarLabel: Notifications,
          tabBarColor: white,
          tabBarBadge: alerts !== 0 ? alerts : null,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "bell" : "bell-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
};
const mapStateToProps = ({
  authReducer: {
    authData: {
      user: {
        notification: { alerts, document },
      },
    },
  },
}) => ({ alerts, document });

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs);

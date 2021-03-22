import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../../Helper/strings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../../Helper/colors";
import BottomNavigation from "./BottomNavigation";
import DrawerContent from "../../Components/DrawerContent";
const { white } = colors;

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={routes.BottomNavigation}
      drawerStyle={{ width: "85%" }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name={routes.BottomNavigation}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;

import * as React from "react";
import { Appbar } from "react-native-paper";
import { Platform, StyleSheet, View } from "react-native";
import { colors } from "../../Helper/colors";
import { radius } from "../../Helper/radius";
import RegisterProcess1 from "./../../../assets/RegisterProcess1";
import RegisterProcess2 from "./../../../assets/RegisterProcess2";
import RegisterProcess3 from "./../../../assets/RegisterProcess3";
import RegisterProcess4 from "./../../../assets/RegisterProcess4";
import { margins } from "../../Helper/margins";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const { white } = colors;

const { regularRadius } = radius;
const { gray } = colors;
const { fullMargin } = margins;

const SzizleRegisterAppBar = (props) => {
  const { onBackPress, process } = props;
  const { appbar, appBarContent } = styles;
  return (
    <Appbar style={appbar}>
      <Appbar.BackAction onPress={onBackPress} color={gray} />
      <View style={appBarContent}>
        {process === 1 && <RegisterProcess1 width="90%" />}
        {process === 2 && <RegisterProcess2 width="90%" />}
        {process === 3 && <RegisterProcess3 width="90%" />}
        {process === 4 && <RegisterProcess4 width="90%" />}
      </View>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  appBarContent: {
    flex: 1,
  },
  appbar: {
    backgroundColor: white,
    borderBottomRightRadius: regularRadius,
    borderBottomLeftRadius: regularRadius,
  },
});

export default SzizleRegisterAppBar;

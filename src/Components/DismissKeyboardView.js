import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
} from "react-native";

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Comp {...props}>{children}</Comp>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);
export default DismissKeyboardView;

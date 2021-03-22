import React from "react";
import { Dialog, Portal } from "react-native-paper";
import SzizleText17 from "../Texts/SzizleText17";
import SzizleTextButton from "../Texts/SzizleTextButton";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";
import CloseIcon from "../../../assets/CloseIcon";
import { View } from "react-native";

const ReactivateDialog = (props) => {
  const { visible, onOk, message, messageStyle, buttonTitle, onClose } = props;
  const { fullMargin, halfMargin } = margins;
  const { largeRadius } = radius;
  return (
    <Portal>
      <Dialog
        style={{ borderRadius: largeRadius }}
        dismissable={false}
        visible={visible}
      >
        <Dialog.Content>
          <View style={{ alignItems: "flex-end" }}>
            <CloseIcon onPress={onClose} width="20" height="20" />
          </View>
          <SzizleText17
            title={message}
            style={[
              {
                textAlign: "center",
                paddingHorizontal: fullMargin,
                marginTop: halfMargin,
              },
              messageStyle,
            ]}
          />

          <SzizleTextButton
            title={buttonTitle ? buttonTitle : "OK"}
            onPress={onOk}
            style={{ paddingVertical: halfMargin }}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ReactivateDialog;

import React from "react";
import { Dialog, Portal } from "react-native-paper";
import SzizleText17 from "../Texts/SzizleText17";
import SzizleTextButton from "../Texts/SzizleTextButton";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";

const MessageDialog = (props) => {
  const { visible, onOk, message, messageStyle, buttonTitle } = props;
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
          <SzizleText17
            title={message}
            style={[
              {
                textAlign: "center",
                paddingHorizontal: fullMargin,
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

export default MessageDialog;

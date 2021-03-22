import React from "react";
import {View} from "react-native";
import {Dialog, Portal} from "react-native-paper";
import {colors} from "../../Helper/colors";
import {szizleFonts} from "../../Helper/fonts";
import {margins} from "../../Helper/margins";
import SzizleText17 from "../Texts/SzizleText17";
import SzizleText24 from "../Texts/SzizleText24";
import SzizleTextButton from "../Texts/SzizleTextButton";
import {radius} from "../../Helper/radius";

const {NunitoExtraBold} = szizleFonts;
const {fullMargin, halfMargin} = margins;
const {largeRadius} = radius;
const {black} = colors;
const ConfirmationDialog = (props) => {
    const {visible, onOk, onCancel, message, title, cancelLabel, okLabel, messageStyle} = props;

    return (
        <Portal>
            <Dialog style={{borderRadius: largeRadius}} dismissable={false} visible={visible}>
                <Dialog.Content>
                    <SzizleText24
                        title={title}
                        style={{
                            textAlign: "center",
                            fontFamily: NunitoExtraBold,
                            marginBottom: fullMargin,
                            paddingHorizontal: fullMargin

                        }}
                    />
                    <SzizleText17
                        title={message}
                        style={[
                            {
                                textAlign: "center",
                            },
                            messageStyle,
                        ]}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: halfMargin,
                        }}
                    >
                        <SzizleTextButton title={okLabel ? okLabel : "Ok"} onPress={onOk}/>
                        <SzizleTextButton
                            title={cancelLabel ? cancelLabel : "Cancel"}
                            onPress={onCancel}
                            labelColor={black}
                        />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default ConfirmationDialog;

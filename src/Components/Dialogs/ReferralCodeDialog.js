import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {
    Dialog,
    Portal,
    TouchableRipple,
} from "react-native-paper";
import CloseIcon from "../../../assets/CloseIcon";
import {colors} from "../../Helper/colors";
import {szizleFonts} from "../../Helper/fonts";
import {margins} from "../../Helper/margins";
import {textSizes} from "../../Helper/textSizes";
import TextInput from "../TextInput";
import SzizleText from "../Texts/SzizleText";
import ScreenLoader from "../Loaders/ScreenLoader";
import {radius} from "../../Helper/radius";

const {NunitoBold} = szizleFonts;
const {headerSize} = textSizes;
const {primary} = colors;
const {fullMargin, halfMargin} = margins;
const {largeRadius} = radius;
const ReferralCodeDialog = (props) => {
    const {visible, onDismiss, onProceed, onDialogClose, isLoading} = props;
    const [value, setValue] = useState({referral_code: ""});

    const {referral_code} = value;

    useEffect(() => {
        setValue({referral_code: ""});
    }, [visible]);

    return (
        <Portal>
            {isLoading && <ScreenLoader/>}
            <Dialog style={{borderRadius: largeRadius}} dismissable={false} visible={visible} onDismiss={onDismiss}>
                <Dialog.Content>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{flex: 1, alignItems: "center"}}>
                            <SzizleText
                                title="Enter Referral Code"
                                style={{fontFamily: NunitoBold, fontSize: headerSize}}
                            />
                        </View>
                        <TouchableRipple
                            style={{padding: halfMargin}}
                            onPress={onDialogClose}
                        >
                            <CloseIcon width="24" height="24"/>
                        </TouchableRipple>
                    </View>
                    <TextInput
                        value={referral_code}
                        onChangeText={(text) => setValue({referral_code: text})}
                        placeholder="Referral Code"
                    />
                    <TouchableRipple
                        onPress={() => referral_code && onProceed(referral_code)}
                        style={{
                            width: "40%",
                            marginTop: fullMargin,
                            alignSelf: "center",
                            alignItems: "center",
                        }}
                    >
                        <SzizleText
                            title="Proceed"
                            style={{
                                color: primary,
                                fontFamily: NunitoBold,
                                fontSize: headerSize,
                            }}
                        />
                    </TouchableRipple>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default ReferralCodeDialog;

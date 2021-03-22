import React, {useEffect} from "react";
import {Text, View, Image, Alert, StatusBar, StyleSheet, SafeAreaView} from "react-native";
import {StackActions} from "@react-navigation/native";
import {screenContainer} from "../../Helper/styles";
import {routes, insuranceLabels} from "../../Helper/strings";
import {colors} from "../../Helper/colors";
import SzizleText22 from "../../Components/Texts/SzizleText22";
import {szizleFonts} from "../../Helper/fonts";
import {radius} from "../../Helper/radius";
import {margins} from "../../Helper/margins";
import SzizleButton from "../../Components/Buttons/SzizleButton";
import {
    QuickTutorialStep2Title,
    Continue,
    EndTour,
    TapHereToUploadOrScanYourPolicy,
} from "./../../Helper/constants";
import {Button} from "react-native-paper";
import SzizleTextButton from "../../Components/Texts/SzizleTextButton";
import {textSizes} from "../../Helper/textSizes";
import {styles} from "./styles";
import HouseIcon from "../../../assets/InsuranceIcons/HouseIcon";
import CarIcon from "../../../assets/InsuranceIcons/CarIcon";
import BikeIcon from "../../../assets/InsuranceIcons/BikeIcon";
import HealthIcon from "../../../assets/InsuranceIcons/HealthIcon";
import PetIcon from "../../../assets/InsuranceIcons/PetIcon";
import TravelIcon from "../../../assets/InsuranceIcons/TravelIcon";
import GadgetIcon from "../../../assets/InsuranceIcons/GadgetIcon";
import BussinessIcon from "../../../assets/InsuranceIcons/BussinessIcon";
import SzizleText14 from "../../Components/Texts/SzizleText14";

const {TutorialStep3, CheckList} = routes;
const {size18} = textSizes;
const {fullMargin, halfMargin, doubleMargin} = margins;
const {NunitoBold} = szizleFonts;
const {
    insideContainer,
    policyDetailItemStyle,
    iconSize,
    policyItemLabelStyle,
    emptyView,
} = styles;
const {white, black} = colors;
const {} = insuranceLabels;
const TutorialStep2 = ({navigation}) => {
    const {dispatch: navigationDispatcher, navigate} = navigation;
    const {replace} = StackActions;

    useEffect(() => {
    }, []);

    const PolicyItem = (icon) => {
        return (
            <View style={policyDetailItemStyle}>
                <View style={{flexDirection: "row"}}>
                    {icon}
                    <View style={{flex: 1, marginBottom: halfMargin}}>
                        <View style={emptyView}/>
                        <View style={emptyView}/>
                    </View>
                </View>
                <SzizleText14
                    title={TapHereToUploadOrScanYourPolicy}
                    style={policyItemLabelStyle}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={white} barStyle="dark-content"/>
            <View style={[screenContainer, {paddingHorizontal: fullMargin, paddingVertical: fullMargin}]}>
                <SzizleText22
                    title={QuickTutorialStep2Title}
                    style={{
                        fontFamily: NunitoBold,
                        textAlign: "center",
                    }}
                />
                <View style={insideContainer}>
                    {PolicyItem(<BikeIcon width={iconSize} height={iconSize}/>)}
                    {PolicyItem(<HouseIcon width={iconSize} height={iconSize}/>)}
                </View>
                <View style={{marginTop: fullMargin}}>
                    <SzizleButton
                        title={Continue}
                        buttonWidth="60%"
                        onPress={() => navigate(TutorialStep3)}
                    />

                    <SzizleTextButton
                        title={EndTour}
                        onPress={() => navigationDispatcher(replace(CheckList))}
                        labelColor={black}
                        labelSize={size18}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default TutorialStep2;

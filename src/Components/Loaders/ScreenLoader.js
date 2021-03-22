import React from "react";
import {View, StyleSheet} from "react-native";
import {colors} from "../../Helper/colors";
import LottieView from 'lottie-react-native';

const {black, gray90} = colors;

const ScreenLoader = (props) => {
    return (
        <View style={styles.screen}>
            <LottieView style={{width: 150, height: 150}}
                        source={require('../../../assets/LottieResources/loader.json')} autoPlay loop/>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        backgroundColor: gray90,
        zIndex: 999,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ScreenLoader;

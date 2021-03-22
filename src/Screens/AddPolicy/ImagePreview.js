import React, { useEffect } from "react";
import { View, StatusBar, StyleSheet, SafeAreaView, Image } from "react-native";
import { StackActions } from "@react-navigation/native";
import { colors } from "../../Helper/colors";
import SzizleAppBar from "../../Components/AppBar/SzizleAppBar";
import { margins } from "../../Helper/margins";
import { radius } from "../../Helper/radius";

const { fullMargin, doubleMargin, halfMargin } = margins;
const { regularRadius } = radius;
const { primary, white } = colors;
const ImagePreview = ({ navigation, route }) => {
  const { dispatch: navigationDispatcher, goBack } = navigation;
  useEffect(() => {}, []);
  const {
    params: { image },
  } = route;
  console.log(image);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={primary} barStyle="light-content" />
      <SzizleAppBar
        title="Document Preview"
        backButtonColor={white}
        onBackPress={goBack}
        style={{
          width: "100%",
          backgroundColor: primary,
          position: "absolute",
          zIndex: 999,
          borderBottomRightRadius: regularRadius,
          borderBottomLeftRadius: regularRadius,
        }}
      />
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: `${image}` }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ImagePreview;

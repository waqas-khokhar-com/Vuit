import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../Helper/colors";
import { TouchableRipple, ActivityIndicator } from "react-native-paper";
import { BASE_URL } from "../Redux/Urls";

const { gray, primary } = colors;
const CircledImage = ({ image, size, onPress, isLoading }) => {
  const styles = StyleSheet.create({
    imageStyle: {
      width: size,
      height: size,
      borderWidth: 1,
      borderRadius: 100,
      borderColor: gray,
    },
  });

  const { imageStyle } = styles;
  return (
    <TouchableRipple borderless={true} onPress={onPress} style={imageStyle}>
      <View>
        {!isLoading && (
          <Image
            source={{
              uri: image
                ? image
                : "https://www.pinclipart.com/picdir/big/95-958614_good-job-clip-art.png",
            }}
            style={{
              width: size,
              height: size,
            }}
            resizeMode="cover"
          />
        )}
        {isLoading && (
          <View
            style={{
              width: size,
              height: size,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              animating={true}
              color={primary}
              size="large"
              style={{}}
            />
          </View>
        )}
      </View>
    </TouchableRipple>
  );
};

export default CircledImage;

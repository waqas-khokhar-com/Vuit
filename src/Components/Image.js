import React, { useState } from "react";
import { View, Image as Img } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../Helper/colors";
import { INPUT_HEIGHT } from "../Helper/constants";
import { szizleFonts } from "../Helper/fonts";
import { margins } from "../Helper/margins";
import { radius } from "../Helper/radius";
import { textSizes } from "../Helper/textSizes";

const { gray } = colors;
const Image = (props) => {
  const { featured_image, style, indicatorSize } = props;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          zIndex: 999,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size={indicatorSize}
            animating={true}
            color={gray}
          />
        )}
      </View>
      <Img
        resizeMode={"contain"}
        style={style}
        onLoadStart={(e) => setIsLoading(true)}
        onLoadEnd={(e) => setIsLoading(false)}
        source={{ uri: featured_image }}
      />
    </View>
  );
};
export default Image;

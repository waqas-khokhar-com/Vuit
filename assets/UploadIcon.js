import * as React from "react";
import { TouchableOpacity } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <TouchableRipple {...props}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" {...props}>
        <G
          data-name="Icon feather-upload"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path
            data-name="Path 679"
            d="M36.5 24.796v7.8a3.9 3.9 0 01-3.889 3.9H5.389a3.9 3.9 0 01-3.889-3.9v-7.8"
          />
          <Path data-name="Path 680" d="M28.698 11.253L19.003 1.5l-9.7 9.753" />
          <Path data-name="Path 681" d="M19 1.5v23.408" />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

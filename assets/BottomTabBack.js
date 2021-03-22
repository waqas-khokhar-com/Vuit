import * as React from "react";
import { View } from "react-native";
import Svg, { Defs, G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <View {...props}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 462 131" {...props}>
        <Defs></Defs>
        <G filter="url(#prefix__a)" data-name="Group 293">
          <Path
            data-name="Rectangle 15"
            d="M34 27h394a10 10 0 0110 10v73H24V37a10 10 0 0110-10z"
            fill="#fff"
          />
        </G>
      </Svg>
    </View>
  );
}

export default SvgComponent;

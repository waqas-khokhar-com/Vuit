import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <TouchableRipple {...props}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 62.25 62.25"
        {...props}
      >
        <G
          data-name="Group 347"
          fill="none"
          strokeMiterlimit={10}
          strokeWidth={2.25}
        >
          <Path
            data-name="Path 517"
            d="M49.266 31.125a18.142 18.142 0 11-18.141-18.142 18.141 18.141 0 0118.141 18.142z"
            stroke="#ff4773"
          />
          <Path
            data-name="Path 518"
            d="M61.125 31.125a30 30 0 11-30-30 30 30 0 0130 30z"
            stroke="#FFF"
          />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

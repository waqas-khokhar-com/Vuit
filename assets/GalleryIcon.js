import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <TouchableRipple {...props}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 45.173 37.716"
        {...props}
      >
        <G fill="none" stroke="#FFF" strokeWidth={2.25}>
          <Path
            data-name="Path 512"
            d="M6.434 1.125h32.308A4.81 4.81 0 0143.588 5.9v25.452a4.81 4.81 0 01-4.846 4.773H6.434a4.81 4.81 0 01-4.846-4.773V5.9a4.81 4.81 0 014.846-4.775z"
            strokeLinejoin="round"
          />
          <Path
            data-name="Path 513"
            d="M33.901 10.703a3.24 3.24 0 11-3.24-3.24 3.24 3.24 0 013.24 3.24z"
            strokeMiterlimit={10}
          />
          <Path
            data-name="Path 514"
            d="M27.513 26.601l-9.18-9.163a3.24 3.24 0 00-4.443-.131L1.588 28.243"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            data-name="Path 515"
            d="M19.287 36.125l12.488-12.488a3.24 3.24 0 014.365-.2l7.448 6.206"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.417 28.033"
      {...props}
    >
      <G
        data-name="Icon feather-check-circle"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path
          data-name="Path 251"
          d="M27.003 12.824v1.2a13 13 0 11-7.709-11.883"
        />
        <Path data-name="Path 252" d="M27.003 4.024l-15 15.015-4.5-4.5" />
      </G>
    </Svg>
  );
}

export default SvgComponent;

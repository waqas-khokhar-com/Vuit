import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24.022" {...props}>
      <G
        data-name="Icon feather-users"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path
          data-name="Path 658"
          d="M25 23.022v-3a6 6 0 00-6-6H7a6 6 0 00-6 6v3"
        />
        <Path
          data-name="Path 659"
          d="M17.571 7.022a6 6 0 11-6-6 6 6 0 016 6z"
        />
        <Path data-name="Path 660" d="M29 23.022v-3a6 6 0 00-4.5-5.8" />
        <Path data-name="Path 661" d="M19.551 1.222a6 6 0 010 11.62" />
      </G>
    </Svg>
  );
}

export default SvgComponent;

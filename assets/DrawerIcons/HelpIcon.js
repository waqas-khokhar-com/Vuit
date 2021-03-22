import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  const { color } = props;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <G
        data-name="Icon feather-help-circle"
        fill="none"
        stroke={color ? color : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path data-name="Path 531" d="M27 14A13 13 0 1114 1a13 13 0 0113 13z" />
        <Path
          data-name="Path 532"
          d="M9.634 10.072a4.5 4.5 0 018.745 1.5c0 3-4.5 4.5-4.5 4.5"
        />
        <Path data-name="Path 533" d="M14 20.5h0" />
      </G>
    </Svg>
  );
}

export default SvgComponent;

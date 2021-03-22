import * as React from "react";
import { TouchableRipple } from "react-native-paper";
import Svg, { G, Path } from "react-native-svg";
import { margins } from "../Helper/margins";
const { halfMargin } = margins;
function SvgComponent(props) {
  const { width, height } = props;
  return (
    <TouchableRipple {...props} style={{ padding: halfMargin }}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 23.621 23.621"
        width={width}
        height={height}
      >
        <G
          data-name="Icon feather-zoom-in"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path
            data-name="Path 665"
            d="M18.87 10.185A8.685 8.685 0 1110.185 1.5a8.685 8.685 0 018.685 8.685z"
          />
          <Path data-name="Path 666" d="M21.5 21.5l-5.005-5.005" />
          <Path data-name="Path 668" d="M6.814 10.239h6.9" />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

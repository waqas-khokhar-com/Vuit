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
        viewBox="0 0 23 23"
        width={width}
        height={height}
      >
        <G
          data-name="Icon feather-download"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path
            data-name="Path 669"
            d="M21.5 14.596v4.6a2.263 2.263 0 01-2.222 2.3H3.722a2.263 2.263 0 01-2.222-2.3v-4.6"
          />
          <Path data-name="Path 670" d="M6.102 10.233l5.4 5.753 5.4-5.753" />
          <Path data-name="Path 671" d="M11.5 15.307V1.5" />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

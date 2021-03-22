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
          data-name="Icon feather-printer"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path data-name="Path 662" d="M6.102 9.554V1.5h10.8v8.054" />
          <Path
            data-name="Path 663"
            d="M5.5 17.992h-2a2.167 2.167 0 01-2-2.3V9.937a2.167 2.167 0 012-2.3h16a2.167 2.167 0 012 2.3v5.753a2.167 2.167 0 01-2 2.3h-2"
          />
          <Path data-name="Path 664" d="M6.102 12.295h10.8v9.2h-10.8z" />
        </G>
      </Svg>
    </TouchableRipple>
  );
}

export default SvgComponent;

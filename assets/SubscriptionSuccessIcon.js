import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={141}
      height={141}
      viewBox="0 0 141 141"
      {...props}
    >
      <G data-name="Group 495">
        <G data-name="Ellipse 85" fill="#38da58" stroke="#38da58">
          <Circle cx={70.5} cy={70.5} r={70.5} stroke="none" />
          <Circle cx={70.5} cy={70.5} r={70} fill="none" />
        </G>
        <Path
          data-name="Icon material-done"
          d="M61.258 84.184L46.437 69.368l-4.94 4.94 19.761 19.76 42.339-42.344-4.935-4.94z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;

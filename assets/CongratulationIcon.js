import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function CongratulationIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={127.537}
      height={116}
      viewBox="0 0 127.537 116"
      {...props}
    >
      <G data-name="Group 617" transform="translate(-149 -205)">
        <Circle
          data-name="Ellipse 97"
          cx={58}
          cy={58}
          r={58}
          transform="translate(149 205)"
          fill="#d0cde1"
          opacity={0.3}
        />
        <Path
          data-name="Path 801"
          d="M179.914 251.466l28.416 27.993 63.965-63.109"
          fill="none"
          stroke="#26e5d7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={6}
        />
      </G>
    </Svg>
  );
}

export default CongratulationIcon;

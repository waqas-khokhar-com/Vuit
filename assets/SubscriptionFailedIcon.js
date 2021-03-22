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
      <G data-name="Group 626">
        <G data-name="Ellipse 85" fill="#da383d" stroke="#da383d">
          <Circle cx={70.5} cy={70.5} r={70.5} stroke="none" />
          <Circle cx={70.5} cy={70.5} r={70} fill="none" />
        </G>
        <Path
          data-name="Icon ionic-md-close"
          d="M95.154 50.015L90.139 45 70.077 65.062 50.015 45 45 50.015l20.062 20.062L45 90.139l5.015 5.015 20.062-20.062 20.062 20.062 5.015-5.015-20.062-20.062z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;

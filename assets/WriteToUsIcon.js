import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      viewBox="0 0 30 30"
      {...props}
    >
      <G data-name="Group 612" strokeWidth={2}>
        <G data-name="Ellipse 106" fill="#fff" stroke="#27303d">
          <Circle cx={15} cy={15} r={15} stroke="none" />
          <Circle cx={15} cy={15} r={14} fill="none" />
        </G>
        <Path
          data-name="Icon feather-edit-2"
          d="M18.078 9.759a1.712 1.712 0 012.422 2.42l-8.17 8.17-3.33.908.908-3.329z"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;

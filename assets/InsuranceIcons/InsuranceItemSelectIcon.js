import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function InsuranceItemSelectIcon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46" {...props}>
      <G data-name="Group 534">
        <G data-name="Ellipse 56" fill="#ff4773" stroke="#ff4773">
          <Circle cx={23} cy={23} r={23} stroke="none" />
          <Circle cx={23} cy={23} r={22.5} fill="none" />
        </G>
        <Path
          d="M14.384 19.945l-2.877 3.068 8.63 9.205 14.384-15.342-2.877-3.068-11.507 12.274z"
          fill="#fff"
          fillRule="evenodd"
        />
      </G>
    </Svg>
  );
}

export default InsuranceItemSelectIcon;

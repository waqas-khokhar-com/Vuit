import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function Checked(props) {
  return (
    <Svg
      data-name="Group 402"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      {...props}
    >
      <Circle data-name="Ellipse 68" cx={9} cy={9} r={9} fill="#cde3c7" />
      <Path
        data-name="Icon material-done"
        d="M7.182 11.328L4.8 8.821l-.8.836L7.182 13 14 5.836 13.2 5z"
        fill="#59a245"
      />
    </Svg>
  );
}

export default Checked;
